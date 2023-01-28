import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { sub } from 'date-fns';

export type IPostTuple = {
  id: string;
  title: string;
  content: string;
  user: string;
  date: string
};
const initialState: IPostTuple[] = [
  { id: '1', title: 'First Post!', content: 'Hello!', user: "0", date: sub(new Date(), { minutes: 10 }).toISOString() },
  { id: '2', title: 'Second Post', content: 'More text', user: "1", date: sub(new Date(), { minutes: 5 }).toISOString() }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<IPostTuple>) {
        state.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
            date: (new Date()).toISOString()
          }
        }
      }
    },

    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },

  }
})

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer;
