import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { Button, Image, Row, Col, Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { loadTagsAll, tagsAllSelector } from "../../reducers/Tags/tags"
import ModalTag from "../Modal/ModalTag"
import Footer from "../home/Footer"
import Header from "../home/Header"
import MenuAdmin from "../home/MenuAdmin"
import { userSelector } from "../../reducers/User/loginForm"

const Tags = () => {
    const dispatch = useDispatch()
    const tags = useSelector(tagsAllSelector)
    const user = useSelector(userSelector)

    const [modal, setModal] = useState(false)
    const [updateTag, setUpdateTag] = useState({
        id_tag: 0,
        name: "",
        logo: "",
    })

    const [pageNumber, setPageNumber] = useState(0)
    const todoPerPage = 5
    const pagesVisited = pageNumber * todoPerPage

    useEffect(() => {
        dispatch(loadTagsAll())
    }, [dispatch])

    const updateTagId = (id_tag, name, logo) => {
        setUpdateTag({ id_tag, name, logo })
        setModal(true)
    }

    const pageCount = Math.ceil(tags.length / todoPerPage)
    const displayTodo = tags
        .slice(pagesVisited, pagesVisited + todoPerPage)
        .map((tag, index) => {
            return (
                <tr key={tag.id_tag}>
                    <td>{tag.id_tag}</td>
                    <td>{tag.name}</td>
                    <td>
                        <Image
                            src={tag.logo}
                            style={{ width: "4rem", height: "4rem" }}
                        />
                    </td>
                    <td
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        <button
                            className="btn btn-sm btn-primary"
                            style={{ margin: "21px" }}
                            onClick={() =>
                                updateTagId(tag.id_tag, tag.name, tag.logo)
                            }
                        >
                            <i className="fas fa-edit"></i>
                        </button>
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
                                    <Button
                                        variant="outline-success"
                                        onClick={() => setModal(true)}
                                    >
                                        Thêm thẻ
                                    </Button>
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Tên thẻ</th>
                                                    <th scope="col">Logo</th>
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
            <ModalTag modal={modal} setModal={setModal} updateTag={updateTag} />
        </>
    )
}

export default Tags
