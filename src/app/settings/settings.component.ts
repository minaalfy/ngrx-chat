import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ISettingsState } from '@app/core/store/state/settings.state';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ChangeSendOnEnter, ChangeLanguage, ChangeClock, ChangeTheme, ChangeName, Reset } from "@app/core/store/actions/settings.actions";
import { IAppState } from '@app/core/store/state/app.state';
import { selectSettings } from '@app/core/store/selectors/settings.selector';
import { environment } from '@env/environment';

/**
* SettingsComponent is an angular component used to customize application interface
*/
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  /**
	* settings used to retrieve settings store selection
	*/
  settings$: Observable<ISettingsState>;
  /**
	* reference to username input element
	*/
  @ViewChild("userName") usernameFiels: ElementRef;
  /**
  * inject Store
  */
  constructor(private store: Store<IAppState>) { }
	/**
	* Implements ngOnInit to update settings date from the store
	*/
  ngOnInit() {
    this.settings$ = this.store.pipe(select(selectSettings));
  }
  /**
  * Focus on username input after view init
  */
  ngAfterViewInit(){
    setTimeout(() => {this.usernameFiels.nativeElement.focus()});
  }
  /**
  * return supported languages array to be used for language select
  */
  get languages(): string[] {
    return environment.supportedLanguages;
  }
  /**
  * dispatch store with ChangeName action on username change
  */
  onUserNameChange(name: string) {
    this.store.dispatch(new ChangeName(name));
  }
  /**
  * dispatch store with ChangeClock action on clock button toggle change
  */
  onTimeDisplayChange(clock: boolean) {
    this.store.dispatch(new ChangeClock(clock));
  }
  /**
  * dispatch store with ChangeTheme action on theme selection change
  */
  onThemeChange(theme: string) {
    this.store.dispatch(new ChangeTheme(theme));
  }
  /**
  * dispatch store with ChangeSendOnEnter action on slider change
  */
  onSendOnEnterToggle(sendonenter: boolean) {
    this.store.dispatch(new ChangeSendOnEnter(sendonenter));
  }
  /**
  * dispatch store with ChangeLanguage action on select change
  */
  onLanguageSelect(language: string) {
    this.store.dispatch(new ChangeLanguage(language));
  }
  /**
  * dispatch store with Reset action on click reset button
  */
  reset(){
    this.store.dispatch(new Reset());
  }
  
}
