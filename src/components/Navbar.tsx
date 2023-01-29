import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';
import {
  fetchNotifications,
  selectAllNotifications,
} from '@/redux/features/notifications/notificationsSlice';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';

const Navbar: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectAllNotifications);
  const numUnreadNotifications = notifications.filter((n) => !n.read).length;

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications());
  };

  let unreadNotificationsBadge;

  if (numUnreadNotifications > 0) {
    unreadNotificationsBadge = (
      <span className="badge">{numUnreadNotifications}</span>
    );
  }
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks"></div>
          <Link href="/">Posts</Link>
          <Link href="/users">Users</Link>
          <Link href="/notifications">
            Notifications {unreadNotificationsBadge}
          </Link>
        </div>
        <button className="button" onClick={fetchNewNotifications}>
          Refresh Notifications
        </button>
      </section>
    </nav>
  );
};

export default Navbar;
