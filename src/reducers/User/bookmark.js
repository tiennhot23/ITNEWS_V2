import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchBookmark = createAsyncThunk(
  "bookmark/fetch",
  async (id_account) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v2/account/${id_account}/bookmarks`
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

const bookmark = createSlice({
  name: "bookmark",
  initialState: {
    bookmark: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBookmark.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.bookmark = action.payload.data
      } else {
      }
    })
    // .addCase(deleteBookmark.fulfilled, (state, action) => {
    //     state.bookmark = state.bookmark.map((book) => {
    //         if (book.id_tag === action.payload.id_tag)
    //             book.status = !book.status
    //         return book
    //     })
    // })
    // .addCase(addBookmark.fulfilled, (state, action) => {
    //     state.bookmark = state.bookmark.map((book) => {
    //         if (book.id_tag === action.payload.id_tag)
    //             book.status = !book.status
    //         return book
    //     })
    // })
  },
})

const bookmarkReducer = bookmark.reducer

export const bookmarkSelector = (state) => state.bookmarkReducer.bookmark

export default bookmarkReducer
