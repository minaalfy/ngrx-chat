import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { PickerModule } from '@ctrl/ngx-emoji-mart'

import { CoreModule } from "@app/core";
import { MaterialModule } from "@app/material.module";
import { NgScrollbarModule } from "ngx-scrollbar";
import { ChatRoutingModule } from "./chat-routing.module";
import { ChatComponent } from "./chat.component";
import { SocketioService } from "@app/core/services/socketio/socketio.service";
import { MessageComponent } from "./message/message.component";
import { ParserPipe } from './message/parser.pipe';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CoreModule,
    FlexLayoutModule,
    MaterialModule,
    NgScrollbarModule,
    PickerModule,
    ChatRoutingModule
  ],
  declarations: [ChatComponent, MessageComponent, ParserPipe],
  providers: [SocketioService]
})
export class ChatModule {}
