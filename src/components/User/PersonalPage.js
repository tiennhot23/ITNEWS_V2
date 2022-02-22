import React, { useEffect, useState } from "react"
import Menu from ".././home/Menu"
import Header from ".././home/Header"
import Footer from ".././home/Footer"
import ReactPaginate from "react-paginate"
import {
    Card,
    Button,
    Container,
    Row,
    Col,
    Image,
    ListGroup,
} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { bookmarkSelector, fetchBookmark } from "../../reducers/User/bookmark"
import { loadUser, userSelector } from "../../reducers/User/loginForm"
import { Link } from "react-router-dom"
import InformationPost from "../Posts/InformationPost"

const PersonalPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const bookmark = useSelector(bookmarkSelector)

    const [pageNumber, setPageNumber] = useState(0)
    const todoPerPage = 4
    const pagesVisited = pageNumber * todoPerPage

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchBookmark(user.id_account))
    }, [dispatch, user])

    const pageCount = Math.ceil(bookmark.length / todoPerPage)
    const displayTodo = bookmark
        .slice(pagesVisited, pagesVisited + todoPerPage)
        .map((book, index) => {
            return (
                <Card
                    className="bg-light post-of-bookmark"
                    style={{ flexDirection: "row" }}
                    key={index}
                >
                    <Link to="#">
                        <Image
                            src={book.author.avatar}
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
                                to={`/authors/${book.author.id_account}`}
                                style={{
                                    color: "#5488c7",
                                    fontSize: "18px",
                                }}
                            >
                                {book.author.real_name}
                            </Link>
                            &ensp;
                            <i
                                style={{
                                    fontSize: "16px",
                                }}
                            >
                                {book.post.day_created} -{" "}
                                {book.post.time_created}
                            </i>
                        </span>
                        <Card.Title>
                            <Link to={`/p/post/${book.post.id_post}`}>
                                {book.post.title}
                            </Link>
                        </Card.Title>
                        <ListGroup horizontal>
                            {book.tags.map((tag, tagIndex) => {
                                return (
                                    <ListGroup.Item
                                        key={tagIndex}
                                        as={Link}
                                        action
                                        to={`/tags/${tag.id_tag}`}
                                        style={{color: 'black'}}
                                    >
                                        <b>{tag.name}</b>
                                    </ListGroup.Item>
                                )
                            })}
                        </ListGroup>
                        <Card.Text>
                            {book.post.content.substring(0, 200) + "..."}
                        </Card.Text>
                        <div className="footer-card">
                            <Button variant="none">
                                <i className="fas fa-eye me-2">
                                    &nbsp;{book.post.view}
                                </i>
                            </Button>
                            <Button variant="none">
                                <i className="fas fa-bookmark">
                                    &nbsp;{book.post.total_bookmark}
                                </i>
                            </Button>
                            <Button variant="none">
                                <i className="fas fa-comments">
                                    &nbsp;{book.post.total_comment}
                                </i>
                            </Button>
                            <Button variant="none">
                                <i className="fas fa-sort">
                                    &nbsp;
                                    {book.post.total_vote_up -
                                        book.post.total_vote_down}
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
                                <h4 style={{ marginTop: '30px', color: '#084298' }}>
                                    <b>Các bài viết đã lưu</b>
                                </h4>
                                <div>{displayTodo}</div>

                                <div className="list-page">
                                    <ReactPaginate
                                        previousLabel={<i class="fa fa-chevron-left "></i>}
                                        nextLabel={<i class="fa fa-chevron-right"></i>}
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

export default PersonalPage
