import React, { useEffect, useState } from "react"
import { Form, Button, Row, Col, Container } from "react-bootstrap"
import MDEditor from "@uiw/react-md-editor"
import Select from "react-select"
import { useDispatch, useSelector } from "react-redux"
import { loadTags, tagsSelector } from "../../reducers/Tags/tags"
import { components } from "react-select"
import { updatePost } from "../../reducers/Posts/posts"
import { useParams } from "react-router"
import { loadUser, userSelector } from "../../reducers/User/loginForm"
import { useLocation, useHistory } from "react-router-dom"
import { toastError } from "../../Toast/Toast"

const UpdatePost = () => {
    const { id_post } = useParams()
    const location = useLocation()
    const history = useHistory()
    const user = useSelector(userSelector)

    const [title, setTitle] = useState(location.state.title)
    const [tags, setTags] = useState()
    const [content, setContent] = useState(location.state.content)
    const [access, setAccess] = useState(+location.state.access)

    const tagsList = useSelector(tagsSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    useEffect(() => {
        dispatch(loadTags(user.id_account))
    }, [dispatch, user])

    const onChangeSubmitPost = (event) => {
        event.preventDefault()

        if(user.account_status !== 0){
            toastError('Tài khoản đã bị khóa, không thể sửa bài!')
            return
        }

        if (tags === undefined) {
            const data = {
                id_post: id_post,
                post: {
                    title,
                    content,
                    tags: colourOptionChoose.map((value) => {
                        return value.value
                    }),
                    access: +access,
                },
            }
            dispatch(updatePost(data))
            history.push(`/p/post/${id_post}`)
        } else {
            const data = {
                id_post: id_post,
                post: {
                    title,
                    content,
                    tags: tags.map((value) => {
                        return value.value
                    }),
                    access: +access,
                },
            }
            dispatch(updatePost(data))
            history.push(`/p/post/${id_post}`)
        }
    }
    const isValidNewOption = (inputValue, selectValue) =>
        inputValue.length > 0 && selectValue.length < 5

    const colourOptions = tagsList.map((value) => {
        return {
            value: value.id_tag,
            label: value.name,
        }
    })

    const colourOptionChoose = location.state.tags.map((value) => {
        return {
            value: value.id_tag,
            label: value.name,
        }
    })
    const Menu = (props) => {
        const optionSelectedLength = props.getValue().length || 0
        return (
            <components.Menu {...props}>
                {optionSelectedLength < 5 ? (
                    props.children
                ) : (
                    <div style={{ margin: 15 }}>
                        Tối đa chỉ được 5 thẻ bạn ơi!
                    </div>
                )}
            </components.Menu>
        )
    }
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={1}></Col>
                    <Col md={10}>
                        <br />
                        <h4>
                            <b>Cập nhật bài viết</b>
                        </h4>
                        <Form
                            className="box-write-post"
                            onSubmit={onChangeSubmitPost}
                        >
                            <select
                                name="access"
                                style={{ float: "right" }}
                                value={access}
                                onChange={(e) => setAccess(e.target.value)}
                            >
                                <option value={1}>&nbsp;Công Khai&nbsp;</option>
                                <option value={2}>
                                    &nbsp;Bất kì ai có liên kết&nbsp;
                                </option>
                                <option value={0}>
                                    &nbsp;Chỉ mình tôi&nbsp;
                                </option>
                            </select>
                            <input
                                type="text"
                                className="col-sm-12"
                                style={{
                                    margin: "15px 0",
                                    borderRadius: "4px",
                                }}
                                placeholder="Tiêu Đề bài viết"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Select
                                defaultValue={[
                                    colourOptionChoose[0],
                                    colourOptionChoose[1],
                                    colourOptionChoose[2],
                                    colourOptionChoose[3],
                                    colourOptionChoose[4],
                                ]}
                                isMulti
                                name="tags"
                                options={colourOptions}
                                className="basic-multi-select"
                                isValidNewOption={isValidNewOption}
                                components={{ Menu }}
                                classNamePrefix="select"
                                value={tags}
                                onChange={setTags}
                                clearable={false}
                                placeholder="Gắn thẻ bài viết của bạn. Tối đa 5 thẻ ít nhất 1 thẻ!"
                            />
                            <br />
                            <MDEditor
                                height={400}
                                value={content}
                                onChange={setContent}
                                enableScroll={false}
                            />
                            <div style={{ padding: "20px 0 0 0" }} />
                            <Row>
                                <Col sm={3}></Col>
                                <Col sm={6}>
                                    <Button
                                        variant="primary"
                                        style={{
                                            width: "100%",
                                            margin: "10px",
                                        }}
                                        type="submit"
                                    >
                                        <i class="fas fa-pencil-alt"></i>
                                        &nbsp;Cập nhật
                                    </Button>
                                </Col>
                                <Col sm={3}></Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col md={1}></Col>
                </Row>
            </Container>
        </>
    )
}

export default UpdatePost
