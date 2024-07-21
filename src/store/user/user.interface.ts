import { IUser } from "@/types/user.interface";

export interface ITokens {
  access_token: string;
  refresh_token: string;
}

export interface IUserState {
  email: string;
}

export interface IAuthResponse extends ITokens {
  user: IUser;
}
