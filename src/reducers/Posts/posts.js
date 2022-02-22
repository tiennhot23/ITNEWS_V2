import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import setAuthToken from "../../utils/setAuthToken"
import * as types from "../.././contains/types"
import { toastError, toastSuccess } from "../../Toast/Toast"

export const fetchPostAccessStatus = createAsyncThunk(
    "posts/fetch",
    async () => {
        try {
            const response = await axios.get(
                "https://itnews-api.herokuapp.com/api/v1/post/newest/all"
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

export const addPost = createAsyncThunk("posts/add", async (post) => {
    try {
        setAuthToken(localStorage.getItem(types.LOCAL_STORAGE_TOKEN_NAME))
        const response = await axios.post(
            "https://itnews-api.herokuapp.com/api/v1/post",
            post
        )
        if (response.status === 201) {
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
})

export const fetchPostId = createAsyncThunk("posts/id", async (id_post) => {
    try {
        const response = await axios.get(
            `https://itnews-api.herokuapp.com/api/v1/post/${id_post}`
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
})

export const fetchMark = createAsyncThunk("post/mark", async (id_account) => {
    try {
        const response = await axios.get(
            `https://itnews-api.herokuapp.com/api/v1/account/${id_account}/mark`
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
})

export const changeAccess0 = createAsyncThunk(
    "post/access0",
    async (id_post) => {
        try {
            const response = await axios.put(
                `https://itnews-api.herokuapp.com/api/v1/post/${id_post}/access/0`
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

export const changeAccess1 = createAsyncThunk(
    "post/access1",
    async (id_post) => {
        try {
            const response = await axios.put(
                `https://itnews-api.herokuapp.com/api/v1/post/${id_post}/access/1`
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
export const changeAccess2 = createAsyncThunk(
    "post/access2",
    async (id_post) => {
        try {
            const response = await axios.put(
                `https://itnews-api.herokuapp.com/api/v1/post/${id_post}/access/2`
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
export const addBookmark = createAsyncThunk(
    "posts/addBookmark",
    async (id_post) => {
        try {
            const response = await axios.post(
                `https://itnews-api.herokuapp.com/api/v1/bookmark/${id_post}`
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
export const deleteBookmark = createAsyncThunk(
    "posts/deleteBookmark",
    async (id_post) => {
        try {
            const response = await axios.delete(
                `https://itnews-api.herokuapp.com/api/v1/bookmark/${id_post}`
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

export const updatePost = createAsyncThunk("post/update", async (data) => {
    try {
        const response = await axios.put(
            `https://itnews-api.herokuapp.com/api/v1/post/${data.id_post}`,
            data.post
        )
        if (response.status === 200) {
            return await { ...response.data, status: response.status }
        }
    } catch (error) {
        if (error.response.data) return error.response.data
        else return { message: error.message }
    }
})

const posts = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        post: {
            author: {
                id_account: 0,
            },
            post: {
                title: "",
                day_last_modified: "",
                content: "",
                view: "",
                real_name: "",
                access: 0,
                bookmark_status: false,
                total_vote_up: 0,
                total_vote_down: 0,
            },
        },
        mark: {
            mark: 0,
            up: 0,
            down: 0,
        },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostAccessStatus.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.posts = action.payload.data
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(addPost.fulfilled, (state, action) => {
                if (action.payload.status === 201) {
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(fetchPostId.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.post = action.payload.data
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(fetchMark.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.mark = action.payload.data
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(changeAccess0.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.post.post.access = 0
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(changeAccess1.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.post.post.access = 1
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(changeAccess2.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.post.post.access = 2
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(deleteBookmark.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.post.post.bookmark_status = false
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(addBookmark.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.post.post.bookmark_status = true
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    toastSuccess(action.payload.message)
                } else {
                    toastError(action.payload.message)
                }
            })
    },
})

const postReducer = posts.reducer

export const postsSelector = (state) => state.postReducer.posts
export const postSelector = (state) => state.postReducer.post
export const markSelector = (state) => state.postReducer.mark

export default postReducer
