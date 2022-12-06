import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toastError, toastSuccess } from "../../Toast/Toast"

export const fetchPostAccess0 = createAsyncThunk(
  "postUser/fetch0",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v2/post/drafts"
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

export const fetchPostAccess1 = createAsyncThunk(
  "postUser/fetch1",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v2/post/public"
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

export const fetchPostAccess2 = createAsyncThunk(
  "postUser/fetch2",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v2/post/unlisted"
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

export const fetchPostNewest = createAsyncThunk(
  "postUser/fetchPostNewest",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v2/post/trending"
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
export const changeAccessPost = createAsyncThunk(
  "postUser/changeAccessPost",
  async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v2/post/${data.id_post}/access/${data.access}`
      )
      if (response.status === 200) {
        return await {
          ...response.data,
          status: response.status,
          type: data.type,
          id_post: data.id_post,
        }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)

export const deletePost = createAsyncThunk(
  "postUser/delete",
  async (id_post) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v2/post/${id_post}`
      )
      if (response.status === 200) {
        return await {
          ...response.data,
          status: response.status,
          id_post: id_post,
        }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)
const fetchPost = createSlice({
  name: "postUser",
  initialState: {
    postUser: [],
    postAccess1: [],
    postAccess2: [],
    postNewest: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostAccess0.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.postUser = action.payload.data
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(fetchPostNewest.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.postNewest = action.payload.data.splice(0, 4)
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(fetchPostAccess1.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.postAccess1 = action.payload.data
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(fetchPostAccess2.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.postAccess2 = action.payload.data
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(changeAccessPost.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          if (action.payload.type === 0) {
            state.postUser = state.postUser.filter(
              (post) => post.post.id_post !== action.payload.id_post
            )
          } else if (action.payload.type === 1) {
            state.postAccess1 = state.postAccess1.filter(
              (post) => post.post.id_post !== action.payload.id_post
            )
          } else {
            state.postAccess2 = state.postAccess2.filter(
              (post) => post.post.id_post !== action.payload.id_post
            )
          }
          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.postUser = state.postUser.filter(
            (post) => post.post.id_post !== action.payload.id_post
          )

          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
  },
})

const fetchPostUser = fetchPost.reducer

export const postUserSelect = (state) => state.fetchPostUser.postUser
export const postUserSelect1 = (state) => state.fetchPostUser.postAccess1
export const postUserSelect2 = (state) => state.fetchPostUser.postAccess2
export const postNewestSelector = (state) => state.fetchPostUser.postNewest

export default fetchPostUser
