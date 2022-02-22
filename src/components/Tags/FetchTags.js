import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { Card, Button, Image, Row, Col, Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
    loadTags,
    tagsSelector,
    followTagALL,
    deleteFollowTagALL,
} from "../../reducers/Tags/tags"
import { loadUser, userSelector } from "../../reducers/User/loginForm"
import { findTag } from "../../utils/callerAPI"
import { Link } from "react-router-dom"
import Header from "../home/Header"
import Footer from "../home/Footer"

const FetchTags = () => {
    const tags = useSelector(tagsSelector)
    const dispatch = useDispatch()
    const user = useSelector(userSelector)

    const [pageNumber, setPageNumber] = useState(0)
    const todoPerPage = 12
    const pagesVisited = pageNumber * todoPerPage

    useEffect(() => {
        dispatch(loadUser())
        dispatch(loadTags(user.id_account))
        // dispatch(fetchFollowTags(4))
    }, [dispatch, user.id_account])

    const changeFollow = async (id_tag) => {
        try {
            const find = await findTag(id_tag, user.id_account)
            if (find.status === 200 && find.data.status === true) {
                dispatch(deleteFollowTagALL(id_tag))
            } else {
                dispatch(followTagALL(id_tag))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const pageCount = Math.ceil(tags.length / todoPerPage)
    const displayTodo = tags
        .slice(pagesVisited, pagesVisited + todoPerPage)
        .map((tag, index) => {
            return (
                <Col xl={3} lg={4} md={4} sm={6}>
                    <Card
                        key={index}
                        style={{
                            flexDirection: "row",
                            // width: "20%",
                            border: "0",
                            // padding: "3% 13.5%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Link to={`tags/${tag.id_tag}`}>
                            <Image
                                src={tag.logo}
                                style={{ width: "6rem", height: "6rem" }}
                            />
                        </Link>
                        <Card.Body style={{ padding: "0", margin: "15px" }}>
                            <Card.Title
                                as={Link}
                                to={`tags/${tag.id_tag}`}
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
                                        {tag.status === true
                                            ? " Đang theo dõi"
                                            : " Theo dõi"}
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
                    <Col xl={2}>
                        <h4 style={{ color: '#146ebe', textAlign: 'center', position: 'fixed', zIndex: '2' }}>
                            <Link to='/'><span style={{ float: 'left', color: '#146ebe' }}><i class="fas fa-reply-all fa-2x"></i></span></Link>
                        </h4>
                    </Col>
                    <Col xl={8} lg={12} md={12} sm={12}>
                        <h3 style={{ marginTop: '30px', color: '#084298', textAlign: 'center', marginBottom: '20px' }}>
                            <b>Tất cả thẻ</b>
                        </h3>
                        <div className="box-people">
                            <Row>
                                {displayTodo}
                            </Row>
                        </div>

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
                    <Col xl={2}></Col>
                </Row>
            </Container>

            <Footer />
        </>
    )
}

export default FetchTags
