import { IAuthResponse, ITokens } from "@/store/user/user.interface";
import { TokenType } from "@/types/cookies/token.enum";
import Cookies from "js-cookie";

export const getAccessToken = () => {
  const access_token = Cookies.get(TokenType.ACCESS_TOKEN);

  if (!access_token) {
    throw new Error("Access token not found");
  }

  return access_token;
};

export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};

export const saveTokensStorage = (data: ITokens) => {
  Cookies.set(TokenType.ACCESS_TOKEN, data.access_token);
  Cookies.set(TokenType.REFRESH_TOKEN, data.refresh_token);
};

export const removeTokensStorage = () => {
  Cookies.remove(TokenType.ACCESS_TOKEN);
  Cookies.remove(TokenType.REFRESH_TOKEN);
};

export const saveToStorage = (data: IAuthResponse) => {
  saveTokensStorage(data);
  localStorage.setItem("user", JSON.stringify(data.user));
};
