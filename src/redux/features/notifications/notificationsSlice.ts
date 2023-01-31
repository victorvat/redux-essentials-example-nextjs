import { RootState } from '@/redux/app/store';
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

export type INotificationTuple = {
  id: string;
  date: string;
  user: string;
  message: string;
  read: boolean;
  isNew: boolean;
};
const notificationsAdapter = createEntityAdapter<INotificationTuple>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    // eslint-disable-next-line no-use-before-define
    const allNotifications = selectAllNotifications(getState() as RootState);
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.date : '';
    const response = await fetch(`/api/notifications?since=${latestTimestamp}`);
    const result = await response.json();
    return result;
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    allNotificationsRead(state, action) {
      Object.values(state.entities).forEach((notification) => {
        notification.read = true;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      notificationsAdapter.upsertMany(state, action.payload);
      Object.values(state.entities).forEach((notification) => {
        // Any notifications we've read are no longer new
        notification.isNew = !notification.read;
      });
    });
  },
});

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;

export const { selectAll: selectAllNotifications } =
  notificationsAdapter.getSelectors((state: RootState) => state.notifications);
