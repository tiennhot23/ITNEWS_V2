import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const changeAccess0 = createAsyncThunk("post/mark", async (id_post) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/v2/post/${id_post}/status/0`
    )
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
})
export const changeAccess1 = createAsyncThunk("post/mark", async (id_post) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/v2/post/${id_post}/status/1`
    )
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
})
const access = createSlice({
  name: "access",
  initialState: {
    access: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeAccess0.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.access = 0
        } else {
        }
      })
      .addCase(changeAccess1.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.access = 1
        } else {
        }
      })
  },
})

const accessReducer = access.reducer

export default accessReducer
