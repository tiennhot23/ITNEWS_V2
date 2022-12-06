import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import * as types from "../.././contains/types"
import setAuthToken from "../.././utils/setAuthToken"
import axios from "axios"

export const loadUser = createAsyncThunk("login/user", async () => {
  if (localStorage[types.LOCAL_STORAGE_TOKEN_NAME]) {
    setAuthToken(localStorage[types.LOCAL_STORAGE_TOKEN_NAME])
  }
  const response = await axios.get(
    "http://localhost:8080/api/v2/account/information"
  )
  try {
    if (response.status === 200) {
      // setUser({
      //     isAuthenticated: true,
      //     user: response.data.user
      // })
      return { ...response.data, isAuthenticated: true }
    }
  } catch (error) {
    localStorage.removeItem(types.LOCAL_STORAGE_TOKEN_NAME)
    setAuthToken(null)
    // setUser({
    //     isAuthenticated: false,
    //     user: null
    // })
    return { ...response.data, isAuthenticated: false }
  }
})

const loginForm = createSlice({
  name: "login",
  initialState: {
    authLoading: true,
    isAuthenticated: false,
    user: {
      id_account: 0,
      id_role: 0,
      role_name: "",
      real_name: "",
    },
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user
      state.isAuthenticated = action.payload.isAuthenticated
    },
    setLogout(state) {
      localStorage.removeItem(types.LOCAL_STORAGE_TOKEN_NAME)
      setAuthToken(null)
      state.user = {
        id_account: 0,
        id_role: 0,
        role_name: "",
        real_name: "",
      }
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.user = action.payload.data
      state.isAuthenticated = action.payload.isAuthenticated
    })
  },
})

const loginReducer = loginForm.reducer

export const userSelector = (state) => state.loginReducer.user

export const { setLogout, setUser } = loginForm.actions
export const isAuthenticatedSelector = (state) =>
  state.loginReducer.isAuthenticated

export default loginReducer
