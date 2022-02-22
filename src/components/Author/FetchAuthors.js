import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { Card, Button, Image, Row, Col, Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Header from "../home/Header"
import Footer from "../home/Footer"
import {
    authorSelector,
    deleteAuthorAll,
    followAuthorAll,
    loadAuthor,
} from "../../reducers/Author/author"
import { loadUser, userSelector } from "../../reducers/User/loginForm"
import { findAuthor } from "../../utils/callerAPI"
import { Link } from "react-router-dom"

const FetchAuthors = () => {
    const dispatch = useDispatch()
    const authors = useSelector(authorSelector)
    const user = useSelector(userSelector)

    const [pageNumber, setPageNumber] = useState(0)
    const todoPerPage = 12
    const pagesVisited = pageNumber * todoPerPage

    useEffect(() => {
        dispatch(loadUser())
        dispatch(loadAuthor())
    }, [dispatch, user.id_account])

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

    const pageCount = Math.ceil(authors.length / todoPerPage)
    const displayTodo = authors
        .slice(pagesVisited, pagesVisited + todoPerPage)
        .map((author, index) => {
            return (
                <Col xl={3} lg={4} md={4} sm={6}>
                    <Card
                        key={index}
                        style={{
                            flexDirection: "row",
                            // width: "20%",
                            border: "0",
                            // padding: " 3% 13.5%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Link to={`authors/${author.id_account}`}>
                            <Image
                                src={author.avatar}
                                roundedCircle
                                style={{ width: "5rem", height: "5rem" }}
                            />
                        </Link>
                        <Card.Body style={{ padding: "0", margin: "10px" }}>
                            <Card.Title
                                as={Link}
                                to={`authors/${author.id_account}`}
                                style={{
                                    textDecoration: "none",
                                }}
                            >
                                {author.real_name}
                            </Card.Title>
                            <Card.Text className="align-items-center">
                                <span className="d-flex">
                                    <i className="fas fa-star">
                                        &nbsp;
                                        {author.total_vote_up - author.total_vote_down}
                                    </i>
                                    <i className="fas fa-user-friends">
                                        &nbsp;
                                        {author.total_follower}
                                    </i>
                                    <i className="fas fa-edit">
                                        &nbsp;
                                        {author.total_post}
                                    </i>
                                </span>
                                {author.id_account !== user.id_account ? (
                                    <Button
                                        variant="info"
                                        onClick={() =>
                                            changeFollow(author.id_account)
                                        }
                                    >
                                        <i className="fas fa-rss-square">
                                            {author.status === true
                                                ? " Đang theo dõi"
                                                : " Theo dõi"}
                                        </i>
                                    </Button>
                                ) : (
                                    <></>
                                )}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
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
                    <Col xl={12} lg={12} md={12} sm={12}>
                        <Row>
                            <Col xl={2}>
                                <h4 style={{ color: '#146ebe', textAlign: 'center', position: 'fixed', zIndex: '2' }}>
                                    <Link to='/'><span style={{ float: 'left', color: '#146ebe' }}><i class="fas fa-reply-all fa-2x"></i></span></Link>
                                </h4>
                            </Col>
                            <Col xl={8} lg={12} md={12} sm={12}>
                                <h3 style={{ marginTop: '30px', color: '#084298', textAlign: 'center', marginBottom: '20px' }}>
                                    <b>Tất cả tác giả</b>
                                </h3>

                                <div className="box-people">
                                    <Row>
                                        {displayTodo}
                                    </Row>
                                </div>

                                <div className="list-page mt-2">
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
                            <Col xl={2}></Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default FetchAuthors
