import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toastError, toastSuccess } from "../../Toast/Toast"

export const fetchPostStatus = createAsyncThunk(
  "changeStatusP/fetch",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v2/post/browse"
      )
      if (response.status === 200) {
        return await { ...response.data, status: response.status }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)
export const fetchPostUser = createAsyncThunk(
  "changeStatusP/postUser",
  async (id_account) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v2/account/${id_account}/posts`
      )
      if (response.status === 200) {
        return await { ...response.data, status: response.status }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)
export const changeStatus = createAsyncThunk(
  "changeStatusP/change",
  async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v2/post/${data.id_post}/status/${data.status}`
      )
      if (response.status === 200) {
        return await {
          ...response.data,
          status: response.status,
          id_post: data.id_post,
        }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)

export const searchPost = createAsyncThunk(
  "changeStatusP/search",
  async (keyword) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v2/post/search?k=${keyword}`
      )
      if (response.status === 200) {
        return await {
          ...response.data,
          status: response.status,
        }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)

export const fetchPNews = createAsyncThunk(
  "changeStatusP/fetchPostNews",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v2/post/newest`
      )
      if (response.status === 200) {
        return await {
          ...response.data,
          status: response.status,
        }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)
const changeStatusPost = createSlice({
  name: "changeStatusP",
  initialState: {
    statusPost: [],
    postUser: [],
    searchPost: [],
    postNews: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostStatus.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.statusPost = action.payload.data
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.statusPost = state.statusPost.filter(
            (post) => post.post.id_post !== action.payload.id_post
          )
          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(fetchPostUser.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.postUser = action.payload.data
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(searchPost.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.searchPost = action.payload.data
        } else {
        }
      })
      .addCase(fetchPNews.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.postNews = action.payload.data
        } else {
        }
      })
  },
})

const changeStatusPostReducer = changeStatusPost.reducer

export const changeStatusPostSelector = (state) =>
  state.changeStatusPostReducer.statusPost
export const postUserSelector = (state) =>
  state.changeStatusPostReducer.postUser
export const searchPostSelector = (state) =>
  state.changeStatusPostReducer.searchPost
export const pNewsSelector = (state) => state.changeStatusPostReducer.postNews
export default changeStatusPostReducer
