import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toastError, toastSuccess } from "../../Toast/Toast"

export const loadAuthorFollow = createAsyncThunk(
  "followAuthor/fetch",
  async (id_account) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v2/account/${id_account}/follower`
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

export const loadFollowing = createAsyncThunk(
  "followAuthor/fetchFollowing",
  async (id_account) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v2/account/${id_account}/following`
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

export const followAuthor = createAsyncThunk(
  "followAuthor/follow",
  async (id_follower) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v2/follow_account/${id_follower}`
      )
      if (response.status === 200) {
        return await {
          ...response.data,
          status: response.status,
          id_follower: id_follower,
        }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)
export const deleteAuthor = createAsyncThunk(
  "followAuthor/deleteFollow",
  async (id_follower) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v2/follow_account/${id_follower}`
      )
      if (response.status === 200) {
        return await {
          ...response.data,
          status: response.status,
          id_follower: id_follower,
        }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)

const followAuthors = createSlice({
  name: "followAuthor",
  initialState: {
    followAuthors: [],
    following: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAuthorFollow.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.followAuthors = action.payload.data
        } else {
        }
      })
      .addCase(loadFollowing.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.following = action.payload.data
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(followAuthor.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.followAuthors = state.followAuthors.map((author) => {
            if (
              author.id_account === action.payload.id_follower &&
              author.status === false
            )
              author.status = !author.status
            return author
          })

          state.following = state.following.map((author) => {
            if (
              author.id_account === action.payload.id_follower &&
              author.status === false
            )
              author.status = !author.status
            return author
          })
          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(deleteAuthor.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.followAuthors = state.followAuthors.map((author) => {
            if (
              author.id_account === action.payload.id_follower &&
              author.status === true
            )
              author.status = !author.status
            return author
          })

          state.following = state.following.map((author) => {
            if (
              author.id_account === action.payload.id_follower &&
              author.status === true
            )
              author.status = !author.status
            return author
          })
          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
  },
})

const followAuthorReducer = followAuthors.reducer
export const followAuthorSelector = (state) =>
  state.followAuthorReducer.followAuthors

export const followingSelector = (state) => state.followAuthorReducer.following
export default followAuthorReducer
