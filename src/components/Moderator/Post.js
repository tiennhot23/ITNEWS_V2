import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { Row, Col, Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
    changeStatus,
    changeStatusPostSelector,
    fetchPostStatus,
} from "../../reducers/Posts/changeStatusPost"
import { loadUser, userSelector } from "../../reducers/User/loginForm"
import { Link } from "react-router-dom"
import Footer from "../home/Footer"
import Header from "../home/Header"
import MenuAdmin from "../home/MenuAdmin"
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const Post = () => {
    const dispatch = useDispatch()
    const posts = useSelector(changeStatusPostSelector)
    const user = useSelector(userSelector)

    const [pageNumber, setPageNumber] = useState(0)
    const todoPerPage = 10
    const pagesVisited = pageNumber * todoPerPage

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchPostStatus())
    }, [dispatch])

    const changeStatusPost1 = (id_post) => {
        const data = {
            id_post,
            status: 1,
        }
        dispatch(changeStatus(data))
    }
    const changeStatusPost2 = (id_post) => {
        const data = {
            id_post,
            status: 2,
        }
        dispatch(changeStatus(data))
    }

    const pageCount = Math.ceil(posts.length / todoPerPage)
    const displayTodo = posts
        .slice(pagesVisited, pagesVisited + todoPerPage)
        .map((post, index) => {
            return (
                <tr key={index}>
                    <td>{post.post.id_post}</td>
                    <td>
                        <Link
                            to={`/p/post/${post.post.id_post}`}
                            style={{
                                textDecoration: "none",
                                color: "black",
                                display: "inline",
                            }}
                        >
                            {post.post.title}
                        </Link>
                    </td>
                    <td>{post.author.real_name}</td>
                    <td className="text-right">{post.post.day_created}</td>
                    <td
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        <OverlayTrigger
                            delay={{ hide: 100, show: 100 }}
                            overlay={(props) => (
                                <Tooltip {...props}>
                                    Duyệt
                                </Tooltip>
                            )}
                            placement="bottom"
                        ><button
                            className="btn btn-sm btn-success"
                            style={{
                                margin: "5px",
                            }}
                            onClick={() => changeStatusPost1(post.post.id_post)}
                        >
                                <i className="fas fa-unlock-alt" />
                            </button>
                        </OverlayTrigger>

                        <OverlayTrigger
                            delay={{ hide: 100, show: 100 }}
                            overlay={(props) => (
                                <Tooltip {...props}>
                                    Spam
                                </Tooltip>
                            )}
                            placement="bottom"
                        ><button
                            className="btn btn-sm btn-danger"
                            style={{
                                margin: "5px",
                            }}
                            onClick={() => changeStatusPost2(post.post.id_post)}
                        >
                                <i className="fas fa-lock" />
                            </button>
                        </OverlayTrigger>
                    </td>
                </tr>
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
            <Container fluid style={{ marginTop: '95px', minHeight: '72vh', backgroundColor: '#F0F8FF' }}>
                <Row>
                    <MenuAdmin />
                    <Col xl={10} lg={9} md={12} sm={12} style={{ backgroundColor: '#F0F8FF' }}>
                        <Row>
                            <Col xl={12} lg={12} md={12} sm={12}>
                                <div
                                    className="box-manager"
                                    style={{
                                        marginTop: "25px",
                                        marginBottom: "25px",
                                    }}
                                >
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">
                                                        ID bài viết
                                                    </th>
                                                    <th scope="col">Tiêu đề</th>
                                                    <th scope="col">Tác giả</th>
                                                    <th
                                                        scope="col"
                                                        className="text-right"
                                                    >
                                                        Ngày tạo
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="text-center"
                                                    >
                                                        Hành động
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>{displayTodo}</tbody>
                                        </table>
                                    </div>
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
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Post
