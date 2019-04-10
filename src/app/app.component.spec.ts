import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TestingModule, MockStore } from '../testing/utils';

import { CoreModule } from '@app/core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture;
  let app: AppComponent;
  let store: MockStore<any>;
  let dispatchSpy;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        TestingModule,
        CoreModule
      ],
      declarations: [AppComponent],
      providers: []
    });
    TestBed.compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    store = TestBed.get(Store);
    store.setState({
      chat: {
        blink: false,
        autoNightMode: true,
        stickyHeader: true,
        pageAnimations: true,
        pageAnimationsDisabled: false,
        elementsAnimations: true,
        language: 'en'
      }
    });
  }));

  // it('should create the app', async(() => {
  //   expect(app).toBeTruthy();
  // }));

});
