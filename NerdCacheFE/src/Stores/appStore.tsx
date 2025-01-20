import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userStore";
import { ItemReducer } from "./reducers/ItemStore";

const rootReducer = combineReducers({
  users: userReducer,
  items: ItemReducer,
});

export const appStore = configureStore({ reducer: rootReducer });
export type appState = ReturnType<typeof rootReducer>;

appStore.subscribe(() => {
  console.log();
});
