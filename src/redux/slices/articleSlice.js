import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  articles: [],
  status: "idle",
  error: null,
};

export const createArticle = createAsyncThunk(
  "articles/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("articles", payload);
      console.log("created data: ",data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create article");
    }
  }
);

export const getAllArticles = createAsyncThunk(
  "articles/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("articles");
      console.log("coming data: ", data);
      return data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load articles");
    }
  }
);

export const likeArticle = createAsyncThunk(
  "articles/like",
  async (articleId, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`articles/${articleId}/like`);
      console.log("articles :", data);
      return { articleId, data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to like article");
    }
  }
);

export const commentArticle = createAsyncThunk(
  "articles/comment",
  async ({ articleId, text }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`articles/${articleId}/comment`, { text });
      console.log('comments', data)
      return { articleId, comment: data.comment };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to post comment");
    }
  }
);

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createArticle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles.push(action.payload.article);
        console.log(state)
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(getAllArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload;
      })
      .addCase(getAllArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(likeArticle.fulfilled, (state, action) => {
        const article = state.articles.find(a => a._id === action.payload.articleId);
        if (article) {
        article.likeCount = action.payload.data.likeCount;
        article.likedByCurrentUser = action.payload.data.likedByCurrentUser;
        article.likedBy = action.payload.data.likedBy;
        }
      })

      .addCase(commentArticle.fulfilled, (state, action) => {
        const article = state.articles.find(a => a._id === action.payload.articleId);
        if (article) {
          article.comments.push(action.payload.comment); 
        }
      });
  },
});

export default articleSlice.reducer;


