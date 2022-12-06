import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchNotification = createAsyncThunk(
  "notification/fetch",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v2/notification/all`
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
export const getNotification = createAsyncThunk(
  "notification/get",
  async (id_notification) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v2/notification/${id_notification}`
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

export const readNotification = createAsyncThunk(
  "notification/read",
  async (id_notification) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v2/notification/${id_notification}/read`
      )
      if (response.status === 200) {
        return await {
          ...response.data,
          status: response.status,
          id_notification: id_notification,
        }
      }
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { message: error.message }
    }
  }
)
const notification = createSlice({
  name: "notification",
  initialState: {
    notification: [],
    getNotify: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotification.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.notification = action.payload.data
        } else {
        }
      })
      .addCase(getNotification.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.getNotify = action.payload.data
        } else {
        }
      })
      .addCase(readNotification.fulfilled, (state, action) => {
        console.log(action.payload.data)
        if (action.payload.status === 200) {
          state.notification = state.notification.filter(
            (notify) =>
              notify.id_notification !== action.payload.id_notification
          )
        } else {
        }
      })
  },
})

const notificationReducer = notification.reducer

export const notificationSelector = (state) =>
  state.notificationReducer.notification
export const notifySelector = (state) => state.notificationReducer.getNotify

export default notificationReducer
