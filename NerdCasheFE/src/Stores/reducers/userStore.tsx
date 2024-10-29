import { Reducer } from "react";

interface IUserState {
  user: string | null;
  accessToken: string | null;
}
const InitUserState: IUserState = {
  user: null,
  accessToken: null,
};

export const userReducer: Reducer<IUserState | undefined, userActions> = (
  state = InitUserState,
  action
) => {
  if (state == undefined) {
    state = InitUserState;
  }
  switch (action.type) {
    case "SET_USER_CREDENTIALS":
      return {
        ...state,
        user: action.user,
        accessToken: action.token,
      };

    case "REMOVE_USER": {
      return {
        user: null,
        accessToken: null,
      };
    }
    case "SET_ACCESS_TOKEN": {
      return {
        ...state,
        accessToken: action.token,
      };
    }
    default:
      return state;
  }
};
interface set_user_credentials_action {
  type: "SET_USER_CREDENTIALS";
  user: string;
  token: string;
}
interface remove_user_action {
  type: "REMOVE_USER";
}
interface set_token_action {
  type: "SET_ACCESS_TOKEN";
  token: string;
}

type userActions =
  | set_user_credentials_action
  | remove_user_action
  | set_token_action;
