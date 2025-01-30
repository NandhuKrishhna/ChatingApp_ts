// src/redux/slices/socketSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
}

const initialState: SocketState = {
  socket: null,
  isConnected: false,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<Socket >) => {
      state.socket = action.payload;
    },
    setSocketConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    disconnectSocket: (state) => {
      if (state.socket) {
        state.socket.disconnect();
        state.socket = null;
        state.isConnected = false;
      }
    },
  },
});

export const { setSocket, setSocketConnected, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;