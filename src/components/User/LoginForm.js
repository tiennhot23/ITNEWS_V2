import React, { useState } from "react"
import { Link } from "react-router-dom"
import { loginUser } from "../.././utils/callerAPI"
import { toastError, toastSuccess } from "../.././Toast/Toast"
import { useHistory } from "react-router-dom"
import { Form, Button } from "react-bootstrap"

const LoginForm = () => {
    const [loginForm, setLoginForm] = useState({
        account_name: "",
        password: "",
    })

    const history = useHistory()

    const onChangeLogin = (event) => {
        setLoginForm({
            ...loginForm,
            [event.target.name]: event.target.value,
        })
    }
    const onSubmitLogin = async (event) => {
        event.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            if (loginData.status === 200) {
                toastSuccess(loginData.message)
                // localStorage.setItem(types.LOCAL_STORAGE_USER, JSON.stringify(loginData.data))
                // localStorage.setItem(types.LOCAL_STORAGE_isAuthenticated, true)
                // dispatch(setUser({
                //     user: loginData.data,
                //     isAuthenticated: true
                // }))
                history.push("/")
            } else {
                toastError(loginData.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const { account_name, password } = loginForm
    return (
        // <div className="wapper">
        //     <div className="content">
        //         <Link to="/">
        //             {" "}
        //             <header className="img-logo"></header>
        //         </Link>
        //         <form onSubmit={onSubmitLogin}>
        //             <div className="login-content">
        //                 <div className="bia-login" />
        //                 <div className="box-login open">
        //                     <h1>Đăng nhập</h1>
        //                     <div style={{ marginTop: "36px", width: "70%" }}>
        //                         <label className="modal-lable" style={{ marginRight: "10px" }}>
        //                             <i className="fas fa-user-tie"></i>
        //                         </label>
        //                         <input
        //                             type="text"
        //                             className="modal-input"
        //                             id="input-name-login1"
        //                             placeholder="Tên đăng nhập/Email"
        //                             name="account_name"
        //                             value={account_name}
        //                             onChange={onChangeLogin}
        //                         />
        //                     </div>
        //                     <div style={{ margin: "10px 0px", width: "70%" }}>
        //                         <label className="modal-lable" style={{ marginRight: "6px" }}>
        //                             <i className="fas fa-key"></i>
        //                         </label>
        //                         <input
        //                             type="password"
        //                             className="modal-input"
        //                             id="input-pass1"
        //                             placeholder="Mật khẩu"
        //                             name="password"
        //                             value={password}
        //                             onChange={onChangeLogin}
        //                         />
        //                     </div>
        //                     <div className="modal-forgot-pass">
        //                         <Link to="/forgot/password">
        //                             Quên mật khẩu?
        //                         </Link>
        //                     </div>
        //                     <button id="login" type="submit">
        //                         Đăng nhập
        //                     </button>
        //                     <div className="dang-ky">
        //                         Bạn chưa có tài khoản?{" "}
        //                         <Link to="/register">Đăng ký ngay!</Link>
        //                     </div>
        //                 </div>
        //             </div>
        //         </form>
        //     </div>
        // </div>
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>Kiến thức lập trình</h1>
                    <h4>Chào mừng bạn đến với website ITNEWS</h4>
                    <Form className='my-4' onSubmit={onSubmitLogin}>
                        <Form.Group className="mb-3">
                            <Form.Control type='text'
                                placeholder="Tên đăng nhập/Email"
                                require="true"
                                name="account_name"
                                value={account_name}
                                onChange={onChangeLogin}
                            />
                        </Form.Group>
                        <Form.Group >
                            <Form.Control type='password'
                                placeholder='Mật khẩu'

                                require='true'
                                name="password"
                                value={password}
                                onChange={onChangeLogin}
                            />
                        </Form.Group>
                        <Button className="mt-3" variant='success' type='submit'>Đăng nhập</Button>
                    </Form>
                    <Link style={{ color: 'white', marginBottom: '15px' }} to="/forgot/password">
                        Quên mật khẩu?
                    </Link>
                    <p>Bạn chưa có tài khoản?
                        &nbsp;
                        <Link to='/register'>
                            <Button style={{ color: 'white' }} variant='info' className='ml-2'>Đăng kí ngay</Button>
                        </Link>
                        &nbsp;
                        <Link to='/'>
                            <Button style={{ color: 'white' }} variant='info'>Trang chủ</Button>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
