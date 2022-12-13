import React, { useState, useEffect } from "react"
import { Image } from "react-bootstrap"
import { updateUser } from "../../utils/callerAPI"
import { toastError, toastSuccess } from "../.././Toast/Toast"
import { useDispatch } from "react-redux"
import { loadUser } from "../../reducers/User/loginForm"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

const UpdateUser = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const [image, setImage] = useState({
        selectedFile: null,
    })
    const [formUpdateUser, setUpdateUser] = useState({
        real_name: location.state.real_name,
        birth: location.state.birth,
        gender: location.state.gender,
        company: location.state.company,
        phone: location.state.phone,
        avatar: location.state.avatar,
    })
    const { selectedFile } = image
    const { real_name, birth, company, phone, avatar, gender } = formUpdateUser

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    }, [avatar])

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    const [frmGender, setGender] = useState(location.state.gender)

    const onChangeUpdateUser = (event) => {
        setUpdateUser({
            ...formUpdateUser,
            [event.target.name]: event.target.value,
        })
    }

    const fileSelectedHandle = (event) => {
        setImage({
            ...selectedFile,
            selectedFile: event.target.files[0],
        })

        const file = event.target.files[0]
        file.preview = URL.createObjectURL(file)
        setUpdateUser({
            ...formUpdateUser,
            avatar: file.preview
        })
    }
    const onSubmitUpdateUser = async (event) => {
        event.preventDefault()
        formUpdateUser.gender = frmGender
        // const data = {
        //     real_name,
        //     birth,
        //     company,
        //     phone,
        //     gender
        // }
        const fd = new FormData()
        fd.append('real_name', real_name)
        fd.append('birth', birth)
        fd.append('company', company)
        fd.append('phone', phone)
        fd.append('gender', gender)
        fd.append('avatar', selectedFile, selectedFile.name)

        try {
            // setAuthToken(localStorage.getItem(types.LOCAL_STORAGE_TOKEN_NAME))
            const updateDataUser = await updateUser(fd)
            if (updateDataUser.status === 200) {
                toastSuccess(updateDataUser.message)
            } else {
                toastError(updateDataUser.message)
            }
            // const updateImage = await updateImageUser(fd)
            // if (updateImage.status === 200) {
            //     toastSuccess(updateImage.message)
            // } else {
            //     toastError(updateImage.message)
            // }
        } catch (error) {
            console.log(error)
        }
    }
    // const { real_name, birth, company, phone, avatar } = formUpdateUser
    return (
        <>
            <div className="wapper">
                <div className="content">
                    <Link to="/">
                        {" "}
                        <header className="img-logo"></header>
                    </Link>
                    <div className="login-content">
                        <div className="bia-login" />
                        <form
                            className="box-update-info open"
                            onSubmit={onSubmitUpdateUser}
                        >
                            <h2>Cập nhật thông tin cá nhân</h2>
                            <div className="box-avatar">
                                <Image
                                    src={avatar}
                                    roundedCircle
                                    style={{ width: "8rem", height: '8rem' }}
                                    alt="avatar"
                                />
                                {/* <input type="file" style={{ width: "8rem" }} /> */}
                            </div>
                            <div id="input1">
                                <label
                                    htmlFor="updateInfo-input1"
                                    className="item-lable"
                                >
                                    <i className="fas fa-user-tie fa-lg">
                                        &nbsp;&nbsp;
                                    </i>
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="item-input"
                                    id="updateInfo-input1"
                                    placeholder="Họ và Tên người dùng"
                                    name="real_name"
                                    value={real_name}
                                    onChange={onChangeUpdateUser}
                                />
                            </div>
                            <div id="input2">
                                <label
                                    htmlFor="updateInfo-input2"
                                    className="item-lable"
                                >
                                    <i className="fas fa-images fa-lg">
                                        &nbsp;
                                    </i>
                                </label>
                                <input
                                    required={real_name ? false : true}
                                    type="file"
                                    className="item-input"
                                    id="updateInfo-input2"
                                    placeholder="Đường dẫn ảnh của bạn"
                                    name="image"
                                    onChange={fileSelectedHandle}
                                />
                            </div>
                            <div id="input3">
                                <label
                                    htmlFor="updateInfo-input3"
                                    className="item-lable"
                                >
                                    <i className="fas fa-birthday-cake fa-lg">
                                        &nbsp;&nbsp;
                                    </i>
                                </label>
                                <input
                                    type="text"
                                    className="item-input"
                                    id="updateInfo-input3"
                                    placeholder="Ngày Sinh: ví dụ 01/01/2021"
                                    name="birth"
                                    value={birth}
                                    onChange={onChangeUpdateUser}
                                />
                            </div>
                            <div id="input6">
                                <label
                                    htmlFor="updateInfo-input6"
                                    className="item-lable"
                                >
                                    <i className="fas fa-building fa-lg">
                                        &nbsp;&nbsp;
                                    </i>
                                </label>
                                <input
                                    type="text"
                                    className="item-input"
                                    id="updateInfo-input6"
                                    placeholder="Công ty"
                                    name="company"
                                    value={company}
                                    onChange={onChangeUpdateUser}
                                />
                            </div>
                            <div id="input4">
                                <label
                                    htmlFor="updateInfo-input4"
                                    className="item-lable"
                                >
                                    <i className="fas fa-phone-alt fa-lg">
                                        &nbsp;
                                    </i>
                                </label>
                                <input
                                    type="text"
                                    className="item-input"
                                    id="updateInfo-input4"
                                    placeholder="Số điện thoại"
                                    name="phone"
                                    value={phone}
                                    onChange={onChangeUpdateUser}
                                />
                            </div>
                            <div
                                id="input5"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: "24px",
                                    fontWeight: "600",
                                }}
                            >
                                <div>
                                    <input
                                        type="radio"
                                        id="Nam"
                                        name="frmGender"
                                        value={0}
                                        onChange={(e) => setGender(0)}
                                        checked={frmGender === 0}
                                    />
                                    <label htmlFor="Nam">Nam</label>&nbsp;
                                    <input
                                        type="radio"
                                        id="Nu"
                                        name="frmGender"
                                        value={1}
                                        onChange={(e) => setGender(1)}
                                        checked={frmGender === 1}
                                    />
                                </div>
                                <label htmlFor="Nu">Nữ</label>
                            </div>
                            <button id="sign-in" type="submit">
                                Cập nhật thông tin
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateUser
