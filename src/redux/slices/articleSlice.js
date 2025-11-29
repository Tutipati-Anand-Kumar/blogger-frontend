import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  articles: [],
  status: "idle",
  error: null,
};

/* ------------------------------------------------------
   CREATE ARTICLE
------------------------------------------------------ */
export const createArticle = createAsyncThunk(
  "articles/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("articles", payload);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create article"
      );
    }
  }
);

/* ------------------------------------------------------
   GET ALL ARTICLES
------------------------------------------------------ */
export const getAllArticles = createAsyncThunk(
  "articles/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("articles");
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load articles"
      );
    }
  }
);

/* ------------------------------------------------------
   LIKE ARTICLE  ⭐ FIXED ⭐
------------------------------------------------------ */
export const likeArticle = createAsyncThunk(
  "articles/like",
  async (articleId, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`articles/${articleId}/like`);

      // backend returns { message: "...", article: {...} }
      return {
        articleId,
        data: data.article,
      };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to like article"
      );
    }
  }
);

/* ------------------------------------------------------
   COMMENT ON ARTICLE
------------------------------------------------------ */
export const commentArticle = createAsyncThunk(
  "articles/comment",
  async ({ articleId, text }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`articles/${articleId}/comment`, { text });
      return { articleId, comment: data.comment };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to post comment"
      );
    }
  }
);

/* ------------------------------------------------------
   SLICE
------------------------------------------------------ */
const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      /* CREATE */
      .addCase(createArticle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles.push(action.payload.article);
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      /* GET ALL */
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

      /* ------------------------------------------------------
         LIKE ARTICLE  ⭐ FINAL FIXED VERSION ⭐
      ------------------------------------------------------ */
      .addCase(likeArticle.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(likeArticle.fulfilled, (state, action) => {
        state.status = "succeeded";

        const { articleId, data } = action.payload;

        const article = state.articles.find((a) => a._id === articleId);
        if (article) {

          // Get logged-in user ID from localStorage
          const userId = localStorage.getItem("userId");

          // Backend gives us: likedBy: [userIds]
          const likedByCurrentUser = data.likedBy.includes(userId);

          // Update article in Redux
          article.likeCount = data.likeCount;
          article.likedBy = data.likedBy;
          article.likedByCurrentUser = likedByCurrentUser;
        }
      })
      .addCase(likeArticle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      /* COMMENT */
      .addCase(commentArticle.fulfilled, (state, action) => {
        const article = state.articles.find(
          (a) => a._id === action.payload.articleId
        );
        if (article) {
          article.comments.push(action.payload.comment);
        }
      });
  },
});

export default articleSlice.reducer;
