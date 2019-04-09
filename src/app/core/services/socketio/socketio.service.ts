import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { environment } from "@env/environment";
import { Message } from "../../models/message.interface";

/**
* SocketioService extends Socket class and used to initialize server connection then listen,emit to it
*/
@Injectable({
  providedIn: "root"
})
export class SocketioService extends Socket {
  /**
  * chatReceived is a listner to "chat-received" server event
  */
  chatReceived$ = this.fromEvent("chat-received");
  /**
  * userCreated is a one time listner to "user-created" server event
  */
  userCreated$ = this.fromOneTimeEvent("user-created");
  /**
  * initialize the connection with the "url"
  */
  constructor() {
    super({
      url: environment.serverUrl,
      options: {}
    });
  }
  /**
  * emit "chat" event to server with msg data
  */
  chatSend(msg: Message) {
    this.emit("chat", msg);
  }
}
