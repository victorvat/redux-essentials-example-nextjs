import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ReactionButtons } from '@/components/ReactionButtons';
import { useGetPostQuery } from '@/redux/features/api/apiSlice';
import { Spinner } from '@/components/Spinner';
import { PostAuthor } from '@/components/PostAuthor';
import { TimeAgo } from '@/components/TimeAgo';

/**
 * SinglePostPage
 */
const ShowPostPage: NextPage = (): JSX.Element => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId);

  let content;

  if (isFetching) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor author={post.User.name} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link href={`/api/edit/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    );
  } else {
    content = <h3>Page not found</h3>;
  }

  return <section>{content}</section>;
};
export default ShowPostPage;
