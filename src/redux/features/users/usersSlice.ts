import { IUser } from '@/pages/api/users';
import { RootState } from '@/redux/app/store';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

export type IUserTuple = {
  id: string;
  name: string;
};
const usersAdapter = createEntityAdapter<IUserTuple>();

const initialState = usersAdapter.getInitialState();

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
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll);
  },
});

export default usersSlice.reducer;

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state: RootState) => state.users);
