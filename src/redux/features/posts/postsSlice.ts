import { RootState } from '@/redux/app/store';
import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '@/pages/api/posts';
// import { /*sub, */ parseISO } from 'date-fns';
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
// const initialState: IPostsState = {
//   posts: [],
//   status: 'idle',
//   error: null,
// };

const postsAdapter = createEntityAdapter<IPostTuple>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (): Promise<IPostTuple[]> => {
    const response = await fetch('/api/posts');
    const json = (await response.json()) as IPost[];
    // debugger;
    const result: IPostTuple[] = json.map((tuple) => ({
      id: tuple.id.toString(),
      title: tuple.title,
      content: tuple.content,
      user: tuple.userId.toString(),
      date: tuple.date as unknown as string,
      reactions: {
        thumbsUp:
          tuple.Reaction &&
          Array.isArray(tuple.Reaction) &&
          tuple.Reaction.length > 0
            ? tuple.Reaction[0].thumbsUp
            : 0,
        hooray:
          tuple.Reaction &&
          Array.isArray(tuple.Reaction) &&
          tuple.Reaction.length > 0
            ? tuple.Reaction[0].hooray
            : 0,
        heart:
          tuple.Reaction &&
          Array.isArray(tuple.Reaction) &&
          tuple.Reaction.length > 0
            ? tuple.Reaction[0].heart
            : 0,
        rocket:
          tuple.Reaction &&
          Array.isArray(tuple.Reaction) &&
          tuple.Reaction.length > 0
            ? tuple.Reaction[0].rocket
            : 0,
        eyes:
          tuple.Reaction &&
          Array.isArray(tuple.Reaction) &&
          tuple.Reaction.length > 0
            ? tuple.Reaction[0].eyes
            : 0,
      },
    }));
    return result;
  }
);

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  // The payload creator receives the partial `{title, content, user}` object
  async (initialPost: { title: string; content: string; user: string }) => {
    // We send the initial data to the fake API server
    // debugger;
    const response = await fetch(`/api/posts`, {
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
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },

    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.entities[id];
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
        // Use the `upsertMany` reducer as a mutating update utility
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne);
  },
});

export const { reactionAdded, postUpdated } = postsSlice.actions;

export default postsSlice.reducer;

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state: RootState) => state.posts);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
);
