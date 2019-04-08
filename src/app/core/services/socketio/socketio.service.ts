import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { environment } from "@env/environment";
import { Message } from "../../models/message.interface";

@Injectable({
  providedIn: "root"
})
export class SocketioService extends Socket {
  chatReceived$ = this.fromEvent("chat-received");
  userCreated$ = this.fromOneTimeEvent("user-created");
  constructor() {
    super({
      url: environment.serverUrl,
      options: {}
    });
  }
  chatSend(msg: Message) {
    this.emit("chat", msg);
  }
}
