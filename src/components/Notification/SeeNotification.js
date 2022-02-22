import React, { useEffect } from "react"
import Footer from "../home/Footer"
import Header from "../home/Header"
import { Container, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
    getNotification,
    notifySelector,
    readNotification,
} from "../../reducers/Notification/notification"
import { useParams } from "react-router-dom"
import { loadUser, userSelector } from "../../reducers/User/loginForm"
import { Link } from "react-router-dom"

const SeeNotification = () => {
    const dispatch = useDispatch()
    const { id_notification } = useParams()
    const notification = useSelector(notifySelector)

    const user = useSelector(userSelector)

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    useEffect(() => {
        dispatch(getNotification(id_notification))
    }, [dispatch, id_notification])

    const seeNotification = (id_notification) => {
        dispatch(readNotification(id_notification))
    }
    return (
        <div style={{ marginTop: '100px', minHeight: '70vh', backgroundColor: '#F0F8FF' }}>
            <Header real_name={user.real_name}
                id_role={user.id_role}
                gender={user.gender}
                company={user.company}
                phone={user.phone}
                avatar={user.avatar}
                birth={user.birth} />
            <Container style={{ minHeight: '70vh' }}>
                <Row style={{ margin: "20px" }}>
                    <Col md={12}>
                        <h5><b>Chi tiết thông báo</b></h5>
                        <div
                            style={{
                                width: "100%",
                                padding: "0.25rem",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                margin: "10px 0 20px",
                                background: "#f4f4f5",
                            }}
                        >
                            {(notification.link && notification.link.includes('post')) ? <Link to={`/p${notification.link}`}>
                                <i style={{ fontSize: "14px" }}>
                                    {notification.content}
                                </i>
                            </Link> : <i style={{ fontSize: "14px" }}>
                                {notification.content}
                            </i>}

                            <i
                                onClick={() =>
                                    seeNotification(
                                        notification.id_notification
                                    )
                                }
                                style={{ float: "right", lineHeight: "24px" }}
                                className="fas fa-eye"
                            ></i>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default SeeNotification
