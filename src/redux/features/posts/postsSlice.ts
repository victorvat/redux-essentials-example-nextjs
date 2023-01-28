import { RootState } from '@/redux/app/store';
import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import { sub } from 'date-fns';
import { IUserTuple } from '../users/usersSlice';

export enum ReactionEnum {
  thumbsUp = 'thumbsUp',
  hooray = 'hooray',
  heart = 'heart',
  rocket = 'rocket',
  eyes = 'eyes',
}

type IReactions = Record<ReactionEnum, number>;

export type IPostTuple = {
  id: string;
  title: string;
  content: string;
  user: IUserTuple;
  date: string;
  reactions: IReactions;
};

export type IPostsState = {
  posts: IPostTuple[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};
const initialState: IPostsState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  // debugger;
  const response = await fetch('/api/fakeApi/posts');
  // debugger;
  const result = await response.json();
  // debugger;
  // console.log('fetchPosts returns result:', result);
  return result;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<IPostTuple>) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
            date: new Date().toISOString(),
            reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
          },
        };
      },
    },

    reactionAdded(
      state,
      action: PayloadAction<{ postId: string; reaction: ReactionEnum }>
    ) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },

    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state /*, action */) => {
        // debugger;
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        // debugger;
        state.status = 'succeeded';
        // Add any fetched posts to the array
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        // debugger;
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { reactionAdded, postAdded, postUpdated } = postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts = (state: RootState) => state.posts.posts;

export const selectPostById = (state: RootState, postId: string) =>
  state.posts.posts.find((post) => post.id === postId);
