import { IUser } from "@app/core/models/user.interface";
import { environment } from "@env/environment.prod";

export interface ISettingsState {
    user: IUser;
    theme: string;
    clock: boolean;
    sendonenter: boolean;
    language: string;
}

export const initialSettingsState: ISettingsState = {
  user: {
    userid: 0,
    username: environment.defaultUserName
  },
  theme: "light-theme",
  clock: true,
  sendonenter: false,
  language: "en-US"
};
