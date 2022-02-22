import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { enterCodePass } from "../../utils/callerAPI"
import * as types from "../.././contains/types"
import { toastError, toastSuccess } from "../../Toast/Toast"
import { useHistory, Link } from "react-router-dom"

const EnterCode = () => {
    const [code, setCode] = useState("")
    const history = useHistory()

    const onSubmitCode = async (event) => {
        event.preventDefault()
        try {
            const id_account = localStorage.getItem(types.LOCAL_STORAGE_USER)
            const codeForgotPass = await enterCodePass(id_account, code)
            if (codeForgotPass.status === 200) {
                toastSuccess(codeForgotPass.message)
                localStorage.removeItem(types.LOCAL_STORAGE_USER)
                history.push("/")
            } else {
                toastError(codeForgotPass.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {/* <div className="wapper">
                <div className="content">
                    <Link to="/">
                        <header className="img-logo"></header>
                    </Link>
                    <div className="login-content">
                        <div className="bia-login" />
                        <div className="box-verification open">
                            <h2>Nhập mã xác nhận</h2>
                            <Form
                                onSubmit={onSubmitCode}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <input
                                    type="text"
                                    className="modal-input"
                                    id="input-name-login1"
                                    placeholder="Mã xác nhận"
                                    name="account_name"
                                    require="true"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                                <button className="verification">
                                    Xác nhận
                                </button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <h1>Chào mừng bạn đến với website ITNEWS</h1>
                        <h4>Lấy lại mật khẩu</h4>
                        <Form className='my-4' onSubmit={onSubmitCode}>
                            <Form.Group className="mb-3">
                                <Form.Control type='text'
                                    placeholder="Mã code xác nhận đã gửi đến gmail"
                                    name="account_name"
                                    require="true"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </Form.Group>
                            <Button className="mt-3" variant='success' type='submit'>Xác nhận</Button>
                        </Form>
                        <p>Gửi lại mã code?
                            &nbsp;
                            <Link to='/forgot/password'>
                                <Button style={{ color: 'white' }} variant='info' className='ml-2'>Lấy mã code</Button>
                            </Link>
                            &nbsp;
                            <Link to='/'>
                                <Button style={{ color: 'white' }} variant='info'>Trang chủ</Button>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EnterCode
