import React from 'react';
import { useAppSelector } from '@/redux/app/hooks';
import Link from 'next/link';

import { selectUserById } from '@/redux/features/users/usersSlice';
import { selectPostsByUser } from '@/redux/features/posts/postsSlice';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

const UserPage: NextPage = (): JSX.Element => {
  const router = useRouter();
  const { userId } = router.query;

  const user = useAppSelector((state) =>
    selectUserById(state, userId as string)
  );

  const postsForUser = useAppSelector((state) =>
    selectPostsByUser(state, userId)
  );

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link href={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user?.name || ''}</h2>

      <ul>{postTitles}</ul>
    </section>
  );
};
export default UserPage;
