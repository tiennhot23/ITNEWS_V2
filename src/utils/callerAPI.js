import axios from "axios"
import * as types from ".././contains/types"
// import setAuthToken from './setAuthToken';

export const loginUser = async (loginForm) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v2/account/login",
      loginForm
    )
    if (response.status === 200) {
      localStorage.setItem(
        types.LOCAL_STORAGE_TOKEN_NAME,
        response.data.accessToken
      )
      // setAuthToken(response.data.accessToken)
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
}

export const registerUser = async (registerForm) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v2/account/",
      registerForm
    )
    if (response.status === 201 || response.status === 200)
      return await { ...response.data, status: response.status }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
}

export const updateUser = async (updateForm) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/v2/account/update/information`,
      updateForm
    )
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
}

export const forgotPassword = async (account_name) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v2/account/forgot/password",
      { account_name }
    )
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
}

export const enterCodePass = async (id_account, code) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v2/account/${id_account}/confirm`,
      { code }
    )
    if (response.status === 200) {
      localStorage.setItem(
        types.LOCAL_STORAGE_TOKEN_NAME,
        response.data.accessToken
      )
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
}

export const changePassword = async (data) => {
  try {
    const new_password = data.new_password
    const old_password = data.old_password
    const response = await axios.put(
      `http://localhost:8080/api/v2/account/${data.id_account}/change_password`,
      { new_password, old_password }
    )
    if (response.status === 201 || response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
}

export const followTag = async (id_tag) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v2/follow_tag/${id_tag}`
    )
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
}

export const deleteFollowTag = async (id_tag) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v2/follow_tag/${id_tag}`
    )
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
}

export const findTag = async (id_tag) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v2/tag/${id_tag}`
    )
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
}

export const findAuthor = async (id_author, id_user) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v2/account/${id_author}/status/${id_user}`
    )
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
}

export const followAccount = async (id_account) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v2/follow_account/${id_account}`
    )
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
}

export const deleteFollowAccount = async (id_account) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v2/follow_account/${id_account}`
    )
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
}

export const limitedTimeLock = async (id_account, lockUser) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v2/account/${id_account}/ban`,
      lockUser
    )
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
}

export const permanentLock = async (id_account, reason) => {
  try {
    const response = await axios.patch(
      `http://localhost:8080/api/v2/account/${id_account}/die`,
      { reason }
    )
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
}
export const permanentUnlock = async (id_account) => {
  try {
    const response = await axios.patch(
      `http://localhost:8080/api/v2/account/${id_account}/revive`
    )
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
}

export const limitedTimeUnlock = async (id_account) => {
  try {
    const response = await axios.patch(
      `http://localhost:8080/api/v2/account/${id_account}/unlock`
    )
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
}

export const addFeedback = async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v2/feedback`,
      data
    )
    if (response.status === 201 || response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
}

export const updateImageUser = async (image) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/v2/account/update/avatar`,
      image
    )
    if (response.status === 200) {
      return await { ...response.data, status: response.status }
    }
  } catch (error) {
    if (error.response.data) return error.response.data
    else return { message: error.message }
  }
}
