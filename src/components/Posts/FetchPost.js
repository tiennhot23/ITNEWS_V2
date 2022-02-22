import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { Row, Card, Button, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
    fetchPostAccessStatus,
    postsSelector,
} from "../../reducers/Posts/posts"
import { Link } from "react-router-dom"
import { setShow } from "../../reducers/Comment/comment"

const FetchPost = () => {
    const posts = useSelector(postsSelector)
    const dispatch = useDispatch()
    const [pageNumber, setPageNumber] = useState(0)
    const todoPerPage = 9
    const pagesVisited = pageNumber * todoPerPage

    useEffect(() => {
        dispatch(fetchPostAccessStatus())
    }, [dispatch])

    const pageCount = Math.ceil(posts.length / todoPerPage)
    const displayTodo = posts
        .slice(pagesVisited, pagesVisited + todoPerPage)
        .map((post, index) => {
            return (
                <Col lg={4} md={6} key={index}>
                    <Card className="bg-light short-post" >
                        <Card.Body>
                            <Card.Title>
                                <Link
                                    to={`/p/post/${post.post.id_post}`}
                                    onClick={() => { window.scroll(0, 0, "smooth"); dispatch(setShow()) }}

                                >
                                    {post.post.title}
                                </Link>
                            </Card.Title>
                            <Card.Text>
                                {post.post.content.substring(0, 100) + "..."}
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
                </Col>
            )
        })

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    return (
        <>
            <Row style={{ backgroundColor: '#F0F8FF' }} >
                <div className="list-page ">
                    <h4 className="title-post">Có thể bạn bỏ lỡ?</h4>
                </div>
                {displayTodo}
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
            </Row>
        </>
    )
}

export default FetchPost
