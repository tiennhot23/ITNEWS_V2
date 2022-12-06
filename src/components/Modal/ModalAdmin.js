import React, { useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"
// import { sendForm } from "emailjs-com"
import { send } from "@emailjs/browser"
import { useDispatch } from "react-redux"
import { limitedTimeLock, permanentLock } from "../../reducers/Author/author"
import { toastError } from "../../Toast/Toast"

const ModalAdmin = ({ modal, setModal, getUser }) => {
  const dispatch = useDispatch()
  const [lockUser, setLockUser] = useState({
    reason: "",
    lock: 1,
    hours_lock: 1,
  })

  const handleLock = (event) => {
    setLockUser({ ...lockUser, [event.target.name]: event.target.value })
  }

  const sendEmail = (real_name, lock, reason, email) => {
    const emailLock = {
      from_name: "",
      to_name: email,
      real_name,
      lock_type: lock === 1 ? "tạm thời" : "vĩnh viễn",
      reason,
      reply_to: "",
    }
    send(
      "service_dukxn3m",
      "template_lock_user",
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
  const onSubmit = async (event) => {
    event.preventDefault()
    if (lock === 1) {
      try {
        // const lock = {
        //     reason,
        //     hours_lock: +hours_lock,
        // }
        // const lockT = await limitedTimeLock(getUser.id_account, lock)
        // console.log(lockT.message)
        const data = {
          id_account: getUser.id_account,
          lock: {
            reason,
            hours_lock: +hours_lock,
          },
        }
        dispatch(limitedTimeLock(data))
        // sendEmail(getUser.real_name, lock, reason, getUser.email)
        setLockUser({
          reason: "",
          lock: 1,
          hours_lock: 1,
        })
        setModal(false)
      } catch (error) {}
    } else {
      if (getUser.id_role >= 2) {
        toastError("Bạn không có quyền!")
        return
      }
      try {
        // const lockVV = await permanentLock(getUser.id_account, reason)
        // console.log(lockVV.message)
        const data = {
          id_account: getUser.id_account,
          reason: reason,
        }

        dispatch(permanentLock(data))
        // sendEmail(getUser.real_name, lock, reason, getUser.email)
        setLockUser({
          reason: "",
          lock: 1,
          hours_lock: 1,
        })
        setModal(false)
      } catch (error) {}
    }
  }
  const { reason, lock, hours_lock } = lockUser
  const setModalDialog = () => {
    setModal(false)
    setLockUser({
      reason: "",
      lock: 1,
      hours_lock: 1,
    })
  }

  return (
    <>
      <Modal show={modal} onHide={() => setModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Khóa tài khoản</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Lý do khóa"
                name="reason"
                required
                aria-describedby="title-help"
                value={reason}
                onChange={handleLock}
              />
              <br />
              {/* <Form.Text id="title-help" muted>
                                Bắt buộc
                            </Form.Text> */}
            </Form.Group>
            <Form.Group>
              <Form.Select
                aria-label="Default select example"
                name="lock"
                value={lock}
                onChange={handleLock}
              >
                <option value={1}>Khóa tạm thời</option>
                <option value={2}>Khóa vĩnh viễn</option>
              </Form.Select>

              {/* <Form.Text id="title-help" muted>
                                Bắt buộc
                            </Form.Text> */}
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Số giờ khóa"
                name="hours_lock"
                required
                aria-describedby="title-help"
                value={hours_lock}
                onChange={handleLock}
              />
              {/* <Form.Text id="title-help" muted>
                                Bắt buộc
                            </Form.Text> */}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" type="submit">
              Khóa
            </Button>
            <Button variant="secondary" onClick={setModalDialog}>
              Hủy
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default ModalAdmin
