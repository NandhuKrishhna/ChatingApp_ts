import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthUser {
    _id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    profilePic: string;
    token: string;
}

interface AuthState {
    authUser: AuthUser | null;
    isCheckingAuth: boolean;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    onlineUsers: string[];
}

const initialState: AuthState = {
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser: (state, action: PayloadAction<AuthUser | null>) => {
            state.authUser = action.payload;
        },
        setCheckingAuth: (state, action: PayloadAction<boolean>) => {
            state.isCheckingAuth = action.payload;
        },
        setSigningUp: (state, action: PayloadAction<boolean>) => {
            state.isSigningUp = action.payload;
        },
        setLoggingIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggingIn = action.payload;
        },
        setUpdatingProfile: (state, action: PayloadAction<boolean>) => {
            state.isUpdatingProfile = action.payload;
        }
    }
});

export const {
    setAuthUser,
    setCheckingAuth,
    setSigningUp,
    setLoggingIn,
    setUpdatingProfile
} = authSlice.actions;

export const selectAuthUser = (state: RootState) => state.auth.authUser;

export default authSlice.reducer;