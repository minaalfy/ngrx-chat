import { IUser } from "@app/core/models/user.interface";

export interface ISettingsState {
    user: IUser;
    theme: string;
    clock: boolean;
    sendonenter: boolean;
    language: string;
}

export const initialSettingsState: ISettingsState = {
  user: {
    userid: 1234,
    username: "guest1234"
  },
  theme: "light-theme",
  clock: true,
  sendonenter: false,
  language: "en-US"
};
