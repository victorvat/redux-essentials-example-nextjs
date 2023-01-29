import { RootState } from '@/redux/app/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type IUserTuple = {
  id: string;
  name: string;
};
const initialState: IUserTuple[] = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('/api/fakeApi/users');
  const result = await response.json();
  return result;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAllUsers = (state: RootState) => state.users;
export const selectUserById = (state: RootState, userId: string) =>
  state.users.find((user) => user.id === userId);

export default usersSlice.reducer;
