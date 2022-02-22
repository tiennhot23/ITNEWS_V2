import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { Row, Col, Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { loadUser, userSelector } from "../../reducers/User/loginForm"
// import { permanentUnlock, limitedTimeUnlock } from "../../utils/callerAPI"
import Footer from "../home/Footer"
import Header from "../home/Header"
import MenuAdmin from "../home/MenuAdmin"
import {
    deleteFeedback,
    fetchFeed,
    fetchFeedbackSelector,
} from "../../reducers/Feedback/fetchFeedback"
import ModalFeedback from "../Modal/ModalFeedback"

const FetchFeedback = () => {
    const dispatch = useDispatch()
    const feedback = useSelector(fetchFeedbackSelector)
    const user = useSelector(userSelector)

    const [modal, setModal] = useState(false)
    const [getFeedback, setGetFeedback] = useState({
        id_feedback: 0,
        id_account: 0,
        account_name: "",
        subject: "",
        content: "",
        day: "",
        real_name: "",
        email: " ",
    })

    const [pageNumber, setPageNumber] = useState(0)
    const todoPerPage = 10
    const pagesVisited = pageNumber * todoPerPage

    useEffect(() => {
        dispatch(loadUser())
        dispatch(fetchFeed())
    }, [dispatch])

    const seeFeedback = (
        id_feedback,
        id_account,
        account_name,
        subject,
        content,
        day,
        real_name,
        email
    ) => {
        setModal(true)
        setGetFeedback({
            id_feedback,
            id_account,
            account_name,
            subject,
            content,
            day,
            real_name,
            email,
        })
    }
    const deleteFeed = async (id_feedback) => {
        dispatch(deleteFeedback(id_feedback))
    }

    const pageCount = Math.ceil(feedback.length / todoPerPage)
    const displayTodo = feedback
        .slice(pagesVisited, pagesVisited + todoPerPage)
        .map((feedback, index) => {
            return (
                <tr key={feedback.id_feedback}>
                    <td>{feedback.id_feedback}</td>
                    <td>{feedback.subject}</td>
                    <td>
                        {feedback.content.length < 50
                            ? feedback.content
                            : feedback.content.substring(0, 50) + " ..."}
                    </td>
                    <td>{feedback.day}</td>
                    <td>{feedback.id_account}</td>
                    <td>{feedback.real_name}</td>
                    <td>{feedback.email}</td>
                    <td
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        <button
                            className="btn btn-sm btn-success"
                            style={{
                                margin: "5px",
                            }}
                            onClick={() =>
                                seeFeedback(
                                    feedback.id_feedback,
                                    feedback.id_account,
                                    feedback.account_name,
                                    feedback.subject,
                                    feedback.content,
                                    feedback.day,
                                    feedback.real_name,
                                    feedback.email
                                )
                            }
                        >
                            <i className="fas fa-eye" />
                        </button>
                        <button
                            className="btn btn-sm btn-danger"
                            style={{
                                margin: "5px",
                            }}
                            onClick={() => deleteFeed(feedback.id_feedback)}
                        >
                            <i className="fas fa-trash-alt" />
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
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Tiêu đề</th>
                                                    <th scope="col">
                                                        Nội dung
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="text-right"
                                                    >
                                                        Thời gian
                                                    </th>
                                                    <th scope="col">Tên</th>
                                                    <th scope="col">
                                                        ID Người dùng
                                                    </th>
                                                    <th scope="col">Email</th>
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
                                {feedback.length === 0 ? (
                                    <></>
                                ) : (
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
                                )}
                                <br />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />
            <ModalFeedback
                modal={modal}
                setModal={setModal}
                readFeedback={getFeedback}
            />
        </>
    )
}

export default FetchFeedback
