import { RootState } from '@/redux/app/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export type INotificationTuple = {
  id: string;
  date: string;
  user: string;
  message: string;
  read: boolean;
  isNew: boolean;
};
const initialState: INotificationTuple[] = [];

export const selectAllNotifications = (state: RootState) => state.notifications;

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState() as RootState);
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.date : '';
    const response = await fetch(
      `/fakeApi/notifications?since=${latestTimestamp}`
    );
    const result = await response.json();
    return result;
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    allNotificationsRead(state /*, action */) {
      state.forEach((notification) => {
        notification.read = true;
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(...action.payload);
      state.forEach((notification) => {
        // Any notifications we've read are no longer new
        notification.isNew = !notification.read;
      });
      // Sort with newest first
      state.sort((a, b) => b.date.localeCompare(a.date));
    });
  },
});

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;
