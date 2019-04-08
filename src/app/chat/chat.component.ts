import { Component, OnInit, ElementRef, ViewChild, QueryList, ViewChildren, ɵConsole } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { MatListItem } from '@angular/material';
import { SocketioService } from '@app/core/services/socketio/socketio.service';
import { Message } from '@app/core/models/message.interface';
import { Store } from '@ngrx/store';
import { IAppState } from '@app/core/store/state/app.state';
import { Observable } from 'rxjs';
import { SendMessage, SaveCurrentMsg } from "@app/core/store/actions/chat.actions";
import { selectChat } from '@app/core/store/selectors/chat.selector';


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


  messages: Message[] = [];
  text: string;
  constructor(
    private socket: SocketioService,
    private store: Store<IAppState>
    ) { }

  ngOnInit() {
    this.appstate$ = this.store;
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
        user: {
          userid: 1234,
          username: "guest1234"
        },
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
