import React, { useEffect, useState } from "react"
import {
    Navbar,
    Container,
    Form,
    FormControl,
    Button,
    Dropdown,
    Nav
} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import itNewsIcon from "../.././assets/logo.png"
import * as types from "../.././contains/types"
import {
    fetchNotification,
    notificationSelector,
} from "../../reducers/Notification/notification"
import { loadUser, setLogout } from "../../reducers/User/loginForm"

const Header = ({
    real_name,
    id_role,
    gender,
    birth,
    company,
    avatar,
    phone,
}) => {
    const dispatch = useDispatch()
    const notification = useSelector(notificationSelector)
    const [search, setSearch] = useState("")
    const history = useHistory()

    useEffect(() => {
        dispatch(loadUser())
        dispatch(fetchNotification())
    }, [dispatch])

    const onSubmitSearch = (event) => {
        event.preventDefault()
        history.push(`/search/${search}`)
    }

    let changeLoginToLogout
    if (localStorage[types.LOCAL_STORAGE_TOKEN_NAME]) {
        changeLoginToLogout = (
            <Dropdown.Menu align={{ md: "end" }}>
                <Dropdown.Item
                    as={Link}
                    to={{
                        pathname: "/update/user",
                        state: {
                            real_name,
                            birth,
                            company,
                            avatar,
                            gender,
                            phone,
                        },
                    }}
                >
                    Cập nhật thông tin
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/change/password">
                    Thay đổi mật khẩu
                </Dropdown.Item>
                <Dropdown.Item as={Link} to={`/u/${real_name}/image`}>
                    Quản lý ảnh
                </Dropdown.Item>
                <Dropdown.Item as={Link} to={`/u/${real_name}/feedback`}>
                    Phản hồi
                </Dropdown.Item>
                <Dropdown.Item
                    as={Link}
                    to="/"
                    onClick={() => dispatch(setLogout())}
                >
                    Đăng xuất
                </Dropdown.Item>
            </Dropdown.Menu>
        )
    } else {
        changeLoginToLogout = (
            <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/login">
                    Đăng Nhập
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/register">
                    Đăng ký
                </Dropdown.Item>
            </Dropdown.Menu>
        )
    }

    return (
        <>
            {/* <Container fluid>
                <Row> */}
            <Navbar expand="md">
                <Container fluid>
                    <Navbar.Brand>
                        <label for='nav-mobile-input'>
                            {/* <Link to="/"> */}
                            <img
                                className="title"
                                src={itNewsIcon}
                                alt="itNewsIcon"
                                style={{ width: '60px', height: '60px' }}
                            />
                            {/* </Link> */}
                        </label>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav style={{ marginTop: '10px' }} className="me-auto my-2 my-lg-0">
                            <Form className="d-flex search" onSubmit={onSubmitSearch}>
                                <FormControl
                                    type="search"
                                    placeholder="Tìm kiếm bài viết"
                                    className="me-2 inputSearch"
                                    aria-label="Search"
                                    name="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button type='submit' id="dropdown-basic2" className="btn_search"> <span style={{ color: 'white'}}>
                                    <i className="fas fa-search"></i>
                                </span></Button>
                            </Form>
                        </Nav>
                        {/* <Form
                        className="d-flex input-search"
                        onSubmit={onSubmitSearch}
                    >
                        <FormControl
                            type="search"
                            placeholder="Tìm kiếm bài viết"
                            className="mr-2"
                            aria-label="Search"
                            name="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        &nbsp;
                        <Button variant="info" type="submit">
                            <i className="fas fa-search"></i>
                        </Button>
                    </Form> */}
                        <Nav className='topNav-right'>
                            {localStorage[types.LOCAL_STORAGE_TOKEN_NAME] ? (
                                <>
                                    {" "}
                                    {id_role !== 3 ?
                                        <Dropdown>
                                            <Dropdown.Toggle
                                                // variant="info"
                                                id="dropdown-basic1"
                                            >
                                                <span style={{ color: 'white' }}>
                                                    <i className="fas fa-user-shield" ></i>
                                                </span>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu align={{ md: "end" }} className='a'>
                                                <Dropdown.Item
                                                    as={Link}
                                                    to="/moderator/users"
                                                >
                                                    Quản lý người dùng
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    as={Link}
                                                    to="/moderator/tags"
                                                >
                                                    Quản lý thẻ
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    as={Link}
                                                    to="/moderator/posts"
                                                >
                                                    Quản lý bài viết
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    as={Link}
                                                    to="/moderator/feedback"
                                                >
                                                    Quản lý phản hồi
                                                </Dropdown.Item>
                                            </Dropdown.Menu></Dropdown> : <></>}

                                    <Dropdown>
                                        <Dropdown.Toggle
                                            // variant="info"
                                            id="dropdown-basic1"
                                        >
                                            <span style={{ color: 'white' }}>
                                                <i className="fas fa-bell"></i>
                                            </span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu align={{ md: "end" }}>
                                            <Dropdown.Item>
                                                Thông báo
                                            </Dropdown.Item>
                                            <Dropdown.Divider />
                                            {notification
                                                .slice(0, 5)
                                                .map((notify) => (
                                                    <Dropdown.Item
                                                        as={Link}
                                                        to={`/notifications/${notify.id_notification}`}
                                                        key={
                                                            notify.id_notification
                                                        }
                                                    >
                                                        &emsp;{notify.content}
                                                    </Dropdown.Item>
                                                ))}
                                            <Dropdown.Divider />
                                            <Dropdown.Item
                                                as={Link}
                                                to="/notifications"
                                                style={{ textAlign: "right" }}
                                            >
                                                Xem tất cả thông báo
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            // variant="info"
                                            id="dropdown-basic1"
                                        >
                                            <span style={{ color: 'white' }}>
                                                <i className="fas fa-edit"></i>
                                            </span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu align={{ md: "end" }}>
                                            <Dropdown.Item
                                                as={Link}
                                                to="/publish/post"
                                            >
                                                Viết bài
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </>
                            ) : (
                                <></>
                            )}
                            <Dropdown>
                                <Dropdown.Toggle
                                    // variant="info"
                                    id="dropdown-basic1"
                                >
                                    <span style={{ color: 'white' }}>
                                        <i className="fas fa-user-alt"></i>
                                    </span>
                                </Dropdown.Toggle>
                                {changeLoginToLogout}
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* </Row>
            </Container> */}
        </>
    )
}

export default Header
