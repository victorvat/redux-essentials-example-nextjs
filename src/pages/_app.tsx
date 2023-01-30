import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux/app/store';
// import { extendedApiSlice } from '@/redux/features/users/usersSlice';

export default function App({ Component, pageProps }: AppProps) {
  // store.dispatch(extendedApiSlice.endpoints.getUsers.initiate(undefined))

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
