import { useAppSelector } from '@/redux/app/hooks';
import { selectUserById } from '@/redux/features/users/usersSlice';
import React, { FunctionComponent } from 'react';

type PostAuthorProps = {
  userId: string;
};

export const PostAuthor: FunctionComponent<PostAuthorProps> = ({ userId }) => {
  const author = useAppSelector((state) => selectUserById(state, userId));

  return <span>by {author ? author.name : 'Unknown author'}</span>;
};
