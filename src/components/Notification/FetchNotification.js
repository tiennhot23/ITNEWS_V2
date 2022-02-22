import React, { useEffect } from "react"
import Footer from "../home/Footer"
import Header from "../home/Header"
import { Container, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
    notificationSelector,
    readNotification,
} from "../../reducers/Notification/notification"
import { Link } from "react-router-dom"
import { loadUser, userSelector } from "../../reducers/User/loginForm"

const FetchNotification = () => {
    const dispatch = useDispatch()
    const notification = useSelector(notificationSelector)
    const user = useSelector(userSelector)

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])
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
                        <h5><b>Thông báo mới</b></h5>
                        {notification.slice(0, 1).map((notify) => (
                            <div
                                key={notify.id_notification}
                                style={{
                                    width: "100%",
                                    padding: "0.25rem",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    margin: "10px 0 20px",
                                    background: "#f4f4f5",
                                }}
                            >
                                <Link
                                    to={`/notifications/${notify.id_notification}`}
                                    style={{
                                        fontSize: "14px",
                                        textDecoration: "none",
                                        color: "black",
                                        display: "inline",
                                    }}
                                >
                                    {notify.content}
                                </Link>
                                <i
                                    onClick={() =>
                                        seeNotification(notify.id_notification)
                                    }
                                    style={{
                                        float: "right",
                                        lineHeight: "24px",
                                    }}
                                    className="fas fa-eye"
                                ></i>
                            </div>
                        ))}
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <h5 style={{ display: "inline", width: "auto" }}>
                                <b>Thông Báo</b>
                            </h5>
                        </div>
                        {notification
                            .slice(1, notification.length)
                            .map((notify) => (
                                <div
                                    key={notify.id_notification}
                                    style={{
                                        width: "100%",
                                        padding: "0.25rem",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        margin: "10px 0 20px",
                                        background: "#f4f4f5",
                                    }}
                                >
                                    <Link
                                        to={`/notifications/${notify.id_notification}`}
                                        style={{
                                            fontSize: "14px",
                                            textDecoration: "none",
                                            color: "black",
                                            display: "inline",
                                        }}
                                    >
                                        {notify.content}
                                    </Link>
                                    <i
                                        onClick={() =>
                                            seeNotification(
                                                notify.id_notification
                                            )
                                        }
                                        style={{
                                            float: "right",
                                            lineHeight: "24px",
                                        }}
                                        className="fas fa-eye"
                                    ></i>
                                </div>
                            ))}
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default FetchNotification
