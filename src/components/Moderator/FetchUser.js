import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { Row, Col, Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  authorSelector,
  changeRoleAccount,
  limitedTimeUnlock,
  loadAuthor,
  permanentUnlock,
} from "../../reducers/Author/author"
import { loadUser, userSelector } from "../../reducers/User/loginForm"
import Footer from "../home/Footer"
import Header from "../home/Header"
import MenuAdmin from "../home/MenuAdmin"
import ModalAddUser from "../Modal/ModalAddUser"
import ModalAdmin from "../Modal/ModalAdmin"
import { send } from "emailjs-com"
import { toastError } from "../../Toast/Toast"
import Tooltip from "react-bootstrap/Tooltip"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"

const FetchUser = () => {
  const dispatch = useDispatch()
  const users = useSelector(authorSelector)
  const [modal, setModal] = useState(false)
  const [modalAdd, setModalAdd] = useState(false)
  const [getUser, setGetUser] = useState({
    id_account: 0,
    account_name: "",
    email: "",
    id_role: 0,
  })
  const userLogin = useSelector(userSelector)

  const [pageNumber, setPageNumber] = useState(0)
  const todoPerPage = 10
  const pagesVisited = pageNumber * todoPerPage

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(loadAuthor())
  }, [dispatch])

  const lockAccount = (id_account, account_name, email, real_name, id_role) => {
    setModal(true)
    setGetUser({ id_account, account_name, real_name, email, id_role })
  }

  const sendEmail = (real_name, email) => {
    const emailLock = {
      from_name: "",
      to_name: email,
      real_name,
      reply_to: "",
    }
    send(
      "service_dukxn3m",
      "template_unLock_user",
      emailLock,
      "sGtIKVX-3KqLsed8L"
    )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text)
      })
      .catch((err) => {
        console.log("FAILED...", err)
      })
  }
  const unLockAccount = async (
    id_account,
    real_name,
    email,
    account_status
  ) => {
    try {
      if (account_status === 1) {
        dispatch(limitedTimeUnlock(id_account))
        // sendEmail(real_name, email)
      } else if (account_status === 2) {
        if (userLogin.id_role === 1) {
          dispatch(permanentUnlock(id_account))
          // sendEmail(real_name, email)
        } else {
          toastError("Bạn không có quyền!")
        }
      }
    } catch (error) {}
  }

  const changeRole = async (id_account, role) => {
    if (role === "User") {
      const data = {
        id_account,
        id_role: 2,
      }
      dispatch(changeRoleAccount(data))
    } else {
      const data = {
        id_account,
        id_role: 3,
      }
      dispatch(changeRoleAccount(data))
    }
  }

  const showActionButton = (user) => {
    if (user.account_status === 0) {
      return (
        <OverlayTrigger
          delay={{ hide: 100, show: 100 }}
          overlay={(props) => <Tooltip {...props}>Khóa</Tooltip>}
          placement="bottom"
        >
          <button
            className="btn btn-sm btn-danger"
            style={{
              margin: "5px",
            }}
            onClick={() =>
              lockAccount(
                user.id_account,
                user.account_name,
                user.email,
                user.real_name,
                userLogin.id_role
              )
            }
          >
            <i className="fas fa-lock" />
          </button>
        </OverlayTrigger>
      )
    } else {
      return (
        <OverlayTrigger
          delay={{ hide: 100, show: 100 }}
          overlay={(props) => <Tooltip {...props}>Mở khóa</Tooltip>}
          placement="bottom"
        >
          <button
            className="btn btn-sm btn-success"
            style={{
              margin: "5px",
            }}
            onClick={() =>
              unLockAccount(
                user.id_account,
                user.real_name,
                user.email,
                user.account_status
              )
            }
          >
            <i className="fas fa-unlock-alt" />
          </button>
        </OverlayTrigger>
      )
    }
  }

  const pageCount = Math.ceil(users.length / todoPerPage)
  const displayTodo = users
    .slice(pagesVisited, pagesVisited + todoPerPage)
    .map((user, index) => {
      return (
        <tr key={user.id_account}>
          <td>{user.id_account}</td>
          <td>{user.account_name}</td>
          <td>{user.email}</td>
          <td className="text-right">{user.real_name}</td>
          <td>
            {user.account_status === 0
              ? "Hoạt động"
              : user.account_status === 1
              ? "Khóa tạm thời"
              : "Khóa vĩnh viễn"}
          </td>
          {/* <td
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {showActionButton(user)}

                        <button
                            className={
                                user.role === "Admin"
                                    ? "btn btn-sm btn-danger"
                                    : user.role === "Moder"
                                        ? "btn btn-sm btn-warning"
                                        : "btn btn-sm btn-primary"
                            }
                            style={{
                                margin: "5px",
                                width: "70px",
                            }}
                            onClick={() =>
                                changeRole(user.id_account, user.role)
                            }
                        >
                            {user.role}
                        </button>
                    </td> */}
          <td style={{ textAlign: "center" }}>
            {showActionButton(user)}
            <button
              type="button"
              className={
                user.role === "Admin"
                  ? "btn btn-sm btn-danger px-3"
                  : user.role === "Moder"
                  ? "btn btn-warning px-3"
                  : "btn btn-sm btn-primary px-3"
              }
              onClick={() => changeRole(user.id_account, user.role)}
            >
              {user.role}
            </button>
          </td>
        </tr>
      )
    })

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  return (
    <>
      <Header
        real_name={userLogin.real_name}
        id_role={userLogin.id_role}
        gender={userLogin.gender}
        company={userLogin.company}
        phone={userLogin.phone}
        avatar={userLogin.avatar}
        birth={userLogin.birth}
      />
      <Container
        fluid
        style={{
          marginTop: "95px",
          minHeight: "72vh",
          backgroundColor: "#F0F8FF",
        }}
      >
        <Row>
          <MenuAdmin />
          <Col
            xl={10}
            lg={9}
            md={12}
            sm={12}
            style={{ backgroundColor: "#F0F8FF" }}
          >
            <Row>
              <Col xl={12} lg={12} md={12} sm={12}>
                <div
                  className="box-manager"
                  style={{
                    marginTop: "25px",
                    marginBottom: "25px",
                  }}
                >
                  <div className="table-responsive">
                    <table className="table align-middle">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Tên tài khoản</th>
                          <th scope="col">Email</th>
                          <th scope="col" className="text-right">
                            Tên người dùng
                          </th>
                          <th scope="col">Trạng thái</th>
                          <th scope="col" className="text-center">
                            Hành động
                          </th>
                        </tr>
                      </thead>
                      <tbody>{displayTodo}</tbody>
                    </table>
                  </div>
                </div>
                <div className="list-page">
                  <ReactPaginate
                    previousLabel={<i className="fa fa-chevron-left "></i>}
                    nextLabel={<i className="fa fa-chevron-right"></i>}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item me-2"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item me-2"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item me-2"}
                    breakLinkClassName={"page-link"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"active"}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
      <ModalAdmin modal={modal} setModal={setModal} getUser={getUser} />
      <ModalAddUser modalAdd={modalAdd} setModalAdd={setModalAdd} />
    </>
  )
}

export default FetchUser
