import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { toastError, toastSuccess } from "../../Toast/Toast"
import { forgotPassword } from "../../utils/callerAPI"
import { useHistory, Link } from "react-router-dom"
import * as types from "../.././contains/types"

const ForgotPassword = () => {
    const history = useHistory()
    const [account_name, setAccount_name] = useState("")

    const onSubmitForgotPassword = async (event) => {
        event.preventDefault()
        const response = await forgotPassword(account_name)
        if (response.status === 200) {
            toastSuccess(response.message)
            localStorage.setItem(types.LOCAL_STORAGE_USER, response.id_account)
            history.push("/forgot/password/code")
        } else {
            toastError(response.message)
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
                        <div className="box-retrieval-pass open">
                            <h2 style={{ marginBottom: "40px" }}>
                                Lấy lại mật khẩu
                            </h2>
                            <Form
                                onSubmit={onSubmitForgotPassword}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <label className="modal-lable">
                                        <i className="fas fa-user-tie fa-lg"></i>
                                    </label>
                                    <input
                                        type="text"
                                        className="modal-input"
                                        id="input-name-login1"
                                        placeholder="Tên đăng nhập"
                                        name="account_name"
                                        require="true"
                                        value={account_name}
                                        onChange={(e) =>
                                            setAccount_name(e.target.value)
                                        }
                                    />
                                </div>
                                <button className="retrieval-pass">
                                    Lấy mã xác nhận
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
                        <Form className='my-4' onSubmit={onSubmitForgotPassword}>
                            <Form.Group className="mb-3">
                                <Form.Control type='text'
                                    placeholder="Tên đăng nhập"
                                    name="account_name"
                                    require="true"
                                    value={account_name}
                                    onChange={(e) =>
                                        setAccount_name(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Button className="mt-3" variant='success' type='submit'>Lấy mã code</Button>
                        </Form>
                        <p>Bạn đã nhớ mật khẩu?
                            &nbsp;
                            <Link to='/login'>
                                <Button style={{ color: 'white' }} variant='info' className='ml-2'>Đăng nhập</Button>
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

export default ForgotPassword
