import { RootState } from '@/redux/app/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import { sub } from 'date-fns';
// import { IUserTuple } from '../users/usersSlice';

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

  // user: IUserTuple;
  user: string;

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
  const response = await fetch('/api/fakeApi/posts');
  const result = await response.json();
  return result;
});

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  // The payload creator receives the partial `{title, content, user}` object
  async (initialPost: { title: string; content: string; user: string }) => {
    // We send the initial data to the fake API server
    const response = await fetch(`/api/fakeApi/posts`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(initialPost),
    });
    const result = await response.json();
    // The response includes the complete post object, including unique ID
    return result;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
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
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      // We can directly add the new post object to our posts array
      state.posts.push(action.payload);
    });
  },
});

export const { reactionAdded, postUpdated } = postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts = (state: RootState) => {
  // debugger;
  return state.posts.posts;
};

export const selectPostById = (state: RootState, postId: string) =>
  state.posts.posts.find((post) => post.id === postId);
