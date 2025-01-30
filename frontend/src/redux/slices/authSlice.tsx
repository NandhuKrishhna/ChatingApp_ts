import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:6000" : "http://localhost:6000";

interface AuthUser {
    id: string;
    name: string;
    email: string;
  }
  
  interface AuthState {
    authUser: AuthUser | null;
    isCheckingAuth: boolean;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
  }


  const initialState: AuthState = {
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
  };
  
  export const authSlice = createSlice({
    name :"auth",
    initialState,
    reducers: {
        setAuthUser: (state : AuthState, action: PayloadAction<AuthUser | null>) => {
          state.authUser = action.payload;
        },
        setCheckingAuth: (state : AuthState, action: PayloadAction<boolean>) => {
          state.isCheckingAuth = action.payload;
        },
        setSigningUp: (state : AuthState, action: PayloadAction<boolean>) => {
          state.isSigningUp = action.payload;
        },
        setLoggingIn: (state : AuthState, action: PayloadAction<boolean>) => {
          state.isLoggingIn = action.payload;
        },
        setUpdatingProfile: (state : AuthState, action: PayloadAction<boolean>) => {
          state.isUpdatingProfile = action.payload;
        }
    }
  });


  export const {
    setAuthUser,
    setCheckingAuth,
    setSigningUp,
    setLoggingIn,
  } = authSlice.actions;
  export const selectAuthUser = (state: RootState) => state.auth.authUser;
  export default authSlice.reducer;