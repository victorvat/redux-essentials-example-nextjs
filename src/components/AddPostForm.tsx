import { useAppDispatch } from '@/redux/app/hooks'
import { postAdded } from '@/redux/features/posts /postsSlice'
import { nanoid } from '@reduxjs/toolkit'
import React, { FunctionComponent, useCallback, useState } from 'react'

const AddPostForm: FunctionComponent = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const dispatch = useAppDispatch()

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)

  const onSavePostClicked = useCallback(
    () => {
      if (title && content) {
        dispatch(
          postAdded({
            id: nanoid(),
            title,
            content
          })
        )

        setTitle('')
        setContent('')
      }
    }
    , [content, dispatch, title]);

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
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
        <button type="button" onClick={onSavePostClicked}>Save Post</button>
      </form>
    </section>
  )
}

export default AddPostForm;
