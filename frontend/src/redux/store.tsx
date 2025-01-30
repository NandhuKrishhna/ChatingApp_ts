import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { chatApi } from "./api/chatApi";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";
import chatReducer from "./slices/chatSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    auth: authReducer,
    theme: themeReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, chatApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
