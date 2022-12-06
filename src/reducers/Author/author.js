import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toastError, toastSuccess } from "../../Toast/Toast"
export const loadAuthor = createAsyncThunk("author/fetch", async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v2/account/all`)
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
})
export const followAuthorAll = createAsyncThunk(
  "author/follow",
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
export const deleteAuthorAll = createAsyncThunk(
  "author/deleteFollow",
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
export const changeRoleAccount = createAsyncThunk(
  "author/changeRole",
  async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v2/account/${data.id_account}/role/${data.id_role}`
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

export const findAuthorP = createAsyncThunk(
  "author/findAuthorP",
  async (data) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v2/account/${data.id_author}/status/${data.id_user}`
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

export const limitedTimeLock = createAsyncThunk(
  "author/limitedTimeLock",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v2/account/${data.id_account}/ban`,
        data.lock
      )
      if (response.status === 200) {
        return await {
          ...response.data,
          status: response.status,
          id_account: data.id_account,
        }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)
export const permanentLock = createAsyncThunk(
  "author/permanentLock",
  async (data) => {
    const reason = data.reason
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v2/account/${data.id_account}/die`,
        { reason }
      )
      if (response.status === 200) {
        return await {
          ...response.data,
          status: response.status,
          id_account: data.id_account,
        }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)

export const permanentUnlock = createAsyncThunk(
  "author/permanentUnlock",
  async (id_account) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v2/account/${id_account}/revive`
      )
      if (response.status === 200) {
        return await {
          ...response.data,
          status: response.status,
          id_account: id_account,
        }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)
export const limitedTimeUnlock = createAsyncThunk(
  "author/limitedTimeUnlock",
  async (id_account) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v2/account/${id_account}/unlock`
      )
      if (response.status === 200) {
        return await {
          ...response.data,
          status: response.status,
          id_account: id_account,
        }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)
const author = createSlice({
  name: "author",
  initialState: {
    author: [],
    authorPost: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAuthor.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.author = action.payload.data
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(followAuthorAll.fulfilled, (state, action) => {
        state.authorPost.status = !state.authorPost.status
        if (action.payload.status === 200) {
          state.author = state.author.map((author) => {
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
      .addCase(deleteAuthorAll.fulfilled, (state, action) => {
        state.authorPost.status = !state.authorPost.status
        if (action.payload.status === 200) {
          state.author = state.author.map((author) => {
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
      .addCase(changeRoleAccount.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.author = state.author.map((author) => {
            if (author.id_account === action.payload.data.id_account)
              author.role = action.payload.data.id_role === 2 ? "Moder" : "User"
            return author
          })

          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(findAuthorP.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.authorPost = action.payload.data
        } else {
        }
      })
      .addCase(limitedTimeLock.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.author = state.author.map((author) => {
            if (author.id_account === action.payload.id_account) {
              author.account_status = 1
              return author
            } else {
              return author
            }
          })

          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(permanentLock.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.author = state.author.map((author) => {
            if (author.id_account === action.payload.id_account) {
              author.account_status = 2
              return author
            } else {
              return author
            }
          })

          console.log(action.payload)

          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(permanentUnlock.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.author = state.author.map((author) => {
            if (author.id_account === action.payload.id_account) {
              author.account_status = 0
              return author
            } else {
              return author
            }
          })
          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(limitedTimeUnlock.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.author = state.author.map((author) => {
            if (author.id_account === action.payload.id_account) {
              author.account_status = 0
              return author
            } else {
              return author
            }
          })

          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
  },
})

const authorReducer = author.reducer

export const authorSelector = (state) => state.authorReducer.author
export const authorPostSelector = (state) => state.authorReducer.authorPost

export default authorReducer
