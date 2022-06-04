import React, { useEffect, useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { addImage, updateImage } from "../../reducers/Image/image"
// import { loadUser } from "../../reducers/User/loginForm"

const ModalImageUser = ({ modal, setModal, updateImg }) => {
    const dispatch = useDispatch()
    const [image, setImage] = useState({
        selectedFile: null,
    })

    const [id, setId] = useState({
        id_image: 0,
    })
    const { selectedFile } = image

    // useEffect(() => {
    //     dispatch(loadUser())
    // }, [dispatch])

    useEffect(() => {
        setId(updateImg)
    }, [updateImg])

    const fileSelectedHandle = (event) => {
        setImage({
            ...selectedFile,
            selectedFile: event.target.files[0],
        })
    }

    const fileUploadHandle = (event) => {
        event.preventDefault()
        if (id.id_image === 0) {
            const fd = new FormData()
            fd.append("image", selectedFile, selectedFile.name)
            dispatch(addImage(fd))
        } else {
            const fd = new FormData()
            fd.append("image", selectedFile, selectedFile.name)
            const data = {
                id_image: id.id_image,
                image: fd,
            }
            dispatch(updateImage(data))
        }

        setDialogModal()
    }

    const setDialogModal = () => {
        setModal(false)
        setImage({
            selectedFile: null,
        })
        setId({
            id_image: 0,
        })
    }

    return (
        <>
            <Modal show={modal} onHide={setDialogModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Quản lý thẻ</Modal.Title>
                </Modal.Header>
                <Form onSubmit={fileUploadHandle}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control
                                type="file"
                                placeholder="Tên thẻ"
                                required
                                name="selectedFile"
                                aria-describedby="title-help"
                                onChange={fileSelectedHandle}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Thêm ảnh
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

export default ModalImageUser