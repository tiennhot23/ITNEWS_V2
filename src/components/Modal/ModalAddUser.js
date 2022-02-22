import React, { useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
const ModalAddUser = ({ modalAdd, setModalAdd }) => {
    const [registerForm, setRegisterForm] = useState({
        id_role: 0,
        account_name: '',
        real_name: '',
        email: '',
        password: '',
        confirm: ''
    })
    const onChangeRegister = (event) => {
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value
        })
    }

    const onSubmitRegister = async (event) => {
        event.preventDefault();
        console.log(registerForm)
    }

    const setDialogModal = () => {
        setModalAdd(false)
        setRegisterForm({
            id_role: 0,
            account_name: '',
            real_name: '',
            email: '',
            password: '',
            confirm: ''
        })
    }
    const {id_role, account_name, real_name, email, password, confirm } = registerForm
    return (
        <>
            <Modal show={modalAdd} onHide={setDialogModal}>
                <Modal.Header closeButton>
                    <Modal.Title>What do you want to learn?</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmitRegister}>
                    <Modal.Body >
                        <Form.Group>
                            <Form.Select aria-label="Default select example" name="id_role" value={id_role} onChange={onChangeRegister} >
                                <option value={1}>Admin</option>
                                <option value={2}>Người quản lý</option>
                            </Form.Select>
                            <Form.Text id='title-help' muted>Quyền hạn tài khoản</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Tên đăng nhập' name='account_name' required aria-describedby='title-help'
                            value={account_name} onChange={onChangeRegister}
                            />
                            <Form.Text id='title-help' muted>Required</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Tên hiển thị' name='real_name' required aria-describedby='title-help'
                            value={real_name} onChange={onChangeRegister}
                            />
                            <Form.Text id='title-help' muted>Required</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Email' name='email' required aria-describedby='title-help'
                            value={email} onChange={onChangeRegister}
                            />
                            <Form.Text id='title-help' muted>Required</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Mật khẩu' name='password' required aria-describedby='title-help'
                            value={password} onChange={onChangeRegister}
                            />
                            <Form.Text id='title-help' muted>Required</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Nhập lại mật khẩu' name='confirm' required aria-describedby='title-help'
                            value={confirm} onChange={onChangeRegister}
                            />
                            <Form.Text id='title-help' muted>Required</Form.Text>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='primary' type='submit'>Them</Button>
                        <Button variant='secondary' onClick={setDialogModal}>Cancel</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ModalAddUser
