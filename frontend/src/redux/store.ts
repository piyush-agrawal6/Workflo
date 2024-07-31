"use client"
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { reducer as authReducer } from "./auth/reducer";
import { reducer as taskReducer } from "./task/reducer";
import { thunk } from "redux-thunk";
const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
