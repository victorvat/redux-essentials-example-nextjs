import { useAppSelector } from '@/redux/app/hooks';
import { selectAllUsers } from '@/redux/features/users/usersSlice';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

const UsersList: NextPage = (): JSX.Element => {
  const users = useAppSelector(selectAllUsers);

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link href={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ));

  return (
    <section>
      <h2>Users</h2>

      <ul>{renderedUsers}</ul>
    </section>
  );
};

export default UsersList;
