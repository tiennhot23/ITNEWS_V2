import React, { useEffect } from "react"
import { Col, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { loadUser, userSelector } from "../../reducers/User/loginForm"
import * as types from "../.././contains/types"
import itNewsIcon from "../.././assets/logo.png"

const Menu = ({ real_name, id_role }) => {
    const dispatch = useDispatch()
    const user = useSelector(userSelector)

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    return (
        <>
            {/* <Col md={2} className="category">
                <h2 className="my-4">Danh mục</h2>
                <ListGroup>
                    <ListGroup.Item action as={Link} to="/">
                        <i className="fas fa-home"> Trang chủ</i>
                    </ListGroup.Item>

                    {localStorage[types.LOCAL_STORAGE_TOKEN_NAME] ? (
                        <>
                            <ListGroup.Item
                                action
                                as={Link}
                                to={`/u/${user.real_name}/clips/posts`}
                            >
                                <i className="fas fa-bookmark"> Bookmark</i>
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                as={Link}
                                to={`/u/${user.real_name}/followers`}
                            >
                                <i className="fas fa-clipboard-list">
                                    {" "}
                                    Người theo dõi
                                </i>
                            </ListGroup.Item>s
                            <ListGroup.Item
                                action
                                as={Link}
                                to={{
                                    pathname: `/u/${user.real_name}/following`,
                                    state: {
                                        id_account: user.id_account,
                                    },
                                }}
                            >
                                <i className="fas fa-clipboard-list">
                                    {" "}
                                    Đang theo dõi
                                </i>
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                as={Link}
                                to={`/u/${user.real_name}/following-tags`}
                            >
                                <i className="fas fa-tags"> Thẻ theo dõi</i>
                            </ListGroup.Item>
                            <hr/>
                            <ListGroup.Item
                                action
                                as={Link}
                                to={`/u/${user.real_name}/post_0`}
                            >
                                <i className="fas fa-book">
                                    {" "}
                                    Bài viết riêng tư
                                </i>
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                as={Link}
                                to={`/u/${user.real_name}/post_1`}
                            >
                                <i className="fas fa-book">
                                    {" "}
                                    Bài viết công khai
                                </i>
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                as={Link}
                                to={`/u/${user.real_name}/post_2`}
                            >
                                <i className="fas fa-book">
                                    {" "}
                                    Bài viết ẩn liên kết
                                </i>
                            </ListGroup.Item>
                        </>
                    ) : (
                        <></>
                    )}
                </ListGroup>
            </Col> */}
            <Col xl={2} lg={3} md={0} sm={0} className="category">
                <div className='nav'>
                    <nav className='nav_pc flex-column flex-shrink-0 text-white bg-white'>
                        <h2 className="my-4 title_DM" style={{ color: '#084298' }} ><b>Danh mục</b></h2>
                        <ul className='nav_list nav nav-pills flex-column mb-auto'>
                            <li className="nav-item">
                                <Link to="/" className="nav-link text-dark" >
                                    <span className='bi me-3'>
                                        <i className="fas fa-home"></i>
                                    </span>
                                    Trang chủ
                                </Link>
                            </li>
                            {localStorage[types.LOCAL_STORAGE_TOKEN_NAME] ? (
                                <>
                                    <li className="nav-item">
                                        <Link to={`/u/${user.real_name}/clips/posts`} className="nav-link text-dark">
                                            <span className='bi me-3'>
                                                <i className="fas fa-bookmark"></i>
                                            </span>
                                            &nbsp;
                                            Bookmark
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`/u/${user.real_name}/followers`} className="nav-link text-dark">
                                            <span className='bi me-3'>
                                                <i className="fas fa-clipboard-list"></i>
                                            </span>
                                            &nbsp;
                                            Người theo dõi
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={{
                                            pathname: `/u/${user.real_name}/following`,
                                            state: {
                                                id_account: user.id_account,
                                            },
                                        }} className="nav-link text-dark">
                                            <span className='bi me-3'>
                                                <i className="fas fa-clipboard-list"></i>
                                            </span>
                                            &nbsp;
                                            Đang theo dõi
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`/u/${user.real_name}/following-tags`} className="nav-link text-dark">
                                            <span className='bi me-3'>
                                                <i className="fas fa-book"></i>
                                            </span>
                                            &nbsp;
                                            Thẻ theo dõi
                                        </Link>
                                    </li>
                                    <hr style={{ backgroundColor: 'black', width: '100%' }} />
                                    <li className="nav-item">
                                        <Link to={`/u/${user.real_name}/post_0`} className="nav-link text-dark">
                                            <span className='bi me-3'>
                                                <i className="fas fa-book"></i>
                                            </span>
                                            &nbsp;
                                            Bài viết công khai
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`/u/${user.real_name}/post_1`} className="nav-link text-dark">
                                            <span className='bi me-3'>
                                                <i className="fas fa-book"></i>
                                            </span>
                                            &nbsp;
                                            Bài viết riêng tư
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`/u/${user.real_name}/post_2`} className="nav-link text-dark">
                                            <span className='bi me-3'>
                                                <i className="fas fa-book"></i>
                                            </span>
                                            &nbsp;
                                            Bài viết ẩn liên kêt
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <></>
                            )}
                            {/* <hr style={{ backgroundColor: 'black', width: "300px" }} /> */}
                        </ul>

                    </nav>
                    {/* <label for='nav-mobile-input' className='nav_bars-btn'>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" class="svg-inline--fa fa-bars fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>
                        </label> */}

                    <input type='checkbox' hidden name='' id='nav-mobile-input' className='nav_input'></input>

                    <label htmlFor='nav-mobile-input' className='nav_overplay'></label>

                    <nav className='nav_mobile d-flex flex-column flex-shrink-0 p-3 text-white'>
                        <Link to="/" className="d-flex align-items-center mb-1 mb-md-0 me-md-auto text-decoration-none">
                            {/* <svg class="bi me-2" width="40" height="32"></svg> */}
                            <Image src={itNewsIcon} style={{ width: '50px', height: '50px' }} className='title me-3' />
                            <span className="fs-4 text-dark">Danh mục</span>
                        </Link>
                        <label htmlFor='nav-mobile-input' className="fas fa-times nav_bar-close"></label>
                        <hr />
                        <ul className='nav_mobile-list nav nav-pills flex-column mb-auto'>
                            <li className="nav-item">
                                <Link to="/" className="nav-link text-dark" >
                                    <span className='bi me-3'>
                                        <i className="fas fa-home"></i>
                                    </span>
                                    Trang chủ
                                </Link>
                            </li>
                            {localStorage[types.LOCAL_STORAGE_TOKEN_NAME] ? (
                                <>
                                    <li className="nav-item">
                                        <Link to={`/u/${user.real_name}/clips/posts`} className="nav-link text-dark">
                                            <span className='bi me-3'>
                                                <i className="fas fa-bookmark"></i>
                                            </span>
                                            &nbsp;
                                            Bookmark
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`/u/${user.real_name}/followers`} className="nav-link text-dark">
                                            <span className='bi me-3'>
                                                <i className="fas fa-clipboard-list"></i>
                                            </span>
                                            &nbsp;
                                            Người theo dõi
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={{
                                            pathname: `/u/${user.real_name}/following`,
                                            state: {
                                                id_account: user.id_account,
                                            },
                                        }} className="nav-link text-dark">
                                            <span className='bi me-3'>
                                                <i className="fas fa-clipboard-list"></i>
                                            </span>
                                            &nbsp;
                                            Đang theo dõi
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`/u/${user.real_name}/following-tags`} className="nav-link text-dark">
                                            <span className='bi me-3'>
                                                <i className="fas fa-book"></i>
                                            </span>
                                            &nbsp;
                                            Thẻ theo dõi
                                        </Link>
                                    </li>
                                    <hr style={{ backgroundColor: 'black', width: '100%' }} />
                                    <li className="nav-item">
                                        <Link to={`/u/${user.real_name}/post_0`} className="nav-link text-dark">
                                            <span className='bi me-3'>
                                                <i className="fas fa-book"></i>
                                            </span>
                                            &nbsp;
                                            Bài viết công khai
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`/u/${user.real_name}/post_1`} className="nav-link text-dark">
                                            <span className='bi me-3'>
                                                <i className="fas fa-book"></i>
                                            </span>
                                            &nbsp;
                                            Bài viết riêng tư
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={`/u/${user.real_name}/post_2`} className="nav-link text-dark">
                                            <span className='bi me-3'>
                                                <i className="fas fa-book"></i>
                                            </span>
                                            &nbsp;
                                            Bài viết ẩn liên kêt
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <></>
                            )}
                            {/* <hr style={{ backgroundColor: 'black', width: "300px" }} /> */}
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
                </div>
            </Col>
        </>
    )
}

export default Menu
