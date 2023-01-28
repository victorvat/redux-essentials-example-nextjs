import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/redux/app/hooks';
import Link from 'next/link';
import { ReactionButtons } from '@/components/ReactionButtons';
import { selectPostById } from '@/redux/features/posts/postsSlice';

/**
 * SinglePostPage
 */
const ShowPostPage: NextPage = (): JSX.Element => {
  const router = useRouter();
  const { postId } = router.query;

  const post = useAppSelector((state) =>
    selectPostById(state, postId as string)
  );

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link href={`/edit/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  );
};
export default ShowPostPage;
