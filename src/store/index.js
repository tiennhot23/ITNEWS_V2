import { configureStore } from "@reduxjs/toolkit"
import loginReducer from ".././reducers/User/loginForm"
import tagReducer from "../reducers/Tags/tags"
import postReducer from "../reducers/Posts/posts"
import forgotPassReducer from "../reducers/User/forgotPassword"
import followTagsReducer from "../reducers/User/followTags"
import postIdReducer from "../reducers/Posts/postId"
import fetchPostUser from "../reducers/User/fetchPost"
import commentReducer from "../reducers/Comment/comment"
import voteReducer from "../reducers/Vote/vote"
import authorReducer from "../reducers/Author/author"
import followAuthorReducer from "../reducers/User/followAuthors"
import bookmarkReducer from "../reducers/User/bookmark"
import changeStatusPostReducer from "../reducers/Posts/changeStatusPost"
import notificationReducer from "../reducers/Notification/notification"
import fetchFeedbackReducer from "../reducers/Feedback/fetchFeedback"
import imageReducer from "../reducers/Image/image"

const store = configureStore({
    reducer: {
        loginReducer,
        tagReducer,
        postIdReducer,
        postReducer,
        forgotPassReducer,
        followTagsReducer,
        fetchPostUser,
        commentReducer,
        voteReducer,
        authorReducer,
        followAuthorReducer,
        bookmarkReducer,
        changeStatusPostReducer,
        notificationReducer,
        fetchFeedbackReducer,
        imageReducer,
    },
})

export default store
