import React, { useEffect } from "react"
import "../.././App.css"
import { useDispatch, useSelector } from "react-redux"
import { loadUser, userSelector } from "../../reducers/User/loginForm"
import Footer from "./Footer"
import Header from "./Header"
import {
    Card,
    Button,
    Container,
    Row,
    Col,
    Image,
    ListGroup,
} from "react-bootstrap"
import { Link } from "react-router-dom"
import {
    fetchPostAccessStatus,
    postsSelector,
} from "../../reducers/Posts/posts"

const Page = () => {
    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const posts = useSelector(postsSelector)

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchPostAccessStatus())
    }, [dispatch])

    console.log(posts)
    return (
        <div className="App">
            <Header real_name={user.real_name} id_role={user.id_role} />
            <Container fluid>
                <Row>
                    <Col md={10}>
                        <Row>
                            <Col sm={8}>
                                <Row>
                                    <Col md={1}></Col>
                                    <Col sm={10}>
                                        {posts.map((post, index) => (
                                            <Card
                                                className="bg-light post-of-markbook"
                                                style={{ flexDirection: "row" }}
                                                key={index}
                                            >
                                                <Link to="#">
                                                    <Image
                                                        src="https://lh3.googleusercontent.com/proxy/BA1SR_ZzamvLyqLqnXo4PwIyU8Moo2ZI3zY7H60Se8MIkuKiCHYhMwW3YI6CxQCBW9EaDo3DpQYMSP3MIOBDrNxf1NOXBqQfeAQqlxYp4A"
                                                        roundedCircle
                                                        style={{
                                                            width: "4rem",
                                                            height: "4rem",
                                                            margin: "15px 5px",
                                                        }}
                                                    />
                                                </Link>
                                                <Card.Body>
                                                    <span>
                                                        <Link
                                                            to="#"
                                                            style={{
                                                                color: "#5488c7",
                                                                fontSize:
                                                                    "14px",
                                                            }}
                                                        >
                                                            ten nguoi dung
                                                        </Link>
                                                        &ensp;
                                                        <i>ngày tháng năm</i>
                                                    </span>
                                                    <Card.Title>
                                                        <Link to="#">
                                                            Cấu trúc dữ liệu và
                                                            giải thuật: Danh
                                                            sách liên kết đơn
                                                        </Link>
                                                    </Card.Title>
                                                    <ListGroup horizontal>
                                                        <ListGroup.Item
                                                            as={Link}
                                                            action
                                                            to="#link1"
                                                        >
                                                            css
                                                        </ListGroup.Item>
                                                        <ListGroup.Item
                                                            as={Link}
                                                            action
                                                            to="#link2"
                                                        >
                                                            html
                                                        </ListGroup.Item>
                                                        <ListGroup.Item
                                                            as={Link}
                                                            action
                                                            to="#link2"
                                                        >
                                                            javascript
                                                        </ListGroup.Item>
                                                        <ListGroup.Item
                                                            as={Link}
                                                            action
                                                            to="#link2"
                                                        >
                                                            php
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                    <Card.Text>
                                                        Some quick example text
                                                        to build on the card
                                                        title and make up the
                                                        bulk of the card's
                                                        content.
                                                    </Card.Text>
                                                    <div className="footer-card">
                                                        <Button variant="none">
                                                            <i className="fas fa-eye">
                                                                200
                                                            </i>
                                                        </Button>
                                                        <Button variant="none">
                                                            <i className="fas fa-bookmark">
                                                                40
                                                            </i>
                                                        </Button>
                                                        <Button variant="none">
                                                            <i className="fas fa-comments">
                                                                80
                                                            </i>
                                                        </Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </Col>
                                    <Col md={1}></Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default Page
