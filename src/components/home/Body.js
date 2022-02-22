import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import Menu from "./Menu"
import SliderPost from "../Posts/SliderPost"
import InformationPost from "../Posts/InformationPost"
import FetchPost from "../Posts/FetchPost"

const Body = ({ real_name, id_role }) => {
    return (
        <>
            <Container fluid style={{ marginTop: '95px', minHeight: '85vh' }}>
                <Row>
                    <Menu real_name={real_name} id_role={id_role} />
                    <Col xl={10} lg={9} md={12} sm={12} style={{backgroundColor: '#F0F8FF'}}>
                        <Row>
                            <Col xl={9} lg={12} md={12} sm={12}>
                                <Row>
                                    {/* <Col sm={1} md={0}></Col> */}
                                    <SliderPost />
                                    {/* <Col sm={1} md={0}></Col> */}
                                </Row>
                            </Col>
                            <InformationPost />
                        </Row>
                        <FetchPost real_name={real_name}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Body
