import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toastError, toastSuccess } from "../../Toast/Toast"
export const loadComment = createAsyncThunk(
  "comment/fetch",
  async (id_post) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v2/post/${id_post}/comment/main`
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

export const loadCommentChildren = createAsyncThunk(
  "comment/fetchChildren",
  async (id_post) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v2/post/${id_post}/comment`
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
export const addCommentParent = createAsyncThunk(
  "comment/addParent",
  async ({ id_post, content }) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v2/post/${id_post}/comment`,
        { content }
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

export const addCommentChildren = createAsyncThunk(
  "comment/addChildren",
  async ({ id_post, id_cmt_parent, content }) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v2/post/${id_post}/comment/${id_cmt_parent}/reply`,
        { content }
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

export const deleteComment = createAsyncThunk(
  "comment/delete",
  async ({ id_cmt, id_post }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v2/post/${id_post}/comment/${id_cmt}/delete`
      )
      if (response.status === 200) {
        return await {
          ...response.data,
          status: response.status,
          id_post: id_post,
          id_cmt: id_cmt,
        }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)

export const updateComment = createAsyncThunk(
  "comment/update",
  async ({ id_post, id_cmt, content }) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v2/post/${id_post}/comment/${id_cmt}/update`,
        { content }
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

export const hidePresentlyComment = createAsyncThunk(
  "comment/hidePresently",
  async ({ id_cmt, id_post, new_status }) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v2/post/${id_post}/comment/${id_cmt}/status/${new_status}`
      )
      if (response.status === 200) {
        return await {
          ...response.data,
          status: response.status,
          id_post: id_post,
          id_cmt: id_cmt,
          new_status: new_status,
        }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)

const comment = createSlice({
  name: "comment",
  initialState: {
    comment: [],
    commentChildren: [],
    showCommentParent: false,
    showCommentChildren: false,
  },
  reducers: {
    setShowComment(state) {
      state.showCommentParent = !state.showCommentParent
    },
    setShowCommentChildren(state) {
      state.showCommentChildren = !state.showCommentChildren
    },
    setShow(state) {
      state.showCommentParent = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadComment.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.comment = action.payload.data
        } else {
        }
      })
      .addCase(loadCommentChildren.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.commentChildren = action.payload.data
        } else {
        }
      })
      .addCase(addCommentParent.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.comment.unshift(action.payload.data)
        } else {
        }
      })
      .addCase(addCommentChildren.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.commentChildren.unshift(action.payload.data)
        } else {
        }
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.commentChildren = state.commentChildren.map((comment) => {
            if (comment.id_cmt === action.payload.data.id_cmt) {
              return action.payload.data
            }
            return comment
          })
          state.comment = state.comment.map((comment) => {
            if (comment.id_cmt === action.payload.data.id_cmt) {
              return action.payload.data
            }
            return comment
          })
        } else {
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.comment = state.comment.filter(
            (comment) =>
              comment.id_post !== action.payload.id_post &&
              comment.id_cmt !== action.payload.id_cmt
          )
          state.commentChildren = state.commentChildren.filter(
            (comment) =>
              comment.id_post !== action.payload.id_post &&
              comment.id_cmt !== action.payload.id_cmt
          )
          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(hidePresentlyComment.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.commentChildren = state.commentChildren.map((comment) => {
            if (comment.id_cmt === action.payload.data.id_cmt) {
              comment.status = action.payload.new_status
              return comment
            }
            return comment
          })
          state.comment = state.comment.map((comment) => {
            if (comment.id_cmt === action.payload.data.id_cmt) {
              comment.status = action.payload.new_status
              return comment
            }
            return comment
          })
        } else {
        }
      })
  },
})

const commentReducer = comment.reducer

export const { setShowComment, setShowCommentChildren, setShow } =
  comment.actions

export const showCommentSelector = (state) =>
  state.commentReducer.showCommentParent
export const showCommentSelectorChildren = (state) =>
  state.commentReducer.showCommentChildren
export const commentSelector = (state) => state.commentReducer.comment
export const commentChildrenSelector = (state) =>
  state.commentReducer.commentChildren

export default commentReducer
