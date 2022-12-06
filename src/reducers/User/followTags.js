import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toastError, toastSuccess } from "../../Toast/Toast"

export const fetchFollowTags = createAsyncThunk(
  "followTags/fetch",
  async (id_account) => {
    const response = await axios.get(
      `http://localhost:8080/api/v2/account/${id_account}/follow_tag`
    )
    return response.data
  }
)
export const deleteFollowTag = createAsyncThunk(
  "followTags/delete",
  async (id_tag) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v2/follow_tag/${id_tag}`
      )
      if (response.status === 200) {
        return await {
          ...response.data,
          id_tag: id_tag,
          status: response.status,
        }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)
export const followTag = createAsyncThunk(
  "followTags/follow",
  async (id_tag) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v2/follow_tag/${id_tag}`
      )
      if (response.status === 200) {
        return await {
          ...response.data,
          id_tag: id_tag,
          status: response.status,
        }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)

const followTags = createSlice({
  name: "followTags",
  initialState: {
    followTags: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowTags.fulfilled, (state, action) => {
        state.followTags = action.payload.data
      })
      .addCase(deleteFollowTag.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.followTags = state.followTags.map((tag) => {
            if (tag.id_tag === action.payload.id_tag) tag.status = !tag.status
            return tag
          })

          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(followTag.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.followTags = state.followTags.map((tag) => {
            if (tag.id_tag === action.payload.id_tag) tag.status = !tag.status
            return tag
          })

          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
  },
})

const followTagsReducer = followTags.reducer

export const followTagsSelect = (state) => state.followTagsReducer.followTags
export const { setStatusTag } = followTags.actions

export default followTagsReducer
