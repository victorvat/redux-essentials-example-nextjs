import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Spinner } from '@/components/Spinner';
import {
  useEditPostMutation,
  useGetPostQuery,
} from '@/redux/features/posts/postsSlice';

/**
 *
 * EditPostForm
 */
const EditPostPage: NextPage = (): JSX.Element => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: post } = useGetPostQuery(postId);

  const [updatePost, { isLoading }] = useEditPostMutation();

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const onSavePostClicked = async () => {
    if (title && content) {
      await updatePost({ id: postId, title, content });
      router.push(`/show/${postId}`);
    }
  };

  let render;

  if (isLoading) {
    render = <Spinner text="Loading..." />;
  } else if (post) {
    render = (
      <section>
        <h2>Edit Post</h2>
        <form>
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            placeholder="What's on your mind?"
            value={title}
            onChange={onTitleChanged}
          />
          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
          />
        </form>
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </section>
    );
  } else {
    render = <h3>Page not found</h3>;
  }

  return <section>{render}</section>;
};
export default EditPostPage;
