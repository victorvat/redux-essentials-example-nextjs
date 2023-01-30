import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
// import usersReducer from '../features/users/usersSlice';
import notificationReducer from '../features/notifications/notificationsSlice';
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    // users: usersReducer,
    notifications: notificationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
