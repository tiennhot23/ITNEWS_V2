import React, { useEffect } from "react"
import { Button, Card, Image, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
    commentChildrenSelector,
    deleteComment,
    loadCommentChildren,
    updateComment,
    hidePresentlyComment
} from "../../reducers/Comment/comment"
import { useParams } from "react-router"
import CommentForm from "./CommentForm"
import { toastError } from "../.././Toast/Toast"

const ShowCommentChildren = ({
    id_cmt_parent,
    id_cmt,
    isEditing,
    activeComment,
    setActiveComment,
    id_account,
    id_role,
    account_status
}) => {
    const dispatch = useDispatch()
    const commentChildren = useSelector(commentChildrenSelector)
    const { id_post } = useParams()

    useEffect(() => {
        dispatch(loadCommentChildren(id_post))
    }, [dispatch, id_post])

    const getReplies = commentChildren.filter(
        (comment) =>
            comment.id_cmt_parent === id_cmt_parent &&
            comment.id_cmt !== id_cmt_parent
    )

    const hideCommentChildren = (id_cmt, status) => {
        if (status === 0) {
            const comment = {
                id_post,
                id_cmt,
                new_status: 1
            }
            dispatch(hidePresentlyComment(comment))
        } else {
            const comment = {
                id_post,
                id_cmt,
                new_status: 0
            }
            dispatch(hidePresentlyComment(comment))
        }

    }

    const deleteCommentChildren = (id_cmt) => {
        dispatch(deleteComment({ id_post, id_cmt }))
    }

    const updateCommentChildren = (id_cmt, content) => {
        if (account_status !== 0) {
            toastError("Tài khoản đã bị khóa, không thể chỉnh sửa chat!")
            return
        }
        dispatch(updateComment({ id_post, id_cmt, content }))
    }

    const formatContent = (content) => {
        let arr = content.split("\n")
        let res = []
        for (let line of arr) {
            res.push(line)
            res.push(<br />)
        }
        return res
    }

    return (
        <>
            {getReplies.map((comment) => (
                <div className="read-comment rep" key={comment.id_cmt}>
                    <Card
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            border: "0",
                            padding: "0",
                        }}
                    >
                        <Image
                            src={comment.avatar}
                            roundedCircle
                            style={{
                                width: "4rem",
                                height: "4rem",
                                marginRight: "10px",
                            }}
                        />
                        <Card.Body style={{ padding: "0" }}>
                            <Row className="d-flex">
                                <Card.Title
                                    as={Link}
                                    to={`/authors/${comment.id_account}`}
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                        display: "inline",
                                    }}
                                >
                                    {comment.real_name}{" "}
                                    <span style={{ color: "#2596be" }}>
                                        @{comment.account_name}
                                    </span>
                                    <span className="date-comment">
                                        <i>
                                            {comment.day} - {comment.time}
                                        </i>
                                    </span>
                                </Card.Title>
                            </Row>
                            <Card.Text
                                className="d-flex"
                                style={{ flexDirection: "column" }}
                            >
                                {isEditing &&
                                    activeComment.id_cmt === comment.id_cmt ? (
                                    <CommentForm
                                        submitLabel="Update"
                                        hasCancelButton
                                        initialText={comment.content}
                                        handleSubmit={(content) =>
                                            updateCommentChildren(
                                                comment.id_cmt,
                                                content
                                            )
                                        }
                                        handleCancel={() =>
                                            setActiveComment(false)
                                        }
                                    />
                                ) : (
                                    <span style={{ fontSize: "19px" }}>
                                        {formatContent(comment.content)}
                                    </span>
                                )}
                                <span className="d-flex comment-item-button">
                                    {id_account !== 0 && id_role < 3 && id_role < comment.id_role ?
                                        <>
                                            <Button variant="none">
                                                <i
                                                    className={comment.status === 0 ? "fas fa-eye-slash fa-x" : "fas fa-eye fa-x"}
                                                    onClick={() =>
                                                        hideCommentChildren(
                                                            comment.id_cmt, comment.status
                                                        )
                                                    }
                                                ></i>
                                            </Button>
                                        </>
                                        : <></>}

                                    {id_account === comment.id_account ? (
                                        <>
                                            <Button
                                                variant="none"
                                                onClick={() =>
                                                    setActiveComment({
                                                        id_cmt: comment.id_cmt,
                                                        type: "editing",
                                                    })
                                                }
                                            >
                                                <i className="far fa-edit fa-x"></i>
                                            </Button>
                                            <Button
                                                variant="none"
                                                onClick={() =>
                                                    deleteCommentChildren(
                                                        comment.id_cmt
                                                    )
                                                }
                                            >
                                                <i className="far fa-trash-alt fa-x"></i>
                                            </Button>
                                        </>
                                    ) : id_role === 1 ? (
                                        <>
                                            <Button variant="none">
                                                <i
                                                    className="far fa-trash-alt fa-x"
                                                    onClick={() =>
                                                        deleteCommentChildren(
                                                            comment.id_cmt
                                                        )
                                                    }
                                                ></i>
                                            </Button>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </>
    )
}

export default ShowCommentChildren
