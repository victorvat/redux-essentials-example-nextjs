import {
  IPostTuple,
  useGetPostsQuery,
} from '@/redux/features/posts/postsSlice';
import Link from 'next/link';
import React, { FunctionComponent, useMemo } from 'react';
import { PostAuthor } from './PostAuthor';
import { ReactionButtons } from './ReactionButtons';
import { TimeAgo } from './TimeAgo';
import { Spinner } from './Spinner';
import classnames from 'classnames';

type IPostExcerptProps = {
  post: IPostTuple;
};
const PostExcerpt: FunctionComponent<IPostExcerptProps> = ({ post }) => {
  // console.log("PostExcerpt(): post is:", post)
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor author={post.User.name} />
        <TimeAgo timestamp={post.date as unknown as string} />
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
  const {
    data: posts = [], // undefined until the response is received
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error, // a serialized error object
    refetch,
  } = useGetPostsQuery(undefined);

  const sortedPosts = useMemo(() => {
    const sortedPosts = (posts as IPostTuple[]).slice();
    // Sort posts in descending chronological order
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date));
    return sortedPosts;
  }, [posts]);

  let content;

  if (isLoading) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    const renderedPosts = sortedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));

    const containerClassname = classnames('posts-container', {
      disabled: isFetching,
    });

    content = <div className={containerClassname}>{renderedPosts}</div>;
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <button onClick={refetch}>Refetch Posts</button>
      {content}
    </section>
  );
};
