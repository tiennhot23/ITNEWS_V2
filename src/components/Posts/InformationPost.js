import React, { useEffect } from "react"
import { Col, ListGroup, Row } from "react-bootstrap"
// import img1 from "../.././assets/info-1.jpg"
// import img2 from "../.././assets/home/img2.png"
// import img3 from "../.././assets/home/img3.png"
// import img4 from "../.././assets/home/img4.png"
// import img5 from "../.././assets/home/img5.png"
// import img6 from '../.././assets/y.jpg'
import { useDispatch, useSelector } from "react-redux"
import { loadUser, userSelector } from "../../reducers/User/loginForm"
import { Link } from "react-router-dom"

const InformationPost = () => {
    const dispatch = useDispatch()
    const user = useSelector(userSelector)

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])


    return (
        <>
            <Col
                xl={3}
                lg={12}
                md={12}
                sm={12}
                style={{ backgroundColor: "#F0F8FF" }}
            >
                <h2 className="title-information" style={{ color: '#084298' }}><b>Thông tin cá nhân</b></h2>
                <ListGroup className="info-posts">
                    <Row>
                        <Col xl={12} lg={6} md={6}>
                            <ListGroup.Item action
                                as={Link}
                                to={`/authors/${user.id_account}`}
                            >
                                <div className="d-flex align-items-center">
                                    {/* <img src={img1} alt="img1" /> */}
                                    <span className="info-title" style={{ color: '#146ebe' }}><i className="fas fa-edit fa-3x"></i></span>
                                    &nbsp;
                                    <div>
                                        <h6>Số bài viết</h6>
                                        <p>{user.total_post}</p>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        </Col>
                        <Col xl={12} lg={6} md={6}>
                            <ListGroup.Item action as={Link}
                                to={`/authors/${user.id_account}`}
                            >
                                <div className="d-flex align-items-center">
                                    {/* <img src={img1} alt="img1" /> */}
                                    <span className="info-title" style={{ color: '#146ebe' }}><i className="fas fa-eye fa-3x"></i></span>
                                    &nbsp;
                                    <div>
                                        <h6>Tổng số lượt xem</h6>
                                        <p>{user.total_view}</p>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        </Col>
                        <Col xl={12} lg={6} md={6}>
                            <ListGroup.Item action
                                as={Link}
                                to={`/authors/${user.id_account}`}
                            >
                                <div className="d-flex align-items-center">
                                    {/* <img src={img2} alt="img2" /> */}
                                    <span className="info-title" style={{ color: '#146ebe' }}><i className="far fa-grin-hearts fa-3x"></i></span>
                                    &nbsp;
                                    <div>
                                        <h6>Reputations</h6>
                                        <p>
                                            {user.total_vote_up
                                                ? user.total_vote_up -
                                                user.total_vote_down
                                                : user.total_vote_up}
                                        </p>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        </Col>
                        <Col xl={12} lg={6} md={6}>
                            <ListGroup.Item action
                                as={Link}
                                to={`/u/${user.real_name}/following-tags`}
                            >
                                <div className="d-flex align-items-center">
                                    {/* <img src={img3} alt="img3" /> */}
                                    <span className="info-title" style={{ color: '#146ebe' }}><i className="far fa-bookmark fa-3x"></i></span>
                                    &nbsp;
                                    <div>
                                        <h6>Các thẻ theo dõi</h6>
                                        <p>{user.total_tag_follow}</p>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        </Col>
                        <Col xl={12} lg={6} md={6}>
                            <ListGroup.Item action
                                as={Link}
                                to={`/u/${user.real_name}/following`}
                            >
                                <div className="d-flex align-items-center">
                                    {/* <img src={img4} alt="img4" /> */}
                                    <span className="info-title" style={{ color: '#146ebe' }}><i className="fas fa-rss-square fa-3x"></i></span>
                                    &nbsp;
                                    <div>
                                        <h6>Người theo dõi</h6>
                                        <p>{user.total_follower}</p>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        </Col>
                        <Col xl={12} lg={6} md={6}>
                            <ListGroup.Item action
                                as={Link}
                                to={`/u/${user.real_name}/followers`}
                            >
                                <div className="d-flex align-items-center">
                                    {/* <img src={img5} alt="img5" /> */}
                                    <span className="info-title" style={{ color: '#146ebe' }}><i className="fas fa-users fa-3x"></i></span>
                                    &nbsp;
                                    <div>
                                        <h6>Đang theo dõi</h6>
                                        <p>{user.total_following}</p>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        </Col>
                    </Row>
                </ListGroup>
            </Col>
        </>
    )
}

export default InformationPost
