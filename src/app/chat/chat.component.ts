import { Component, OnInit, ElementRef, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { MatListItem } from '@angular/material';
import { Message } from '@app/core/models/message.interface';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/core/store/state/app.state';
import { Observable } from 'rxjs';
import { SendMessage, SaveCurrentMsg, BlinkTab, UnreadCount } from "@app/core/store/actions/chat.actions";
import { selectChat } from '@app/core/store/selectors/chat.selector';
import { map, first } from 'rxjs/operators';
import { IUser } from '@app/core/models/user.interface';
import { selectSettings } from '@app/core/store/selectors/settings.selector';

/**
* ChatComponent is a container for messages and chat input with it's options
*/
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  /**
  * reference to chat input element
  */
  @ViewChild("messageText") messageField: ElementRef;
  /**
  * reference to messages container element
  */
  @ViewChild(NgScrollbar) scrollbarRef: NgScrollbar;
  /**
  * reference to messages elements
  */
  @ViewChildren('allMessagesItems') messagesItems: QueryList<MatListItem>;
  /**
  * reference to State
  */
  appstate$: Observable<IAppState>;
  /**
  * reference to User object
  */
  user: IUser;
  /**
  * Boolean to show/hide emoji list
  */
  emojiShow = false;
  /**
  * inject Store
  */
  constructor(
    private store: Store<IAppState>
    ) { }
  /**
  * declate state, subscribe to changes in userid, reset blink animation, reset unread message counter
  */
  ngOnInit() {
    this.appstate$ = this.store;
    this.appstate$.pipe(
      select(selectSettings),
      map(settings => settings.user)
    ).subscribe(user =>{
        this.user = user;
    });
    this.appstate$.pipe(
      select(selectChat),
      first()
      ).subscribe(chat => {
      if(chat.blink){
        this.store.dispatch(new BlinkTab(false));
      }
      if(chat.unread) {
        this.store.dispatch(new UnreadCount(0));
      }
    });
  }
  /**
  * remove blick animation, reset the unread message counter and scroll messages to bottom
  */
  ngAfterViewInit(){
    setTimeout(() => {
      this.messageField.nativeElement.focus();
      this.store.select(selectChat).subscribe((chat)=>{
        this.messageField.nativeElement.value = chat.currentMessage;
      });
      this.messagesItems.changes.subscribe(() => {
        this.scrollbarRef.scrollToBottom(200);
      });
    });
  }
  /**
  * build message object the dispatch the store with SendMessage action
  */
  sendMessage(ev: string){
    if(ev){
      const msg = {
        user: this.user,
        time: new Date(),
        message: ev
      }
      this.store.dispatch(new SendMessage(msg));
    }
  }
  /**
  * save current text in the input before leave the chat page
  */
  ngOnDestroy(){
    if(this.messageField.nativeElement.value) {
      this.store.dispatch(new SaveCurrentMsg(this.messageField.nativeElement.value));
    }
  }
  /**
  * Add emoji to the input after selection
  */
  addEmoji(ev: any) {
    this.messageField.nativeElement.value += ' ' + ev.emoji.native + ' ';
  }
}
