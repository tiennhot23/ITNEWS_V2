import React, { useEffect, useState } from "react"
import Menu from ".././home/Menu"
import Header from ".././home/Header"
import Footer from ".././home/Footer"
import { Card, Button, Image, Container, Row, Col } from "react-bootstrap"
import ReactPaginate from "react-paginate"
import { useDispatch, useSelector } from "react-redux"
import { loadUser, userSelector } from "../../reducers/User/loginForm"
import { Link } from "react-router-dom"
import {
    fetchFollowTags,
    followTagsSelect,
    deleteFollowTag,
    followTag,
} from "../../reducers/User/followTags"
import { findTag } from "../../utils/callerAPI"
import InformationPost from "../Posts/InformationPost"

const FollowTags = () => {
    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const tags = useSelector(followTagsSelect)

    const [pageNumber, setPageNumber] = useState(0)
    const todoPerPage = 9
    const pagesVisited = pageNumber * todoPerPage

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchFollowTags(user.id_account))
    }, [dispatch, user])

    const pageCount = Math.ceil(tags.length / todoPerPage)
    const displayTodo = tags
        .slice(pagesVisited, pagesVisited + todoPerPage)
        .map((tag, index) => {
            return (
                <Col xl={3} lg={4} md={4} sm={6} key={index}>
                    <Card
                        key={index}
                        style={{
                            flexDirection: "row",
                            // width: "28%",
                            border: "0",
                            // padding: "0",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            src={tag.logo}
                            style={{ width: "6rem", height: "6rem" }}
                        />
                        <Card.Body style={{ padding: "0", margin: "10px" }}>
                            <Card.Title
                                as={Link}
                                to={`/tags/${tag.id_tag}`}
                                style={{ textDecoration: "none" }}
                            >
                                {tag.name}
                            </Card.Title>
                            <Card.Text
                                className="d-flex"
                                style={{ flexDirection: "column" }}
                            >
                                <span>
                                    <b>{tag.total_post}</b> bài viết
                                </span>

                                <span>
                                    <b>{tag.total_follower}</b> người theo dõi
                                </span>
                                <Button
                                    variant="info"
                                    onClick={() => changeFollow(tag.id_tag)}
                                >
                                    <i className="fas fa-rss-square">
                                        &nbsp;
                                        {tag.status === true
                                            ? "Đang theo dõi"
                                            : "Theo dõi"}
                                    </i>
                                </Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            )
        })

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    const changeFollow = async (id_tag) => {
        try {
            const find = await findTag(id_tag, user.id_account)
            if (find.status === 200 && find.data.status === true) {
                dispatch(deleteFollowTag(id_tag))
            } else {
                dispatch(followTag(id_tag))
            }
        } catch (error) {
            console.log(error)
        }
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
                                    <b>Thẻ theo dõi</b>
                                </h4>
                                <div className="box-people">
                                    <Row>
                                        {displayTodo}
                                    </Row>
                                </div>
                                {
                                    tags.length > 0 ? (
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

export default FollowTags
