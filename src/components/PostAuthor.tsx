import { useAppSelector } from '@/redux/app/hooks';
import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

type PostAuthorProps = {
  userId: string;
};

export const PostAuthor: FunctionComponent<PostAuthorProps> = ({ userId }) => {
  const author = useAppSelector((state) =>
    state.users.find((user) => user.id === userId)
  );

  return <span>by {author ? author.name : 'Unknown author'}</span>;
};
