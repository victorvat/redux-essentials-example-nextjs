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
  // console.log("ReactionButtons() post is:", post)
  // console.log("ReactionButtons() post?.Reaction is:", post?.Reaction)
  const dispatch = useAppDispatch();
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    // console.log("ReactionButtons() name is:", name);
    // debugger;
    // console.log("post?.reactions[name as ReactionEnum] is:", post?.reactions[name as ReactionEnum])
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
        {`${emoji} ${
          post &&
          post.Reaction &&
          name &&
          post.Reaction[0][name as ReactionEnum]
        }`}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
