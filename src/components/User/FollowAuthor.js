import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import Menu from ".././home/Menu"
import Header from ".././home/Header"
import Footer from ".././home/Footer"
import { Card, Image, Container, Row, Col, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
    followingSelector,
    loadFollowing,
} from "../../reducers/User/followAuthors"
import { loadUser, userSelector } from "../../reducers/User/loginForm"
import InformationPost from "../Posts/InformationPost"
import { findAuthor } from "../../utils/callerAPI"
import { deleteAuthor, followAuthor } from "../../reducers/User/followAuthors"
import { Link } from "react-router-dom"

const FollowAuthor = () => {
    const dispatch = useDispatch()
    const following = useSelector(followingSelector)
    const user = useSelector(userSelector)

    const [pageNumber, setPageNumber] = useState(0)
    const todoPerPage = 9
    const pagesVisited = pageNumber * todoPerPage

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    useEffect(() => {
        dispatch(loadFollowing(user.id_account))
    }, [dispatch, user])

    const changeFollow = async (id_account) => {
        try {
            const find = await findAuthor(id_account, user.id_account)
            if (find.status === 200 && find.data.status === true) {
                dispatch(deleteAuthor(id_account))
            } else {
                dispatch(followAuthor(id_account))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const pageCount = Math.ceil(following.length / todoPerPage)
    const displayTodo = following
        .slice(pagesVisited, pagesVisited + todoPerPage)
        .map((author, index) => {
            return (
                <Col xl={3} lg={4} md={4} sm={6}>
                    <Card
                        key={index}
                        style={{
                            flexDirection: "row",
                            border: "0",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            src={author.avatar}
                            roundedCircle
                            style={{ width: "4rem", height: "4rem" }}
                        />
                        <Card.Body style={{ padding: "0", margin: "10px" }}>
                            <Card.Title
                                as={Link}
                                to={`/authors/${author.id_account}`}
                                style={{ textDecoration: "none" }}
                            >
                                {author.real_name}
                            </Card.Title>
                            <Card.Text className="align-items-center">
                                <span className="d-flex">
                                    <i className="fas fa-star">
                                        &nbsp;
                                        {author.total_vote_up -
                                            author.total_vote_down}
                                    </i>
                                    <i className="fas fa-user-friends">
                                        &nbsp;
                                        {author.num_followers}
                                    </i>
                                    <i className="fas fa-edit">
                                        &nbsp;
                                        {author.num_posts}
                                    </i>
                                </span>
                                <Button
                                    variant="info"
                                    onClick={() => changeFollow(author.id_account)}
                                >
                                    <i className="fas fa-rss-square">
                                        {author.status === true
                                            ? " Đang theo dõi"
                                            : " Theo dõi"}
                                    </i>
                                </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card >
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
            <Container fluid style={{ marginTop: '95px', minHeight: '70vh', backgroundColor: '#F0F8FF' }}>
                <Row>
                    <Menu />
                    <Col xl={10} lg={9} md={12} sm={12}>
                        <Row>
                            <Col xl={9} lg={12} md={12} sm={12}>
                                <h4 style={{ marginTop: '30px', color: '#084298' }}>
                                    <b>Người theo dõi</b>
                                </h4>
                                <div className="box-people mt-3">
                                    <Row>
                                        {displayTodo}
                                    </Row>
                                </div>
                                <div className="list-page mt-5">
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

export default FollowAuthor
