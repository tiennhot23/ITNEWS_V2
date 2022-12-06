import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toastError } from "../../Toast/Toast"

export const fetchFeed = createAsyncThunk("feedback/fetch", async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v2/feedback/unread`
    )
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
})

export const readFeed = createAsyncThunk(
  "feedback/read",
  async (id_feedback) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v2/feedback/${id_feedback}/read`
      )
      if (response.status === 200) {
        return await {
          ...response.data,
          status: response.status,
          id_feedback: id_feedback,
        }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)

export const deleteFeedback = createAsyncThunk(
  "feedback/delete",
  async (id_feedback) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v2/feedback/${id_feedback}`
      )
      if (response.status === 200) {
        return await {
          ...response.data,
          status: response.status,
          id_feedback: id_feedback,
        }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)
const fetchFeedback = createSlice({
  name: "feedback",
  initialState: {
    feedback: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.feedback = action.payload.data
        } else {
        }
      })
      .addCase(readFeed.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.feedback = state.feedback.filter(
            (feedback) => feedback.id_feedback !== action.payload.id_feedback
          )
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.feedback = state.feedback.filter(
            (feedback) => feedback.id_feedback !== action.payload.id_feedback
          )
        } else {
          toastError(action.payload.message)
        }
      })
  },
})

const fetchFeedbackReducer = fetchFeedback.reducer

export const fetchFeedbackSelector = (state) =>
  state.fetchFeedbackReducer.feedback

export default fetchFeedbackReducer
