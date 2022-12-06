import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { Button, Image, Row, Col, Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Footer from "../home/Footer"
import Header from "../home/Header"
import Menu from "../home/Menu"
import { userSelector } from "../../reducers/User/loginForm"
import ModalImageUser from "../Modal/ModalImageUser"

import {
    deleteImage,
    fetchImage,
    imageSelector,
} from "../../reducers/Image/image"

const ImageUser = () => {
    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const images = useSelector(imageSelector)

    const [modal, setModal] = useState(false)
    const [updateImage, setUpdateImage] = useState({
        id_image: 0,
    })

    const [pageNumber, setPageNumber] = useState(0)
    const todoPerPage = 5
    const pagesVisited = pageNumber * todoPerPage

    useEffect(() => {
        dispatch(fetchImage())
    }, [dispatch])

    const updateImageUser = (id_image) => {
        setUpdateImage({
            ...updateImage,
            id_image: id_image,
        })
        setModal(true)
    }
    const deleteImageUser = (id_image) => {
        dispatch(deleteImage(id_image))
    }

    const pageCount = Math.ceil(images.length / todoPerPage)
    const displayTodo = images
        .slice(pagesVisited, pagesVisited + todoPerPage)
        .map((image, index) => {
            return (
                <tr key={index}>
                    <td>
                        <Image
                            src={`http://localhost:8080/api/v2/image/${image.id_image}`}
                            style={{ width: "4rem", height: "4rem" }}
                        />
                    </td>
                    <td>
                        http://localhost:8080/api/v2/image/
                        {image.id_image}
                    </td>
                    <td
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <button
                            className="btn btn-sm btn-success"
                            style={{ margin: "21px" }}
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    `http://localhost:8080/api/v2/image/${image.id_image}`
                                )
                            }}
                        >
                            <i className="fas fa-copy"></i>
                        </button>
                        <button
                            className="btn btn-sm btn-primary"
                            style={{ margin: "21px" }}
                            onClick={() => updateImageUser(image.id_image)}
                        >
                            <i className="fas fa-edit"></i>
                        </button>
                        <button
                            className="btn btn-sm btn-danger"
                            style={{ margin: "21px" }}
                            onClick={() => deleteImageUser(image.id_image)}
                        >
                            <i className="fas fa-trash-alt"></i>
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
                    <Menu />
                    <Col xl={10} lg={9} md={12} sm={12} style={{ backgroundColor: '#F0F8FF' }}>
                        <Row>
                            <Col xl={12} lg={12} md={12} sm={12}>
                                <div
                                    className="col-12 box-manager"
                                    style={{
                                        marginTop: "25px",
                                        marginBottom: "25px",
                                    }}
                                >
                                    <Button
                                        variant="outline-success"
                                        onClick={() => setModal(true)}
                                    >
                                        Thêm ảnh
                                    </Button>
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Ảnh</th>
                                                    <th scope="col">Link</th>
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
            <ModalImageUser
                modal={modal}
                setModal={setModal}
                updateImg={updateImage}
            />
        </>
    )
}

export default ImageUser