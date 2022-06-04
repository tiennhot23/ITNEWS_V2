import React, { useEffect, useState } from "react"
import Menu from ".././home/Menu"
import Header from ".././home/Header"
import Footer from ".././home/Footer"
import ReactPaginate from "react-paginate"
import {
    Card,
    ListGroup,
    Button,
    Image,
    Container,
    Row,
    Col,
} from "react-bootstrap"
import { Link } from "react-router-dom"
import InformationPost from "../Posts/InformationPost"
import { useDispatch, useSelector } from "react-redux"
import { loadUser, userSelector } from "../../reducers/User/loginForm"
import {
    changeAccessPost,
    fetchPostAccess0,
    postUserSelect,
    deletePost
} from "../../reducers/User/fetchPost"
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const PostAccess0 = () => {
    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const postAccess = useSelector(postUserSelect)

    const [pageNumber, setPageNumber] = useState(0)
    const todoPerPage = 4
    const pagesVisited = pageNumber * todoPerPage

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchPostAccess0())
    }, [dispatch])

    const changeAccess1 = (id_post) => {
        const data = {
            id_post,
            access: 1,
            type: 0,
        }
        dispatch(changeAccessPost(data))
    }

    const changeAccess2 = (id_post) => {
        const data = {
            id_post,
            access: 2,
            type: 0,
        }
        dispatch(changeAccessPost(data))
    }

    const deletePostUser = (id_post) => {
        dispatch(deletePost(id_post))
    }
    const pageCount = Math.ceil(postAccess.length / todoPerPage)
    const displayTodo = postAccess
        .slice(pagesVisited, pagesVisited + todoPerPage)
        .map((post, index) => {
            return (
                <Card
                    className="bg-light post-of-bookmark"
                    style={{ flexDirection: "row" }}
                    key={index}
                >
                    <Link to="#">
                        <Image
                            src={user.avatar}
                            roundedCircle
                            style={{
                                width: "4rem",
                                height: "4rem",
                                margin: "15px 5px",
                            }}
                        />
                    </Link>
                    <Card.Body>
                        <span>
                            <Link
                                to={`/authors/${user.id_account}`}
                                style={{
                                    color: "#5488c7",
                                    fontSize: "18px",
                                }}
                            >
                                {user.real_name}
                            </Link>
                            &ensp;
                            <i
                                style={{
                                    fontSize: "16px",
                                }}
                            >
                                {post.post.day_created} -{" "}
                                {post.post.time_created}
                            </i>
                            <Button
                                style={{ float: "right" }}
                                variant="none"
                                as={Link}
                                // to={`/posts/${post.post.id_post}/edit`}
                                to={{
                                    pathname: `/posts/${post.post.id_post}/edit`,
                                    state: {
                                        title: post.post.title,
                                        tags: post.tags,
                                        content: post.post.content,
                                        access: post.post.access,
                                    },
                                }}
                            >
                                <i className="fas fa-edit"></i>
                            </Button>
                        </span>
                        <Card.Title>
                            <Link to={`/p/post/${post.post.id_post}`}>
                                {post.post.title}
                            </Link>
                        </Card.Title>
                        <ListGroup horizontal>
                            {post.tags.map((tag, tagIndex) => {
                                return (
                                    <ListGroup.Item
                                        key={tagIndex}
                                        as={Link}
                                        action
                                        to={`/tags/${tag.id_tag}`} c
                                        style={{ color: 'black' }}
                                    >
                                        <b>{tag.name}</b>
                                    </ListGroup.Item>
                                )
                            })}
                        </ListGroup>
                        <Card.Text>
                            {post.post.content.substring(0, 200) + "..."}
                        </Card.Text>
                        <div className="footer-card">
                            <OverlayTrigger
                                delay={{ hide: 100, show: 100 }}
                                overlay={(props) => (
                                    <Tooltip {...props}>
                                        Công khai bài viết
                                    </Tooltip>
                                )}
                                placement="bottom"
                            ><Button
                                variant="none"
                                data-tip="hello world"
                                onClick={() => changeAccess1(post.post.id_post)}
                            >
                                    <i className="far fa-check-circle"></i>
                                </Button>
                            </OverlayTrigger>

                            <OverlayTrigger
                                delay={{ hide: 100, show: 100 }}
                                overlay={(props) => (
                                    <Tooltip {...props}>
                                        Ẩn link bài viết
                                    </Tooltip>
                                )}
                                placement="bottom"
                            ><Button
                                variant="none"
                                onClick={() => changeAccess2(post.post.id_post)}
                            >
                                    <i className="fas fa-link"></i>
                                </Button>
                            </OverlayTrigger>

                            <OverlayTrigger
                                delay={{ hide: 100, show: 100 }}
                                overlay={(props) => (
                                    <Tooltip {...props}>
                                        Xóa vĩnh viễn
                                    </Tooltip>
                                )}
                                placement="bottom"
                            ><Button
                                variant="none"
                                onClick={() => deletePostUser(post.post.id_post)}
                            >
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </OverlayTrigger>
                        </div>
                    </Card.Body>
                </Card>
            )
        })

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    return (
        <>
            <Header
                real_name={user.real_name}
                id_role={user.id_role}
                gender={user.gender}
                company={user.company}
                phone={user.phone}
                avatar={user.avatar}
                birth={user.birth}
            />
            <Container fluid style={{ marginTop: '95px', minHeight: '85vh', backgroundColor: '#F0F8FF' }}>
                <Row>
                    <Menu />
                    <Col xl={10} lg={9} md={12} sm={12}>
                        <Row>
                            <Col xl={9} lg={12} md={12} sm={12}>
                                <Row>
                                    <h4 style={{ marginTop: '45px', color: '#084298' }}><b>Các bài viết riêng tư</b></h4>
                                    <div>{displayTodo}</div>
                                    {
                                        postAccess.length > 0 ? (
                                            <div className="list-page">
                                                <ReactPaginate
                                                    previousLabel={<i className="fa fa-chevron-left "></i>}
                                                    nextLabel={<i className="fa fa-chevron-right"></i>}
                                                    pageCount={pageCount}
                                                    onPageChange={changePage}
                                                    containerClassName={"pagination justify-content-center"}
                                                    pageClassName={"page-item me-2"}
                                                    pageLinkClassName={"page-link"}
                                                    previousClassName={"page-item me-2"}
                                                    previousLinkClassName={"page-link"}
                                                    nextClassName={"page-item"}
                                                    nextLinkClassName={"page-link"}
                                                    breakClassName={"page-item me-2"}
                                                    breakLinkClassName={"page-link"}
                                                    disabledClassName={"paginationDisabled"}
                                                    activeClassName={"active"}
                                                    marginPagesDisplayed={1}
                                                    pageRangeDisplayed={2}
                                                />
                                            </div>
                                        ) : <></>
                                    }
                                </Row>
                            </Col>
                            <InformationPost />
                        </Row>
                    </Col>
                </Row>
            </Container >
            <Footer />
        </>
    )
}

export default PostAccess0
