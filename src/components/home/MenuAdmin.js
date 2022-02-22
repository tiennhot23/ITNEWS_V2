import React, { useEffect } from "react"
import { Col, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loadUser } from "../../reducers/User/loginForm"
import itNewsIcon from "../.././assets/logo.png"

const MenuAdmin = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    return (
        <>
            <Col xl={2} lg={3} md={0} sm={0} className="category">
                <div className='nav'>
                    <nav className='nav_pc flex-column flex-shrink-0 text-white bg-white'>
                        <h2 className="my-4 title_DM" style={{ color: '#084298' }} ><b>Danh mục</b></h2>
                        <ul className='nav_list nav nav-pills flex-column mb-auto'>
                            <li class="nav-item">
                                <Link to="/" className="nav-link text-dark" >
                                    <span className='bi me-3'>
                                        <i className="fas fa-home"></i>
                                    </span>
                                    Trang chủ
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/moderator/users" className="nav-link text-dark" >
                                    <span className='bi me-3'>
                                        <i className="fas fa-heart"></i>
                                    </span>
                                    Quản lý tài khoản
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/moderator/tags" className="nav-link text-dark" >
                                    <span className='bi me-3'>
                                        <i className="fas fa-heart"></i>
                                    </span>
                                    Quản lý thẻ
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/moderator/posts" className="nav-link text-dark" >
                                    <span className='bi me-3'>
                                        <i className="fas fa-heart"></i>
                                    </span>
                                    Quản lý bài viết
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/moderator/feedback" className="nav-link text-dark" >
                                    <span className='bi me-3'>
                                        <i className="fas fa-heart"></i>
                                    </span>
                                    Quản lý phản hồi
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <input type='checkbox' hidden name='' id='nav-mobile-input' className='nav_input'></input>
                <label for='nav-mobile-input' className='nav_overplay'></label>


                <nav className='nav_mobile d-flex flex-column flex-shrink-0 p-3 text-white'>
                    <a href="/" className="d-flex align-items-center mb-1 mb-md-0 me-md-auto text-decoration-none">
                        {/* <svg class="bi me-2" width="40" height="32"></svg> */}
                        <Image src={itNewsIcon} style={{ width: '50px', height: '50px' }} className='title me-3' />
                        <span className="fs-4 text-dark">Danh mục</span>
                    </a>
                    <label for='nav-mobile-input' className="fas fa-times nav_bar-close"></label>
                    <hr />
                    <ul className='nav_mobile-list nav nav-pills flex-column mb-auto'>
                        <li class="nav-item">
                            <Link to="/" className="nav-link text-dark" >
                                <span className='bi me-3'>
                                    <i className="fas fa-home"></i>
                                </span>
                                Trang chủ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/moderator/users" className="nav-link text-dark" >
                                <span className='bi me-3'>
                                    <i className="fas fa-heart"></i>
                                </span>
                                Quản lý tài khoản
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/moderator/tags" className="nav-link text-dark" >
                                <span className='bi me-3'>
                                    <i className="fas fa-heart"></i>
                                </span>
                                Quản lý thẻ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/moderator/posts" className="nav-link text-dark" >
                                <span className='bi me-3'>
                                    <i className="fas fa-heart"></i>
                                </span>
                                Quản lý bài viết
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/moderator/feedback" className="nav-link text-dark" >
                                <span className='bi me-3'>
                                    <i className="fas fa-heart"></i>
                                </span>
                                Quản lý phản hồi
                            </Link>
                        </li>
                    </ul>
                    {/* <hr />
                        <div class="dropdown">
                            <a href="/" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2" />
                                <strong>mdo</strong>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                                <li><a class="dropdown-item" href="/">New project...</a></li>
                                <li><a class="dropdown-item" href="/">Settings</a></li>
                                <li><a class="dropdown-item" href="/">Profile</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="/">Sign out</a></li>
                            </ul>
                        </div> */}
                </nav>
                {/* <h2 className="my-4">Danh mục</h2>
                    <ListGroup>
                        <ListGroup.Item action as={Link} to={`/moderator/users`}>
                            <i className="fas fa-heart"> Quản lý tài khoản</i>
                        </ListGroup.Item>
                        <ListGroup.Item action as={Link} to={`/moderator/tags`}>
                            <i className="fas fa-heart"> Quản lý thẻ</i>
                        </ListGroup.Item>
                        <ListGroup.Item action as={Link} to={`/moderator/posts`}>
                            <i className="fas fa-heart"> Quản lý bài viết</i>
                        </ListGroup.Item>
                        <ListGroup.Item action as={Link} to={`/moderator/feedback`}>
                            <i className="fas fa-heart"> Quản lý phản hồi</i>
                        </ListGroup.Item>
                    </ListGroup> */}
            </Col>
        </>
    )
}

export default MenuAdmin
