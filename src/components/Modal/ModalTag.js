import React, { useEffect, useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { addTag, updateTagAll } from "../../reducers/Tags/tags"
import { loadUser } from "../../reducers/User/loginForm"
const ModalTag = ({ modal, setModal, updateTag }) => {
    const dispatch = useDispatch()
    const [tag, setTag] = useState({
        id_tag: 0,
        name: "",
        logo: "",
    })
    const { id_tag, name, logo } = tag
    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    useEffect(() => {
        setTag(updateTag)
    }, [updateTag])

    const onChangeTag = (event) => {
        setTag({
            ...tag,
            [event.target.name]: event.target.value,
        })
    }

    const onSubmitTag = (event) => {
        event.preventDefault()
        // console.log(tag)
        if (id_tag === 0) {
            const tag = {
                name: name,
                logo: logo,
            }
            dispatch(addTag(tag))
        } else {
            const tag = {
                name: name,
                logo: logo,
            }
            dispatch(updateTagAll({ id_tag, tag }))
        }

        setDialogModal()
    }

    const setDialogModal = () => {
        setModal(false)
        setTag({
            id_tag: 0,
            name: "",
            logo: "",
        })
    }

    return (
        <>
            <Modal show={modal} onHide={setDialogModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Quản lý thẻ</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmitTag}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="Tên thẻ"
                                name="name"
                                required
                                aria-describedby="title-help"
                                value={name}
                                onChange={onChangeTag}
                            /><br/>
                            {/* <Form.Text id="title-help" muted>
                                Required
                            </Form.Text> */}
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="Logo"
                                name="logo"
                                required
                                aria-describedby="title-help"
                                value={logo}
                                onChange={onChangeTag}
                            /><br/>
                            {/* <Form.Text id="title-help" muted>
                                Required
                            </Form.Text> */}
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Thực hiện
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

export default ModalTag
