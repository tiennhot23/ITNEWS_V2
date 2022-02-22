import React, { useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import Menu from "./Menu"
import InformationPost from "../Posts/InformationPost"
import FetchPost from "../Posts/FetchPost"
import ShowComment from "../Comment/ShowComment"
import WatchPost from "../Posts/WatchPost"
import { useSelector, useDispatch } from "react-redux"
import { showCommentSelector } from "../../reducers/Comment/comment"
import Footer from "./Footer"
import Header from "./Header"
import { loadUser, userSelector } from "../../reducers/User/loginForm"

const ArticleViewPage = () => {
    const showComment = useSelector(showCommentSelector)

    const dispatch = useDispatch()
    const user = useSelector(userSelector)

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    return (
        <>
            <Header real_name={user.real_name} id_role={user.id_role} gender={user.gender} company={user.company} phone={user.phone} avatar={user.avatar} birth={user.birth} />
            <Container fluid style={{ marginTop: '95px', minHeight: '85vh' }}>
                <Row>
                    <Menu real_name={user.real_name} id_role={user.id_role} />
                    <Col xl={10} lg={9} md={12} sm={12} style={{ backgroundColor: '#F0F8FF' }}>
                        <Row>
                            <Col xl={9} lg={12} md={12} sm={12}>
                                <Row>
                                    {/* <Col sm={1}></Col> */}
                                    <WatchPost />
                                    {/* <Col sm={1}></Col> */}
                                </Row>
                            </Col>
                            <InformationPost />
                        </Row>
                        {showComment === true ? <ShowComment /> : <></>}
                        <FetchPost real_name={user.real_name} />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default ArticleViewPage
