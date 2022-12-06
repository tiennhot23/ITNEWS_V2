import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toastError, toastSuccess } from "../../Toast/Toast"

export const fetchPostStatus = createAsyncThunk(
  "changeStatusP/fetch",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v2/post/status/0/1"
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

const changeStatusPost = createSlice({
  name: "changeStatusP",
  initialState: {
    statusPost: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostStatus.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.statusPost = action.payload.data
        toastSuccess(action.payload.message)
      } else {
        toastError(action.payload.message)
      }
    })
  },
})

const changeStatusPostReducer = changeStatusPost.reducer

export const changeStatusPostSelector = (state) =>
  state.changeStatusPostReducer.statusPost

export default changeStatusPostReducer
