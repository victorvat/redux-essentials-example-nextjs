import { apiSlice } from '../api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;

export const selectUsersResult =
  usersApiSlice.endpoints.getUsers.select(undefined);
