import React, { useEffect, useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { readFeed } from "../../reducers/Feedback/fetchFeedback"
// import { loadUser } from "../../reducers/User/loginForm"

const ModalFeedback = ({ modal, setModal, readFeedback }) => {
    const dispatch = useDispatch()
    const [feedback, setFeedback] = useState({
        id_feedback: 0,
        id_account: 0,
        account_name: "",
        subject: "",
        content: "",
        day: "",
        real_name: "",
        email: " ",
    })
    const { id_feedback, subject, content } = feedback
    // useEffect(() => {
    //     dispatch(loadUser())
    // }, [dispatch])

    useEffect(() => {
        setFeedback(readFeedback)
    }, [readFeedback])

    const onChangeTag = (event) => {
        setFeedback({
            ...feedback,
            [event.target.name]: event.target.value,
        })
    }

    const onSubmitTag = (event) => {
        event.preventDefault()
        dispatch(readFeed(id_feedback))
        setDialogModal()
    }

    const setDialogModal = () => {
        setModal(false)
        setFeedback({
            id_feedback: 0,
            id_account: 0,
            account_name: "",
            subject: "",
            content: "",
            date_time: "",
            real_name: "",
            email: " ",
        })
    }

    return (
        <>
            <Modal show={modal} onHide={setDialogModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Đọc phản hồi</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmitTag}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Tiêu đề</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Tên thẻ"
                                name="subject"
                                required
                                aria-describedby="title-help"
                                value={subject}
                                onChange={onChangeTag}
                                disabled
                            />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label>Nội dung</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Logo"
                                name="content"
                                required
                                aria-describedby="title-help"
                                value={content}
                                onChange={onChangeTag}
                                disabled
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Đánh dấu đã đọc
                        </Button>
                        <Button variant="secondary" onClick={setDialogModal}>
                            Hủy
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ModalFeedback
