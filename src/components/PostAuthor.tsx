import React, { FunctionComponent } from 'react';

type PostAuthorProps = {
  author: string;
};

export const PostAuthor: FunctionComponent<PostAuthorProps> = ({ author }) => {
  return <span>by {author || 'Unknown author'}</span>;
};
