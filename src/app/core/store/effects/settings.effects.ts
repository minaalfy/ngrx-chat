import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { SettingsActions, ESettingsActions } from "@app/core/store/actions/settings.actions";
import { LocalStorageService } from "@app/core";

import { tap, withLatestFrom, map, distinctUntilChanged } from "rxjs/operators";
import { IAppState } from "@app/core/store/state/app.state";
import { selectSettings } from "@app/core/store/selectors/settings.selector";
/**
* SettingsEffects class used to attach side effects for store settings actions
*/
@Injectable()
export class SettingsEffects {
  /**
  * inject  Actions, Store, LocalStorageService, TranslateService
  */
  constructor(
    private actions$: Actions<SettingsActions>,
    private store: Store<IAppState>,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService
  ) {}
  /**
  * attach setitem to localstorage with each action in ESettingsActions
  */
  @Effect({ dispatch: false })
  persistSettings = this.actions$.pipe(
    ofType(
      ESettingsActions.ChangeClock,
      ESettingsActions.SetUserID,
      ESettingsActions.ChangeLanguage,
      ESettingsActions.ChangeName,
      ESettingsActions.ChangeSendOnEnter,
      ESettingsActions.ChangeTheme,
      ESettingsActions.Reset
    ),
    withLatestFrom(this.store.pipe(select(selectSettings))),
    tap(([action, settings]) =>
      this.localStorageService.setItem('SETTINGS', settings)
    )
  );
  /**
  * attach translateservice use method with each change in store settings.language
  */
  @Effect({ dispatch: false })
  setTranslateServiceLanguage = this.store.pipe(
    select(selectSettings),
    map(settings => settings.language),
    distinctUntilChanged(),
    tap(language => {
      this.translateService.use(language);
      language == "en-US" ? (document.dir = "ltr") : (document.dir = "rtl");
    })
  );


  /**
  * add current theme class to document.bosy on each settings.theme change
  */
  @Effect({ dispatch: false })
  updateTheme = this.store.pipe(
    select(selectSettings),
    map(settings => settings.theme),
    distinctUntilChanged(),
    tap((theme) => {
      const classList = document.body.classList;
      const toRemove = Array.from(classList).filter((item: string) =>
        item.includes('-theme')
      );
      if (toRemove.length) {
        classList.remove(...toRemove);
      }
      classList.add(theme);
    })
  );
}
