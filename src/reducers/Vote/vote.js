import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toastSuccess, toastError } from "../../Toast/Toast"

export const voteUp = createAsyncThunk("vote/up", async (id_post) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v2/vote/${id_post}/1`
    )
    if (response.status === 201 || response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
})

export const voteDown = createAsyncThunk("vote/down", async (id_post) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v2/vote/${id_post}/0`
    )
    if (response.status === 201 || response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
})

export const deleteVote = createAsyncThunk("vote/delete", async (id_post) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v2/vote/${id_post}`
    )
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
})

export const fetchVote = createAsyncThunk("vote/fetchVote", async (id_post) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v2/vote/${id_post}`
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
})

export const fetchMark = createAsyncThunk("vote/mark", async (id_account) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v2/account/${id_account}/mark`
    )
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
})
const vote = createSlice({
  name: "vote",
  initialState: {
    vote_post: 0,
    vote: 0,
    mark: {
      mark: 0,
      up: 0,
      down: -1,
    },
  },
  reducers: {
    setMark(state, action) {
      state.mark.mark += action.payload
    },
    setVotePost(state, action) {
      state.vote_post =
        action.payload.total_vote_up - action.payload.total_vote_down
    },
    setMarkPost(state, action) {
      state.vote_post += action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(voteUp.fulfilled, (state, action) => {
        if (action.payload.status === 201 || action.payload.status === 200) {
          state.vote = 1
          state.vote_post += 1
          state.mark.mark += 1
          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(voteDown.fulfilled, (state, action) => {
        if (action.payload.status === 201 || action.payload.status === 200) {
          state.vote = -1
          state.vote_post -= 1
          state.mark.mark -= 1
          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(deleteVote.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.vote = 0
          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(fetchVote.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          const type = action.payload.data.type
          if (type === 1) {
            state.vote = 1
          } else if (type === 0) {
            state.vote = -1
          }
        } else {
          state.vote = 0
        }
      })
      .addCase(fetchMark.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.mark = action.payload.data
        } else {
        }
      })
  },
})

const voteReducer = vote.reducer

export const voteSelector = (state) => state.voteReducer.vote
export const vote_postSelector = (state) => state.voteReducer.vote_post
export const markSelector = (state) => state.voteReducer.mark
export const { setMark, setVotePost, setMarkPost } = vote.actions

export default voteReducer
