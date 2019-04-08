import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ISettingsState } from '@app/core/store/state/settings.state';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ChangeSendOnEnter, ChangeLanguage, ChangeClock, ChangeTheme, ChangeName, Reset } from "@app/core/store/actions/settings.actions";
import { IAppState } from '@app/core/store/state/app.state';
import { selectSettings } from '@app/core/store/selectors/settings.selector';
import { environment } from '@env/environment';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings$: Observable<ISettingsState>;
  @ViewChild("userName") usernameFiels: ElementRef;

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.settings$ = this.store.pipe(select(selectSettings));
  }
  ngAfterViewInit(){
    setTimeout(() => {this.usernameFiels.nativeElement.focus()});
  }

  get languages(): string[] {
    return environment.supportedLanguages;
  }

  onUserNameChange(name: string) {
    this.store.dispatch(new ChangeName(name));
  }
  onTimeDisplayChange(clock: boolean) {
    this.store.dispatch(new ChangeClock(clock));
  }
  onThemeChange(theme: string) {
    this.store.dispatch(new ChangeTheme(theme));
  }
  
  onSendOnEnterToggle(sendonenter: boolean) {
    this.store.dispatch(new ChangeSendOnEnter(sendonenter));
  }
  onLanguageSelect(language: string) {
    this.store.dispatch(new ChangeLanguage(language));
  }
  reset(){
    this.store.dispatch(new Reset());
  }
  
}
