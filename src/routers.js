import React from "react"
import FetchAuthors from "./components/Author/FetchAuthors"
import ArticleViewPage from "./components/home/ArticleViewPage"
import HomePage from "./components/home/HomePage"
import CreatePost from "./components/Posts/CreatePost"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import CreateTags from "./components/Tags/CreateTags"
import FetchTags from "./components/Tags/FetchTags"
import ChangePassword from "./components/User/ChangePassword"
import EnterCode from "./components/User/EnterCode"
import FollowAuthor from "./components/User/FollowAuthor"
import FollowTags from "./components/User/FollowTags"
import ForgotPassword from "./components/User/ForgotPassword"
import LoginForm from "./components/User/LoginForm"
import PersonalPage from "./components/User/PersonalPage"
import RegisterForm from "./components/User/RegisterForm"
import UpdateUser from "./components/User/UpdateUser"
import FetchUser from "./components/Moderator/FetchUser"
import Tags from "./components/Moderator/Tags"
import Post from "./components/Moderator/Post"
import ProtectedRouteAdmin from "./components/ProtectedRoute/ProtectedRouteAdmin"
import NotFound from "./views/NotFound"
import NotFoundAdmin from "./views/NotFoundAdmin"
import TagPost from "./components/Tags/TagPost"
import PostAccess0 from "./components/User/PostAccess0"
import PostAccess1 from "./components/User/PostAccess1"
import PostAccess2 from "./components/User/PostAccess2"
import UserPost from "./components/Posts/UserPost"
import UpdatePost from "./components/Posts/UpdatePost"
import Following from "./components/User/Following"
import Feedback from "./components/User/Feedback"
import FetchFeedback from "./components/Moderator/FetchFeedback"
import FetchNotification from "./components/Notification/FetchNotification"
import SearchPost from "./components/Posts/SearchPost"
import SeeNotification from "./components/Notification/SeeNotification"
import PostNews from "./components/Posts/PostNews"
import ImageUser from "./components/User/ImageUser"

const routers = [
    {
        path: "/",
        exact: true,
        main: () => <HomePage />,
    },
    {
        path: "/login",
        exact: false,
        main: () => <LoginForm />,
    },
    {
        path: "/register",
        exact: false,
        main: () => <RegisterForm />,
    },
    {
        path: "/newest",
        exact: false,
        main: () => <PostNews />,
    },
    {
        path: "/search/:search",
        exact: false,
        main: () => <SearchPost />,
    },
    {
        path: "/tags/:id_tag",
        exact: false,
        main: () => <TagPost />,
        // main: () => <ProtectedRouteAdmin component={Tags} />,
    },
    {
        path: "/tags",
        exact: false,
        main: () => <FetchTags />,
    },
    {
        path: "/authors/:id_account",
        exact: false,
        main: () => <UserPost />,
        // main: () => <ProtectedRouteAdmin component={Tags} />,
    },
    {
        path: "/authors",
        exact: false,
        main: () => <FetchAuthors />,
    },
    {
        path: "/notifications/:id_notification",
        exact: false,
        main: () => <ProtectedRoute component={SeeNotification} />,
    },
    {
        path: "/notifications",
        exact: false,
        main: () => <ProtectedRoute component={FetchNotification} />,
    },
    {
        path: "/update/user",
        exact: false,
        // main: () => <UpdateUser />,
        main: () => <ProtectedRoute component={UpdateUser} />,
    },
    {
        path: "/publish/post",
        exact: false,
        // main: () => <CreatePost />,
        main: () => <ProtectedRoute component={CreatePost} />,
    },
    {
        path: "/posts/:id_post/edit",
        exact: false,
        // main: ({ props }) => <UpdatePost {...props} />,
        main: ({ props }) => (
            <ProtectedRoute component={UpdatePost} {...props} />
        ),
    },
    {
        path: "/publish/tag",
        exact: false,
        main: () => <CreateTags />,
    },
    {
        path: "/forgot/password/code",
        exact: false,
        main: () => <EnterCode />,
        // main: () => <ProtectedRoute component={EnterCode} />,
    },
    {
        path: "/forgot/password",
        exact: false,
        main: () => <ForgotPassword />,
        // main: () => <ProtectedRoute component={ForgotPassword} />,
    },
    {
        path: "/change/password",
        exact: false,
        // main: () => <ChangePassword />
        main: () => <ProtectedRoute component={ChangePassword} />,
    },
    {
        path: "/u/:name/clips/posts",
        exact: false,
        // main: () => <PersonalPage />,
        main: () => <ProtectedRoute component={PersonalPage} />,
    },
    {
        path: "/u/:name/following-tags",
        exact: false,
        // main: () => <FollowTags />,
        main: () => <ProtectedRoute component={FollowTags} />,
    },
    {
        path: "/u/:name/followers",
        exact: false,
        // main: () => <FollowAuthor />,
        main: () => <ProtectedRoute component={FollowAuthor} />,
    },
    {
        path: "/u/:name/following",
        exact: false,
        // main: () => <FollowAuthor />,
        main: () => <ProtectedRoute component={Following} />,
    },
    {
        path: "/u/:name/post_0",
        exact: false,
        // main: () => <FollowAuthor />,
        main: () => <ProtectedRoute component={PostAccess0} />,
    },
    {
        path: "/u/:name/post_1",
        exact: false,
        // main: () => <FollowAuthor />,
        main: () => <ProtectedRoute component={PostAccess1} />,
    },
    {
        path: "/u/:name/post_2",
        exact: false,
        // main: () => <FollowAuthor />,
        main: () => <ProtectedRoute component={PostAccess2} />,
    },
    {
        path: "/u/:name/feedback",
        exact: false,
        // main: () => <FollowAuthor />,
        main: () => <ProtectedRoute component={Feedback} />,
    },
    {
        path: "/u/:name/image",
        exact: false,
        // main: () => <PersonalPage />,
        main: () => <ProtectedRoute component={ImageUser} />,
    },
    {
        path: "/p/post/:id_post",
        exact: false,
        main: () => <ArticleViewPage />,
    },
    {
        path: "/moderator/posts/:page",
        exact: false,
        main: () => <Post />,
    },
    {
        path: "/moderator/tags",
        exact: false,
        // main: () => <Tags />,
        main: () => <ProtectedRouteAdmin component={Tags} />,
    },
    {
        path: "/moderator/posts",
        exact: false,
        // main: () => <Post />,
        main: () => <ProtectedRouteAdmin component={Post} />,
    },
    {
        path: "/moderator/users",
        exact: false,
        main: () => <ProtectedRouteAdmin component={FetchUser} />,
        // main: () => <FetchUser />,
    },
    {
        path: "/moderator/feedback",
        exact: false,
        main: () => <ProtectedRouteAdmin component={FetchFeedback} />,
        // main: () => <FetchUser />,
    },

    {
        path: "/forbidden",
        exact: false,
        main: () => <NotFoundAdmin />,
        // main: () => <FetchUser />,
    },
    {
        path: "*",
        exact: true,
        main: () => <NotFound />,
    },
]

export default routers
