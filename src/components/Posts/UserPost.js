import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import Header from "../home/Header"
import Footer from "../home/Footer"
import Menu from ".././home/Menu"
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
import { loadUser, userSelector } from "../../reducers/User/loginForm"
import { useParams } from "react-router"
import {
    fetchPostUser,
    postUserSelector,
} from "../../reducers/Posts/changeStatusPost"
import {
    authorPostSelector,
    deleteAuthorAll,
    findAuthorP,
    followAuthorAll,
} from "../../reducers/Author/author"
import { findAuthor } from "../../utils/callerAPI"
import img1 from "../.././assets/home/img1.png"
import img2 from "../.././assets/home/img2.png"
import img3 from "../.././assets/home/img3.png"
import img4 from "../.././assets/home/img4.png"
import img5 from "../.././assets/home/img5.png"

const UserPost = () => {
    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const post = useSelector(postUserSelector)
    const { id_account } = useParams()
    const author = useSelector(authorPostSelector)
    console.log(author)

    const [pageNumber, setPageNumber] = useState(0)
    const todoPerPage = 5
    const pagesVisited = pageNumber * todoPerPage

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    useEffect(() => {
        dispatch(
            findAuthorP({
                id_author: id_account,
                id_user: user.id_account,
            })
        )
    }, [dispatch, user, id_account])

    useEffect(() => {
        dispatch(fetchPostUser(id_account))
    }, [dispatch, id_account])

    const changeFollow = async (id_account) => {
        try {
            const find = await findAuthor(id_account, user.id_account)
            if (find.status === 200 && find.data.status === true) {
                dispatch(deleteAuthorAll(id_account))
            } else {
                dispatch(followAuthorAll(id_account))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const pageCount = Math.ceil(post.length / todoPerPage)
    const displayTodo = post
        .slice(pagesVisited, pagesVisited + todoPerPage)
        .map((post, index) => {
            return (
                <Card
                    key={index}
                    className="bg-light post-of-bookmark"
                    style={{ flexDirection: "row" }}
                >
                    <Link to={`/authors/${author.id_account}`}>
                        <Image
                            src={author.avatar}
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
                                to={`/authors/${author.id_account}`}
                                style={{ color: "#5488c7", fontSize: "18px" }}
                            >
                                {author.real_name}
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
                            <Button variant="none">
                                <i className="fas fa-sort">
                                    &nbsp;
                                    {post.post.total_vote_up -
                                        post.post.total_vote_down}
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
                                <Card className="post-user-card"
                                    style={{
                                        flexDirection: "row",
                                        width: "100%",
                                        border: "0",
                                        padding: "5px 30px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: '25px'
                                    }}
                                >
                                    <Image
                                        src={author.avatar}
                                        roundedCircle
                                        style={{
                                            width: "6rem",
                                            height: "6rem",
                                        }}
                                    />
                                    <Card.Body
                                        style={{ padding: "10px" }}
                                    >
                                        <Card.Title
                                            style={{ fontSize: "28px" }}
                                        >
                                            {author.real_name}{" "}
                                            <span
                                                style={{
                                                    color: "#2596be",
                                                }}
                                            >
                                                @{author.account_name}
                                            </span>
                                        </Card.Title>
                                        <Card.Text className="align-items-center">
                                            <span className="d-flex">
                                                <i
                                                    className="fas fa-star"
                                                    style={{
                                                        fontSize:
                                                            "20px",
                                                        padding: "10px",
                                                    }}
                                                >
                                                    &nbsp;
                                                    {author.total_vote_up -
                                                        author.total_vote_down}
                                                </i>
                                                <i
                                                    className="fas fa-user-friends"
                                                    style={{
                                                        fontSize:
                                                            "20px",
                                                        padding: "10px",
                                                    }}
                                                >
                                                    &nbsp;
                                                    {
                                                        author.total_follower
                                                    }
                                                </i>
                                                <i
                                                    className="fas fa-edit"
                                                    style={{
                                                        fontSize:
                                                            "20px",
                                                        padding: "10px",
                                                    }}
                                                >
                                                    &nbsp;
                                                    {author.total_post}
                                                </i>
                                            </span>
                                            {author.id_account !==
                                                user.id_account ? (
                                                <Button
                                                    variant="info"
                                                    style={{
                                                        width: "auto",
                                                    }}
                                                    onClick={() =>
                                                        changeFollow(
                                                            author.id_account
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
                                                        {author.status ===
                                                            true
                                                            ? "Đang theo dõi"
                                                            : " Theo dõi"}
                                                    </i>
                                                </Button>
                                            ) : (
                                                <></>
                                            )}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                {displayTodo}
                                {author.total_post > 0 ? (
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
                                ) : (
                                    <></>
                                )}
                                {/* <br /> */}
                            </Col>
                            {/* <InformationPost /> */}
                            <>
                                <Col
                                    xl={3}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    style={{ backgroundColor: "#F0F8FF" }}
                                >
                                    <h2 className="title-information" style={{ color: '#084298' }}><b>Thông tin: {author.real_name}</b></h2>
                                    <ListGroup className="info-posts">
                                        <Row>
                                            <Col xl={12} lg={6} md={6}>
                                                <ListGroup.Item action
                                                    as={Link}
                                                    to={`/authors/${author.id_account}`}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <img src={img3} alt="img1" />
                                                        &nbsp;
                                                        <div>
                                                            <h6>Số bài viết</h6>
                                                            <p>{author.total_post}</p>
                                                        </div>
                                                    </div>
                                                </ListGroup.Item>
                                            </Col>
                                            <Col xl={12} lg={6} md={6}>
                                                <ListGroup.Item action as={Link}
                                                    to={`/authors/${author.id_account}`}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <img src={img1} alt="img1" />
                                                        &nbsp;
                                                        <div>
                                                            <h6>Tổng số lượt xem bài viết</h6>
                                                            <p>{author.total_view}</p>
                                                        </div>
                                                    </div>
                                                </ListGroup.Item>
                                            </Col>
                                            <Col xl={12} lg={6} md={6}>
                                                <ListGroup.Item action>
                                                    <div className="d-flex align-items-center">
                                                        <img src={img2} alt="img2" />
                                                        &nbsp;
                                                        <div>
                                                            <h6>Reputations</h6>
                                                            <p>
                                                                {author.total_vote_up
                                                                    ? author.total_vote_up -
                                                                    author.total_vote_down
                                                                    : author.total_vote_up}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </ListGroup.Item>
                                            </Col>
                                            <Col xl={12} lg={6} md={6}>
                                                <ListGroup.Item action>
                                                    <div className="d-flex align-items-center">
                                                        <img src={img3} alt="img3" />
                                                        &nbsp;
                                                        <div>
                                                            <h6>Các thẻ theo dõi</h6>
                                                            <p>{author.total_tag_follow}</p>
                                                        </div>
                                                    </div>
                                                </ListGroup.Item>
                                            </Col>
                                            <Col xl={12} lg={6} md={6}>
                                                <ListGroup.Item action>
                                                    <div className="d-flex align-items-center">
                                                        <img src={img4} alt="img4" />
                                                        &nbsp;
                                                        <div>
                                                            <h6>Đang theo dõi các người dùng</h6>
                                                            <p>{author.total_following}</p>
                                                        </div>
                                                    </div>
                                                </ListGroup.Item>
                                            </Col>
                                            <Col xl={12} lg={6} md={6}>
                                                <ListGroup.Item action>
                                                    <div className="d-flex align-items-center">
                                                        <img src={img5} alt="img5" />
                                                        &nbsp;
                                                        <div>
                                                            <h6>Các người dùng đang theo dõi</h6>
                                                            <p>{author.total_follower}</p>
                                                        </div>
                                                    </div>
                                                </ListGroup.Item>
                                            </Col>
                                        </Row>
                                    </ListGroup>
                                </Col>
                            </>
                        </Row>
                    </Col>
                </Row>
            </Container >
            <Footer />
        </>
    )
}

export default UserPost
