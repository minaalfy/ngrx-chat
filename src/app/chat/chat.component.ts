import { Component, OnInit, ElementRef, ViewChild, QueryList, ViewChildren, ɵConsole } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { MatListItem } from '@angular/material';
import { SocketioService } from '@app/core/services/socketio/socketio.service';
import { Message } from '@app/core/models/message.interface';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/core/store/state/app.state';
import { Observable } from 'rxjs';
import { SendMessage, SaveCurrentMsg } from "@app/core/store/actions/chat.actions";
import { selectChat } from '@app/core/store/selectors/chat.selector';
import { map, tap, distinctUntilChanged } from 'rxjs/operators';
import { IUser } from '@app/core/models/user.interface';
import { selectSettings } from '@app/core/store/selectors/settings.selector';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild("messageText") messageField: ElementRef;
  @ViewChild(NgScrollbar) scrollbarRef: NgScrollbar;
  @ViewChildren('allMessagesItems') messagesItems: QueryList<MatListItem>;
  appstate$: Observable<IAppState>;
  user: IUser;


  messages: Message[] = [];
  text: string;
  constructor(
    private socket: SocketioService,
    private store: Store<IAppState>
    ) { }

  ngOnInit() {
    this.appstate$ = this.store;
    this.appstate$.pipe(
      select(selectSettings),
      map(settings => settings.user)
    ).subscribe(user => {this.user = user});
  }
  
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

  ngOnDestroy(){
    if(this.messageField.nativeElement.value) {
      this.store.dispatch(new SaveCurrentMsg(this.messageField.nativeElement.value));
    }
  }
}
