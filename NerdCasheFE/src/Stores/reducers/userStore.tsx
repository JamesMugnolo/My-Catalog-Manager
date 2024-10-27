import { Reducer } from "react";

interface IUser {
  username: string;
}
interface IUserState {
  user: string | null;
}
const InitUserState: IUserState = {
  user: null,
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
      };

    case "REMOVE_USER": {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
};
interface set_user_credentials_action {
  type: "SET_USER_CREDENTIALS";
  user: string;
}
interface remove_user_action {
  type: "REMOVE_USER";
}

type userActions = set_user_credentials_action | remove_user_action;
