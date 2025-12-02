import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  articles: [],
  status: "idle",
  error: null,
};

/* CREATE ARTICLE */
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

/* GET ALL ARTICLES */
export const getAllArticles = createAsyncThunk(
  "articles/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("articles");
      console.log(data)
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load articles"
      );
    }
  }
);


  //  LIKE ARTICLE  

export const likeArticle = createAsyncThunk(
  "articles/like",
  async (articleId, { rejectWithValue, getState }) => {
    try {
      const { data } = await api.put(`articles/${articleId}/like`);
      console.log(data)
  
      const state = getState();
      const currentUserId = state.auth?.user?.user?._id;

      return {
        articleId,
        updatedArticle: data.article,
        currentUserId,
      };

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to like article"
      );
    }
  }
);

/* COMMENT ON ARTICLE */
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

/* SLICE */
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

      /* LIKE ARTICLE  */
      .addCase(likeArticle.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(likeArticle.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { articleId, updatedArticle, currentUserId } = action.payload;
        const article = state.articles.find((a) => a._id === articleId);
        if (article) {
          // Update article data from backend
          article.likeCount = updatedArticle.likeCount;
          article.likedBy = updatedArticle.likedBy;
          article.likedByCurrentUser = updatedArticle.likedBy.includes(currentUserId);
        }
      })

      .addCase(likeArticle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      /* COMMENT */
      .addCase(commentArticle.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(commentArticle.fulfilled, (state, action) => {
        state.status = "succeeded";
        const article = state.articles.find(
          (a) => a._id === action.payload.articleId
        );
        if (article) {
          article.comments.push(action.payload.comment);
        }
      })

      .addCase(commentArticle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default articleSlice.reducer;
