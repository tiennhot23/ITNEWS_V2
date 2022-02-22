import React, { useState } from "react"
import { toastError, toastSuccess } from "../.././Toast/Toast"
import { registerUser } from "../.././utils/callerAPI"
import { useHistory, Link } from "react-router-dom"
import { Form, Button } from "react-bootstrap"

const RegisterForm = () => {
    const [registerForm, setRegisterForm] = useState({
        account_name: "",
        real_name: "",
        email: "",
        password: "",
        confirm: "",
    })

    const history = useHistory()

    const onChangeRegister = (event) => {
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        })
    }
    const onSubmitRegister = async (event) => {
        event.preventDefault()
        if (password !== confirm) {
            toastError("Password and Confirm password must match")
        } else {
            try {
                const register = {
                    account_name: account_name,
                    real_name: real_name,
                    email: email,
                    password: password,
                }
                const registerData = await registerUser(register)
                if (registerData.status) {
                    toastSuccess(registerData.message)
                    history.push("/login")
                } else {
                    toastError(registerData.message)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const { account_name, real_name, email, password, confirm } = registerForm
    return (
        // <div className="wapper">
        //     <div className="content">
        //         <Link to="/">
        //             {" "}
        //             <header className="img-logo"></header>
        //         </Link>
        //         <div className="login-content">
        //             <div className="bia-login" />
        //             <form
        //                 className="box-sign-in open"
        //                 onSubmit={onSubmitRegister}
        //             >
        //                 <h2>Đăng ký</h2>
        //                 <div id="input1">
        //                     <label
        //                         htmlFor="sign-in-input1"
        //                         className="item-lable"
        //                         style={{ marginRight: "10px" }}
        //                     >
        //                         <i className="fas fa-user-tie fa-lg"></i>
        //                     </label>
        //                     <input
        //                         type="text"
        //                         className="item-input"
        //                         id="sign-in-input1"
        //                         placeholder="Tên đăng nhập"
        //                         name="account_name"
        //                         value={account_name}
        //                         onChange={onChangeRegister}
        //                     />
        //                 </div>
        //                 <div id="input2">
        //                     <label
        //                         htmlFor="sign-in-input2"
        //                         className="item-lable"
        //                         style={{ marginRight: "10px" }}
        //                     >
        //                         <i className="fas fa-user-tie fa-lg"></i>
        //                     </label>
        //                     <input
        //                         type="text"
        //                         className="item-input"
        //                         id="sign-in-input2"
        //                         placeholder="Tên hiển thị"
        //                         name="real_name"
        //                         value={real_name}
        //                         onChange={onChangeRegister}
        //                     />
        //                 </div>
        //                 <div id="input3">
        //                     <label
        //                         htmlFor="sign-in-input3"
        //                         className="item-lable"
        //                         style={{ marginRight: "6px" }}
        //                     >
        //                         <i className="fas fa-envelope fa-lg"></i>
        //                     </label>
        //                     <input
        //                         type="text"
        //                         className="item-input"
        //                         id="sign-in-input3"
        //                         placeholder="Email"
        //                         name="email"
        //                         value={email}
        //                         onChange={onChangeRegister}
        //                     />
        //                 </div>
        //                 <div id="input4">
        //                     <label
        //                         htmlFor="sign-in-input4"
        //                         className="item-lable"
        //                         style={{ marginRight: "6px" }}
        //                     >
        //                         <i className="fas fa-key fa-lg"></i>
        //                     </label>
        //                     <input
        //                         type="password"
        //                         className="item-input"
        //                         id="sign-in-input4"
        //                         placeholder="Mật khẩu"
        //                         name="password"
        //                         value={password}
        //                         onChange={onChangeRegister}
        //                     />
        //                 </div>
        //                 <div id="input5">
        //                     <label
        //                         htmlFor="sign-in-input5"
        //                         className="item-lable"
        //                         style={{ marginRight: "10px" }}
        //                     >
        //                         <i className="fas fa-key fa-lg"></i>
        //                     </label>
        //                     <input
        //                         type="password"
        //                         className="item-input"
        //                         id="sign-in-input5"
        //                         placeholder="Nhập lại mật khẩu"
        //                         name="confirm"
        //                         value={confirm}
        //                         onChange={onChangeRegister}
        //                     />
        //                 </div>
        //                 <div id="text-1">
        //                     <i className="far fa-check-square fa-lg" style={{ marginRight: "10px" }}></i>
        //                     <span>
        //                         Nhấp ĐĂNG KÝ là bạn đồng ý với điều khoản và quy
        //                         định
        //                     </span>
        //                 </div>
        //                 <button id="sign-in" type="submit">
        //                     Đăng ký
        //                 </button>
        //             </form>
        //         </div>
        //     </div>
        // </div>
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>Đăng kí tài khoản</h1>
                    <h4>Chào mừng bạn đến với website ITNEWS</h4>
                    <Form className='my-4' onSubmit={onSubmitRegister}>
                        <Form.Group className="mb-3">
                            <Form.Control type='text'
                                require="true"
                                placeholder="Tên đăng nhập"
                                name="account_name"
                                value={account_name}
                                onChange={onChangeRegister}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type='text'
                                require="true"
                                placeholder="Tên hiển thị"
                                name="real_name"
                                value={real_name}
                                onChange={onChangeRegister}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type='text'
                                require="true"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={onChangeRegister}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type='password'
                                require="true"
                                placeholder="Mật khẩu"
                                name="password"
                                value={password}
                                onChange={onChangeRegister}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type='password'
                                require="true"
                                placeholder="Nhập lại mật khẩu"
                                name="confirm"
                                value={confirm}
                                onChange={onChangeRegister}
                            />
                        </Form.Group>
                        <p>Nhấp ĐĂNG KÝ là bạn đồng ý với điều khoản và quy định</p>
                        <Button className="mt-3" variant='success' type='submit'>Đăng kí</Button>
                    </Form>
                    {/* <Link style={{ color: 'white', marginBottom: '15px' }} to="/forgot/password">
                        Quên mật khẩu?
                    </Link> */}
                    <p>Bạn đã có tài khoản?
                        &nbsp;
                        <Link to='/login'>
                            <Button style={{ color: 'white' }} variant='info' className='ml-2'>Đăng nhập ngay</Button>
                        </Link>
                        &nbsp;
                        <Link to='/'>
                            <Button style={{ color: 'white' }} variant='info'>Trang chủ</Button>
                        </Link>
                    </p>
                </div>
            </div>
        </div >
    )
}

export default RegisterForm
