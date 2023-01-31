import { useAppSelector, useAppDispatch } from '@/redux/app/hooks';
import {
  fetchPosts,
  IPostTuple,
  selectAllPosts,
  selectPostById,
  selectPostIds,
} from '@/redux/features/posts/postsSlice';
import Link from 'next/link';
import React, { FunctionComponent, useEffect } from 'react';
import { PostAuthor } from './PostAuthor';
import { ReactionButtons } from './ReactionButtons';
import { TimeAgo } from './TimeAgo';
import { Spinner } from './Spinner';

type IPostExcerptProps = {
  postId: string;
};
const PostExcerpt: FunctionComponent<IPostExcerptProps> = ({ postId }) => {
  const post = useAppSelector((state) => selectPostById(state, postId));
  if (!post) {
    return <></>;
  }
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link href={`/show/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};

export const PostsList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);

  const postStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);
  const orderedPostIds = useAppSelector(selectPostIds);

  useEffect(() => {
    if (postStatus === 'idle') {
      // debugger;
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />;
  } else if (postStatus === 'succeeded') {
    content = orderedPostIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId as string} />
    ));
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};
