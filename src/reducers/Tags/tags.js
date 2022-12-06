import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toastSuccess, toastError } from "../.././Toast/Toast"
import axios from "axios"
// import setAuthToken from "../../utils/setAuthToken"
// import * as types from "../.././contains/types"

export const loadTags = createAsyncThunk(
  "tags/fetchTags",
  async (id_account) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v2/tag/${id_account}/all`
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

export const loadTagsAll = createAsyncThunk("tags/fetchTagAll", async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v2/tag/all`)
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
})

export const loadTagsPost = createAsyncThunk(
  "tags/fetchTagPost",
  async (id_tag) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v2/tag/${id_tag}/posts`
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

export const addTag = createAsyncThunk("tags/addTag", async (tag) => {
  try {
    const response = await axios.post("http://localhost:8080/api/v2/tag", tag, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
    if (response.status === 201 || response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
})

export const updateTagAll = createAsyncThunk(
  "tags/updateTagAll",
  async (tag) => {
    const id_tag = tag.get("id_tag")
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v2/tag/${id_tag}`,
        tag
      )
      if (response.status === 200) {
        console.log(response.data)
        return await { ...response.data, status: response.status }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)
export const followTagALL = createAsyncThunk("tags/follow", async (id_tag) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v2/follow_tag/${id_tag}`
    )
    if (response.status === 200) {
      return await {
        ...response.data,
        status: response.status,
        id_tag: id_tag,
      }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
})

export const deleteFollowTagALL = createAsyncThunk(
  "tags/delete",
  async (id_tag) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v2/follow_tag/${id_tag}`
      )
      if (response.status === 200) {
        return await { ...response.data, id_tag: id_tag }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)
export const findTagT = createAsyncThunk("tags/find", async (data) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v2/tag/${data.id_tag}`
    )
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
})
const tags = createSlice({
  name: "tags",
  initialState: {
    tags: [],
    tagsAll: [],
    tag: {},
    tagPost: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTags.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.tags = action.payload.data
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(loadTagsAll.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.tagsAll = action.payload.data
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(addTag.fulfilled, (state, action) => {
        if (action.payload.status === 201) {
          state.tagsAll.unshift(action.payload.data)
          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(updateTagAll.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.tagsAll = state.tagsAll.map((tag) =>
            tag.id_tag === action.payload.data.id_tag
              ? action.payload.data
              : tag
          )
          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(followTagALL.fulfilled, (state, action) => {
        state.tag.status = !state.tag.status
        if (action.payload.status === 200) {
          state.tags = state.tags.map((tag) => {
            if (tag.id_tag === action.payload.id_tag && tag.status === false)
              tag.status = !tag.status
            return tag
          })
          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(deleteFollowTagALL.fulfilled, (state, action) => {
        state.tag.status = !state.tag.status
        if (action.payload.status === 200) {
          state.tags = state.tags.map((tag) => {
            if (tag.id_tag === action.payload.id_tag && tag.status === true)
              tag.status = !tag.status
            return tag
          })
          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(findTagT.fulfilled, (state, action) => {
        state.tag = action.payload.data
      })
      .addCase(loadTagsPost.fulfilled, (state, action) => {
        state.tagPost = action.payload.data
      })
  },
})

const tagReducer = tags.reducer

export const tagsSelector = (state) => state.tagReducer.tags
export const tagsAllSelector = (state) => state.tagReducer.tagsAll
export const { findT } = tags.actions
export const tagSelector = (state) => state.tagReducer.tag
export const tagsPostSelector = (state) => state.tagReducer.tagPost

export default tagReducer
