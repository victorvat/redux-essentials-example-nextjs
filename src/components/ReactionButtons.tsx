import { useAppDispatch } from '@/redux/app/hooks';
import {
  IPostTuple,
  reactionAdded,
  ReactionEnum,
} from '@/redux/features/posts/postsSlice';
import React, { FunctionComponent } from 'react';

const reactionEmoji: Record<ReactionEnum, string> = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
};

type ReactionButtonsProps = {
  post: IPostTuple;
};

export const ReactionButtons: FunctionComponent<ReactionButtonsProps> = ({
  post,
}) => {
  const dispatch = useAppDispatch();
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() =>
          dispatch(
            reactionAdded({ postId: post.id, reaction: name as ReactionEnum })
          )
        }
      >
        {`${emoji} ${post.reactions[name as ReactionEnum]}`}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
