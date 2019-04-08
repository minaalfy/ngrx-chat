import { Message } from "@app/core/models/message.interface";

export interface IChatState {
    unread: number;
    messages: Message[];
    currentMessage: string;
    blinkChat: boolean;
}
export const initialChatState: IChatState = {
  unread: 0,
  messages: [],
  currentMessage: "",
  blinkChat: false
};
