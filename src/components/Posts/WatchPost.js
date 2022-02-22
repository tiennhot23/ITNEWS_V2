import React, { useEffect, useRef } from "react"
import MDEditor from "@uiw/react-md-editor"
import { Link } from "react-router-dom"
import { Col, Card, Image, Button, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
    addBookmark,
    changeAccess0,
    changeAccess1,
    changeAccess2,
    deleteBookmark,
    fetchPostId,
    postSelector,
} from "../../reducers/Posts/posts"
import { loadUser, userSelector } from "../../reducers/User/loginForm"
import { useParams } from "react-router"
import { setShow, setShowComment } from "../../reducers/Comment/comment"
import {
    deleteVote,
    fetchVote,
    voteDown,
    voteSelector,
    voteUp,
    fetchMark,
    markSelector,
    setMark,
    setVotePost,
    vote_postSelector,
    setMarkPost,
} from "../../reducers/Vote/vote"
import { changeStatus } from "../../reducers/Posts/changeStatusPost"

const WatchPost = () => {
    const post = useSelector(postSelector)
    const mark = useSelector(markSelector)
    const vote = useSelector(voteSelector)
    const vote_post = useSelector(vote_postSelector)
    const { id_post } = useParams()
    const user = useSelector(userSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUser())
        dispatch(fetchPostId(id_post))
    }, [dispatch, id_post])

    useEffect(() => {
        dispatch(fetchVote(id_post))
        dispatch(
            setVotePost({
                total_vote_up: post.post.total_vote_up,
                total_vote_down: post.post.total_vote_down,
            })
        )
    }, [dispatch, id_post, post])

    useEffect(() => {
        dispatch(fetchMark(post.author.id_account))
    }, [dispatch, post])

    // const ScrollToTop = () => {
    //     const { pathname } = useLocation()

    //     useEffect(() => {
    //         window.scrollTo(0, 0, "smooth")
    //     }, [pathname])

    //     return null
    // }

    var date = post.post.day_last_modified.split("/")

    const showComment = () => {
        window.scroll(0, postRef.current.clientHeight + 200)
        dispatch(setShowComment())
    }

    const upVote = (total_vote_up, total_vote_down) => {
        if (vote === 1) {
            dispatch(deleteVote(id_post))
            dispatch(setMark(-1))
            dispatch(setMarkPost(-1))
        } else if (vote === -1) {
            dispatch(deleteVote(id_post))
            dispatch(setMark(1))
            dispatch(setMarkPost(1))
            setTimeout(() => {
                dispatch(voteUp(id_post))
            }, 900)
        } else {
            dispatch(voteUp(id_post))
        }
    }
    const downVote = () => {
        if (vote === -1) {
            dispatch(deleteVote(id_post))
            dispatch(setMark(1))
            dispatch(setMarkPost(1))
        } else if (vote === 1) {
            dispatch(deleteVote(id_post))
            dispatch(setMark(-1))
            dispatch(setMarkPost(-1))
            setTimeout(() => {
                dispatch(voteDown(id_post))
            }, 900)
        } else {
            dispatch(voteDown(id_post))
        }
    }
    const changeAccess = (access) => {
        if (access === 0) {
            dispatch(changeAccess1(id_post))
        } else {
            dispatch(changeAccess0(id_post))
        }
    }
    const statusBookmark = (id_post, bookmark_status) => {
        if (bookmark_status === true) {
            dispatch(deleteBookmark(id_post))
        } else {
            dispatch(addBookmark(id_post))
        }
    }

    const changeStatusPost1 = (id_post) => {
        const data = {
            id_post,
            status: 1,
        }
        dispatch(changeStatus(data))
    }
    const changeStatusPost2 = (id_post) => {
        const data = {
            id_post,
            status: 2,
        }
        dispatch(changeStatus(data))
    }

    const scrollToTop = () => {
        document.documentElement.scrollTop = 0
    }

    const tamRef = useRef()
    const postRef = useRef()
    const cardPostRef = useRef()

    window.addEventListener("scroll", (e) => {
        if (tamRef.current) {
            if (window.pageYOffset > 1000) {
                tamRef.current.style.display = "flex"
            } else {
                tamRef.current.style.display = "none"
            }
        }
        if (postRef.current) {
            if (window.pageYOffset >= 0 && window.pageYOffset <= 214) {
                cardPostRef.current.style.display = "flex"
            }
            else if (window.pageYOffset > postRef.current.clientHeight - 400) {
                cardPostRef.current.style.display = "none"
            } else {
                cardPostRef.current.style.display = "flex"
            }
        }
    })



    return (
        <>
            <div
                className="tam"
                ref={tamRef}
                onClick={() => {
                    scrollToTop()
                    dispatch(setShow())
                }}
            >
                <i className="fas fa-arrow-up fa-2x"></i>
            </div>
            {/* <div
                className="tam1"
            >
                <i className="fas fa-arrow-up fa-2x"></i>
            </div> */}
            {/* <ScrollToTop /> */}
            <Col xl={1} lg={1} md={0} sm={0} className='vote-post'>
                {/* <Row> */}
                <Card className="card-post" ref={cardPostRef}>
                    <Card className="card-post-1">
                        <Col className="text-center">
                            <Button
                                variant={vote === 1 ? "info" : "none"}
                                onClick={() =>
                                    upVote(
                                        post.post.total_vote_up,
                                        post.post.total_vote_down
                                    )
                                }
                            >
                                <i className="far fa-thumbs-up fa-2x"></i>
                            </Button>
                        </Col>
                        {/* </Row> */}
                        {/* <Row> */}
                        <Col className="text-center vote-mark">{vote_post}</Col>
                        {/* </Row> */}
                        {/* <Row> */}
                        <Col className="text-center">
                            <Button
                                variant={vote === -1 ? "info" : "none"}
                                onClick={downVote}
                            >
                                <i className="far fa-thumbs-down fa-2x"></i>
                            </Button>
                        </Col>
                    </Card>
                    {/* </Row> */}
                    {/* <Row> */}
                    <Col></Col>
                    <Card className="card-post-2">
                        <Col className="text-center">
                            <Button
                                variant={
                                    post.post.bookmark_status === true
                                        ? "success"
                                        : "none"
                                }
                                onClick={() =>
                                    statusBookmark(
                                        post.post.id_post,
                                        post.post.bookmark_status
                                    )
                                }

                            >
                                <i className="far fa-bookmark fa-2x"></i>
                            </Button>
                        </Col>
                        <Col className="text-center">
                            <Button
                                variant="none"
                                onClick={showComment}

                            >
                                <i className="far fa-comment fa-2x"></i>
                            </Button>
                        </Col>
                    </Card>
                </Card>
                {/* </Row> */}
            </Col>
            <Col xl={11} lg={11} md={12} sm={12} className="post-watch">
                <div className="post" ref={postRef}>
                    {/* <div className="header-post"> */}
                    <Row>
                        <Col xl={6} lg={6} md={6} sm={6}>
                            <Card
                                style={{
                                    flexDirection: "row",
                                    // width: "50%",
                                    border: "0",
                                    // padding: "0",
                                    backgroundColor: "#F0F8FF",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    src={post.author.avatar}
                                    roundedCircle
                                    style={{ width: "6rem", height: "6rem" }}
                                />
                                <Card.Body
                                    style={{ padding: "0", margin: "10px" }}
                                >
                                    <Card.Title
                                        as={Link}
                                        to={`/authors/${post.author.id_account}`}
                                        style={{
                                            textDecoration: "none",
                                            // color: "black",
                                            // display: "inline",
                                        }}
                                    >
                                        {post.author.real_name}{" "}
                                        <span style={{ color: "#2596be" }}>
                                            @{post.author.account_name}
                                        </span>
                                    </Card.Title>
                                    {post.post.access === 1 &&
                                        post.post.status === 1 ? (
                                        <Card.Text className="d-flex btn-post-watch-left">
                                            <Button variant="none">
                                                <i className="fas fa-star">
                                                    &nbsp;{mark.mark}
                                                </i>
                                            </Button>
                                            <Button variant="none">
                                                <i className="fas fa-user-plus">
                                                    &nbsp;
                                                    {post.author.total_follower}
                                                </i>
                                            </Button>
                                            <Button variant="none">
                                                <i className="fas fa-edit">
                                                    &nbsp;
                                                    {post.author.total_post}
                                                </i>
                                            </Button>
                                        </Card.Text>
                                    ) : (
                                        <Card.Text className="d-flex btn-post-watch-left">
                                            <Button variant="none">
                                                <i className="fas fa-star">
                                                    &nbsp;
                                                    {mark.mark}
                                                </i>
                                            </Button>
                                            {/* <Button variant="none"><i className="fas fa-user-friends">3k</i></Button> */}
                                            <Button variant="none">
                                                <i className="fas fa-edit">
                                                    &nbsp;
                                                    {post.author.total_post}
                                                </i>
                                            </Button>
                                            {post.author.id_account ===
                                                user.id_account ? (
                                                <>
                                                    <Button variant="none">
                                                        {post.post.access ===
                                                            0 ? (
                                                            <i
                                                                className="far fa-check-circle"
                                                                onClick={() =>
                                                                    changeAccess(
                                                                        post
                                                                            .post
                                                                            .access
                                                                    )
                                                                }
                                                            ></i>
                                                        ) : (
                                                            <i
                                                                className="fas fa-lock"
                                                                onClick={() =>
                                                                    changeAccess(
                                                                        post
                                                                            .post
                                                                            .access
                                                                    )
                                                                }
                                                            ></i>
                                                        )}
                                                    </Button>
                                                    <Button
                                                        variant="none"
                                                        onClick={() =>
                                                            dispatch(
                                                                changeAccess2(
                                                                    post.post
                                                                        .id_post
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <i className="fas fa-link"></i>
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        className="btn btn-sm btn-success"
                                                        style={{
                                                            margin: "5px",
                                                        }}
                                                        onClick={() =>
                                                            changeStatusPost1(
                                                                post.post
                                                                    .id_post
                                                            )
                                                        }
                                                    >
                                                        <i className="fas fa-unlock-alt" />
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        style={{
                                                            margin: "5px",
                                                        }}
                                                        onClick={() =>
                                                            changeStatusPost2(
                                                                post.post
                                                                    .id_post
                                                            )
                                                        }
                                                    >
                                                        <i className="fas fa-lock" />
                                                    </button>
                                                </>
                                            )}
                                        </Card.Text>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={6} lg={6} md={6} sm={6}>
                            {/* <div className="right-header-post"> */}
                            <Card className="card-watch-post-right"
                                style={{
                                    // flexDirection: "row",
                                    // width: "50%",
                                    border: "0",
                                    // padding: "0",
                                    backgroundColor: "#F0F8FF",
                                    // justifyContent: "right",
                                    alignItems: "right",
                                }}
                            >
                                <Card.Body style={{ padding: "0", margin: "10px", alignItems: 'center' }}>
                                    <Card.Text style={{ textAlign: 'right' }}
                                    >
                                        <b><i>{`Ngày ${date[0]} tháng ${date[1]} năm ${date[2]}`}</i></b>
                                    </Card.Text>
                                    <Card.Text className="btn-post-watch-right"
                                        style={{ flexDirection: "row", textAlign: 'right' }}
                                    >
                                        <Button variant="none">
                                            <i className="fas fa-eye">
                                                &nbsp;{post.post.view}
                                            </i>
                                        </Button>
                                        <Button variant="none">
                                            <i className="fas fa-bookmark">
                                                &nbsp;{post.post.total_bookmark}
                                            </i>
                                        </Button>
                                        <Button
                                            variant="none"
                                            onClick={showComment}
                                        >
                                            <i className="fas fa-comments">
                                                &nbsp;{post.post.total_comment}
                                            </i>
                                        </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            {/* <div>
                                <i>{`ngày ${date[0]} tháng ${date[1]} năm ${date[2]}`}</i>
                            </div> */}
                            {/* <div className="post-item-button">
                                <Button variant="none">
                                    <i className="fas fa-eye">
                                        &nbsp;{post.post.view}
                                    </i>
                                </Button>
                                <Button variant="none">
                                    <i className="fas fa-bookmark">
                                        &nbsp;{post.post.total_bookmark}
                                    </i>
                                </Button>
                                <Button
                                    variant="none"
                                    onClick={showComment}
                                >
                                    <i className="fas fa-comments">
                                        &nbsp;{post.post.total_comment}
                                    </i>
                                </Button>
                            </div> */}
                        </Col>
                        {/* </div> */}
                    </Row>
                    {/* </div> */}
                    <h4 className="mt-4">
                        <b>{post.post.title}</b>
                    </h4>
                    {/* <ReactMarkdown
                            children={post.post.content}
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '')
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            children={String(children).replace(/\n$/, '')}
                                            style={docco}
                                            language={match[1]}
                                            PreTag="div"
                                            {...props}
                                        />
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        /> */}
                    {/* <span><ReactMarkdown children={post.post.content} /></span> */}
                    <MDEditor.Markdown source={post.post.content} />

                </div>
            </Col>
        </>
    )
}

export default WatchPost
