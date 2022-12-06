import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toastError, toastSuccess } from "../../Toast/Toast"

export const fetchPostId = createAsyncThunk("postId/id", async (id_post) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v2/post/${id_post}`
    )
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
})
const postId = createSlice({
  name: "postId",
  initialState: {
    postId: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostId.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.postId = action.payload.data
        toastSuccess(action.payload.message)
      } else {
        toastError(action.payload.message)
      }
      // console.log(state.postId)
    })
  },
})

const postIdReducer = postId.reducer

export const postIdSelector = (state) => state.postIdReducer.postId

export default postIdReducer
