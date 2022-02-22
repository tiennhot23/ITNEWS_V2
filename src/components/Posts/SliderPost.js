import React, { useEffect } from "react"
// import imgPosts from "../.././assets/img-posts.png"
// import Slider from "react-slick"
import { Col, Button, Carousel } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
    postNewestSelector,
    fetchPostNewest,
} from "../../reducers/User/fetchPost"
import { loadUser } from "../../reducers/User/loginForm"
import { setShow } from "../../reducers/Comment/comment"
// import imageSlider1 from '../.././assets/slider-4.jpg'
// import imageSlider from '../.././assets/b.jpg'
// import imageSlider3 from '../.././assets/slider-3.jpg'
// import imageSlider2 from '../.././assets/silder-6.jpg'
import imageSlider5 from '../.././assets/slider-5.jfif'

const SliderPost = () => {
    const dispatch = useDispatch()
    const postNewest = useSelector(postNewestSelector)
    const image = [imageSlider5, imageSlider5, imageSlider5, imageSlider5]

    useEffect(() => {
        dispatch(loadUser())
        dispatch(fetchPostNewest())
    }, [dispatch])

    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     speed: 2000,
    //     autoplaySpeed: 5000,
    //     cssEase: "linear",
    // }
    // const color = ["bg-info", "bg-secondary", "bg-success", "bg-primary"]

    const sliders = () => {
        return postNewest.map((post, index) => {
            // const randomColor = color[Math.floor(Math.random() * color.length)]
            // const choose = randomColor
            return (
                // <div className={`${choose} d-flex slider`} key={index} >
                //     <img src={imgPosts} alt="imgPosts" />
                //     <Card
                //         className={choose}
                //         style={{ width: "29rem", border: "0" }}
                //     >
                //         <Card.Body>
                //             <Card.Title>{post.post.title}</Card.Title>
                //             <Card.Text>
                //                 {post.post.content.length < 200
                //                     ? post.post.content
                //                     : post.post.content.substring(0, 200) +
                //                     " ..."}
                //             </Card.Text>
                //             <Button
                //                 variant="light"
                //                 as={Link}
                //                 to={`/p/post/${post.post.id_post}`}
                //                 onClick={() => dispatch(setShow())}
                //             >
                //                 See now
                //             </Button>
                //         </Card.Body>
                //     </Card>
                // </div>
                <Carousel.Item>
                    <img
                        className="d-block"
                        src={image[index]}
                        alt="First slide"
                        style={{ width: '100%', height: '450px' }}
                    />
                    <Carousel.Caption className="d-table-row mb-4">
                        <h3>{post.post.title}</h3>
                        <p>{post.post.content.length < 200
                            ? post.post.content
                            : post.post.content.substring(0, 200) +
                            " ..."}</p>
                        <Button
                            className="mt-2"
                            variant="success"
                            as={Link}
                            to={`/p/post/${post.post.id_post}`}
                            onClick={() => dispatch(setShow())}
                        >
                            See now
                        </Button>
                        <div style={{ marginTop: '92px' }}></div>
                    </Carousel.Caption>
                </Carousel.Item>
            )
        })
    }
    return (
        <>
            <Col xl={12} lg={12} sm={12} md={12} style={{ backgroundColor: '#F0F8FF' }}>
                <h5 style={{ marginTop: '30px', color: '#084298' }}><b>Xin chào!</b></h5>
                <h3 style={{ color: '#084298' }}>Bạn muốn tìm hiểu về gì hôm nay?</h3>
                <div style={{ margin: '30px 0' }}>
                    <Carousel>{sliders()}</Carousel>
                    {/* <Carousel style={{ backgroundColor: 'black' }}>
                        <Carousel.Item>
                            <img
                                className="d-block"
                                src={image[0]}
                                alt="First slide"
                                style={{ width: '100%', height: '450px' }}
                            />
                            <Carousel.Caption className="d-table-row">
                                <h3>Cấu trúc dữ liệu và giải thuật</h3>
                                <p style={{ textAlign: 'center' }}>Bài viết rất bổ ích đối với, foi voi abi baisf bsafsa busfs buasfhs osj</p>
                                <Button
                                    variant="light"
                                    as={Link}
                                    // to={`/p/post/${post.post.id_post}`}
                                    onClick={() => dispatch(setShow())}
                                >
                                    See now
                                </Button>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block"
                                src={imageSlider2}
                                alt="Second slide"
                                style={{ width: '100%', height: '450px' }}
                            />

                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block"
                                src={imageSlider3}
                                alt="Third slide"
                                style={{ width: '100%', height: '450px' }}
                            />

                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block"
                                src={imageSlider1}
                                alt="Third slide"
                                style={{ width: '100%', height: '450px' }}
                            />

                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel> */}
                </div>
            </Col>
        </>
    )
}

export default SliderPost
