import React from "react"
import { Container, Row, Col, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
const Footer = () => {
    return (
        <>
            <Container fluid className="bg-primary">
                <Row style={{textAlign: 'center'}}>
                    <Col md={4}>
                        <h5>TÀI NGUYÊN</h5>
                        <ListGroup className="a">
                            <ListGroup.Item
                                action
                                variant="primary"
                                as={Link}
                                to="/newest"
                            >
                                Bài viết
                            </ListGroup.Item>
                            {/* <ListGroup.Item action variant="primary" href="#link2">
                                Tổ chức
                            </ListGroup.Item>
                            <ListGroup.Item action variant="primary" href="#link2">
                                Câu hỏi
                            </ListGroup.Item> */}
                            <ListGroup.Item
                                action
                                variant="primary"
                                as={Link}
                                to="/tags"
                            >
                                Thẻ
                            </ListGroup.Item>
                            {/* <ListGroup.Item action variant="primary" href="#link2">
                                Videos
                            </ListGroup.Item> */}
                            <ListGroup.Item
                                action
                                variant="primary"
                                as={Link}
                                to="/authors"
                            >
                                Tác giả
                            </ListGroup.Item>
                            {/* <ListGroup.Item action variant="primary" href="#link2">
                                Thảo luận
                            </ListGroup.Item> */}
                            {/* <ListGroup.Item action variant="primary" href="#link2">
                                Đề xuất hệ thống
                            </ListGroup.Item>
                            <ListGroup.Item action variant="primary" href="#link2">
                                Công cụ
                            </ListGroup.Item>
                            <ListGroup.Item action variant="primary" href="#link2">
                                Machine Learning
                            </ListGroup.Item>
                            <ListGroup.Item action variant="primary" href="#link2">
                                Trạng thái hệ thống
                            </ListGroup.Item> */}
                        </ListGroup>
                    </Col>

                    <Col md={4}>
                        <h5>DỊCH VỤ</h5>
                        {/* <ListGroup >
                            <ListGroup.Item action variant="primary" href="#link1">
                                IT Corp Code
                            </ListGroup.Item>
                            <ListGroup.Item action variant="primary" href="#link2">
                                IT Corp CVV@iblo CV
                            </ListGroup.Item>
                            <ListGroup.Item action variant="primary" href="#link2">
                                IT Corp CTF
                            </ListGroup.Item>
                            <ListGroup.Item action variant="primary" href="#link2">
                                IT Corp Learning
                            </ListGroup.Item>
                        </ListGroup> */}
                    </Col>

                    <Col md={4}>
                        <h5>LIÊN KẾT</h5>
                        <ListGroup>
                            <ListGroup.Item
                                action
                                variant="primary"
                                href="https://fb.com/vinhvip.it"
                            >
                                <i className="icon-of-footer fab fa-facebook-square"></i>
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                variant="primary"
                                href="https://github.com/vinhvip"
                            >
                                <i className="icon-of-footer fab fa-github-square"></i>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                        <hr style={{backgroundColor: 'white'}}/>
                <Row style={{textAlign: 'center'}}>
                    {/* <Col></Col> */}
                    <Col>
                        <ListGroup horizontal>
                            <ListGroup.Item
                                action
                                variant="primary"
                                href="#link1"
                            >
                                Về chúng tôi
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                variant="primary"
                                href="#link2"
                            >
                                Phản hồi
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                variant="primary"
                                href="#link2"
                            >
                                Giúp đỡ
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                variant="primary"
                                href="#link2"
                            >
                                Điều khoản
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    {/* <Col></Col> */}
                </Row>
                <hr style={{height: '0px', marginBottom: "0px"}}/>
            </Container>
        </>
    )
}

export default Footer
