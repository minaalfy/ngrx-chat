import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Message } from '@app/core/models/message.interface';
import { Observable } from 'rxjs';
import { ISettingsState } from '@app/core/store/state/settings.state';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/core/store/state/app.state';
import { selectSettings } from '@app/core/store/selectors/settings.selector';
/**
* MessageComponent is an Angular component that takes Message object and display this message
*/
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('0.5s cubic-bezier(.8, -0.6, 0.2, 1.5)', 
          style({ transform: 'scale(1)', opacity: 1 }))  // final
      ])
    ])
  ]
})
export class MessageComponent implements OnInit {
  /**
	* Message is the message object the carry the details of the message to be displayed
	*/
  @Input() message: Message;
  /**
	* settings used to retrieve settings store selection
	*/
  settings$: Observable<ISettingsState>;
  /**
	* format string for the date pipe
	*/
  format: string;
  /**
  * inject Store
  */
  constructor(private store: Store<IAppState>) { }
	/**
	* Implements ngOnInit to update settings date from the store
	*/
  ngOnInit() {
    this.settings$ = this.store.pipe(select(selectSettings));
    this.settings$.subscribe((settings)=>{
      this.format = settings.clock ? 'hh:mm' : 'HH:mm';
    })
  }

}
