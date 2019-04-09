import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Store } from '@ngrx/store';
import { MockStore } from '../../testing/utils';

import { MaterialModule } from '@app/material.module';
import { SettingsComponent } from './settings.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ISettingsState, initialSettingsState } from '@app/core/store/state/settings.state';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let store: MockStore<ISettingsState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          BrowserAnimationsModule,
          FlexLayoutModule,
          TranslateModule,
          FormsModule,
          MaterialModule
        ],
        providers: [
          { provide: Store, useClass: MockStore }   // use test store instead of ngrx store
        ],
        declarations: [SettingsComponent]
      })
      .compileComponents();
  }));

  beforeEach(inject([Store], (testStore: MockStore<ISettingsState>) => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = testStore;
    store.setState(initialSettingsState);
  }))

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
