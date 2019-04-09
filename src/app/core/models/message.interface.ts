import { IUser } from "./user.interface";
/**
 * Build Message Data Model
 */
export interface Message {
  /**
   * Message sender info
   */
  user: IUser;
  /**
   * Message sent datetime
  */
  time: Date;
  /**
   * Message text
  */
  message: string;
}
