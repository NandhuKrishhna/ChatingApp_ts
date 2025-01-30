import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../api/chatApi';


interface UserState {
  selectedUser: User | null;
}

const initialState: UserState = {
  selectedUser: null,
};

const chatSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setSelectedUser } = chatSlice.actions;
export default chatSlice.reducer;
