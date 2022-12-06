import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toastSuccess, toastError } from "../.././Toast/Toast"

export const fetchImage = createAsyncThunk("image/fetch", async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v2/image/account`
    )
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
})

export const addImage = createAsyncThunk("image/add", async (file) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v2/image`,
      file
    )
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
})

export const updateImage = createAsyncThunk("image/update", async (data) => {
  try {
    const response = await axios.patch(
      `http://localhost:8080/api/v2/image/change/${data.id_image}`,
      data.image
    )
    if (response.status === 200) {
      return await {
        ...response.data,
        status: response.status,
        id_image: data.id_image,
      }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
})

export const deleteImage = createAsyncThunk(
  "image/delete",
  async (id_image) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v2/image/${id_image}/db`
      )
      if (response.status === 200) {
        return await {
          ...response.data,
          status: response.status,
          id_image: id_image,
        }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)
const image = createSlice({
  name: "image",
  initialState: {
    images: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImage.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.images = action.payload.data
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(addImage.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          const data = {
            id_image: action.payload.data,
            url: "",
          }
          state.images.unshift(data)
          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(updateImage.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.images = state.images.map((image) => {
            if (image.id_image === action.payload.data.id_image) {
              image.url = action.payload.data.url
              return image
            }
            return image
          })
          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.images = state.images.filter(
            (image) => image.id_image !== action.payload.id_image
          )
          toastSuccess(action.payload.message)
        } else {
          toastError(action.payload.message)
        }
      })
  },
})

const imageReducer = image.reducer

export const imageSelector = (state) => state.imageReducer.images

export default imageReducer
