import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import Header from "../home/Header"
import Menu from ".././home/Menu"
import InformationPost from "../Posts/InformationPost"
import {
    Card,
    Button,
    Image,
    ListGroup,
    Row,
    Col,
    Container,
} from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
    deleteFollowTagALL,
    findTagT,
    followTagALL,
    loadTagsPost,
    tagSelector,
    tagsPostSelector,
} from "../../reducers/Tags/tags"
import { loadUser, userSelector } from "../../reducers/User/loginForm"
import { useParams } from "react-router"
import { findTag } from "../../utils/callerAPI"
import Footer from "../home/Footer"
const TagPost = () => {
    const dispatch = useDispatch()
    const tag = useSelector(tagSelector)
    const user = useSelector(userSelector)
    const tagsPost = useSelector(tagsPostSelector)
    const { id_tag } = useParams()

    const [pageNumber, setPageNumber] = useState(0)
    const todoPerPage = 5
    const pagesVisited = pageNumber * todoPerPage

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])
    useEffect(() => {
        dispatch(
            findTagT({
                id_tag: id_tag,
                id_account: user.id_account,
            })
        )
    }, [dispatch, user, id_tag])

    useEffect(() => {
        dispatch(loadTagsPost(id_tag))
    }, [dispatch, id_tag])

    const changeFollow = async (id_tag) => {
        try {
            const find = await findTag(id_tag)
            if (find.status === 200 && find.data.status === true) {
                dispatch(deleteFollowTagALL(id_tag))
            } else {
                dispatch(followTagALL(id_tag))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const pageCount = Math.ceil(tagsPost.length / todoPerPage)
    const displayTodo = tagsPost
        .slice(pagesVisited, pagesVisited + todoPerPage)
        .map((post, index) => {
            return (
                <Card
                    key={index}
                    className="bg-light post-of-bookmark"
                    style={{ flexDirection: "row" }}
                >
                    <Link to={`/authors/${post.author.id_account}`}>
                        <Image
                            src={post.author.avatar}
                            roundedCircle
                            style={{
                                width: "4rem",
                                height: "4rem",
                                margin: "15px",
                            }}
                        />
                    </Link>
                    <Card.Body>
                        <span>
                            <Link
                                to={`/authors/${post.author.id_account}`}
                                style={{ color: "#5488c7", fontSize: "18px" }}
                            >
                                {post.author.real_name}
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
                        </span>
                        <Card.Title>
                            <Link to={`/p/post/${post.post.id_post}`}>
                                {post.post.title}
                            </Link>
                        </Card.Title>
                        <ListGroup horizontal>
                            {post.tags.map((tag, index) => (
                                <ListGroup.Item
                                    key={index}
                                    as={Link}
                                    action
                                    to={`/tags/${tag.id_tag}`}
                                    style={{ color: 'black' }}
                                >
                                    <b>{tag.name}</b>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <Card.Text>
                            {post.post.content.substring(0, 200) + "..."}
                        </Card.Text>
                        <div className="footer-card">
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
                            <Button variant="none">
                                <i className="fas fa-comments">
                                    &nbsp;{post.post.total_comment}
                                </i>
                            </Button>
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
                                    <Card className="tags-post"
                                        style={{
                                            flexDirection: "row",
                                            // width: "100%",
                                            border: "0",
                                            // padding: "5px 30px",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginTop: '25px'
                                        }}
                                    >
                                        <Image
                                            src={tag.logo}
                                            style={{
                                                width: "7rem",
                                                height: "7rem",
                                            }}
                                        />
                                        <Card.Body
                                            style={{
                                                padding: "0",
                                                margin: "10px",
                                            }}
                                        >
                                            <Card.Title
                                                style={{ fontSize: "28px" }}
                                            >
                                                {tag.name}
                                            </Card.Title>
                                            <Card.Text
                                                className="d-flex align-items-center"
                                                style={{
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontSize: "18px",
                                                    }}
                                                >
                                                    <b>{tag.total_post}</b>{" "}
                                                    bài viết
                                                </span>
                                                <span
                                                    style={{
                                                        fontSize: "18px",
                                                    }}
                                                >
                                                    <b>
                                                        {tag.total_follower}
                                                    </b>{" "}
                                                    người theo dõi
                                                </span>
                                                <Button
                                                    variant="info"
                                                    style={{ width: "auto" }}
                                                    onClick={() =>
                                                        changeFollow(
                                                            tag.id_tag
                                                        )
                                                    }
                                                >
                                                    <i
                                                        className="fas fa-rss-square"
                                                        style={{
                                                            fontSize:
                                                                "20px",
                                                        }}
                                                    >
                                                        &nbsp;
                                                        {tag.status === true
                                                            ? "Đang theo dõi"
                                                            : "Theo dõi"}
                                                    </i>
                                                </Button>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                {displayTodo}

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

                            </Col>
                            <InformationPost />
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default TagPost
