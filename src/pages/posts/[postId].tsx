import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useAppSelector } from '@/redux/app/hooks'

const SinglePostPage: NextPage = (): JSX.Element => {
  const router = useRouter()
  const { postId } = router.query  

  const post = useAppSelector(state =>
    state.posts.find(post => post.id === postId)
  )

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
      </article>
    </section>
  )
}
export default SinglePostPage;
