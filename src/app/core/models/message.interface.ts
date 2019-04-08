import { IUser } from "./user.interface";

export interface Message {
    user: IUser;
    time: Date;
    message: string;
}