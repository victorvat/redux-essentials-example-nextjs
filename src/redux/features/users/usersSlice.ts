import { IUser } from '@/pages/api/users';
import { RootState } from '@/redux/app/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type IUserTuple = {
  id: string;
  name: string;
};
const initialState: IUserTuple[] = [];

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (): Promise<IUserTuple[]> => {
    const response = await fetch('/api/users');
    const json = (await response.json()) as IUser[];
    const result: IUserTuple[] = json.map((tuple) => ({
      id: tuple.id.toString(),
      name: tuple.name,
    }));
    return result;
  }
);

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
