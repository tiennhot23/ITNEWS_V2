import React, { useEffect } from "react"
import "../.././App.css"
import { useDispatch, useSelector } from "react-redux"
import { loadUser, userSelector } from "../../reducers/User/loginForm"
import Body from "./Body"
import Footer from "./Footer"
import Header from "./Header"

const HomePage = () => {
    const dispatch = useDispatch()
    const user = useSelector(userSelector)

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    return (
        <div className="App">
            <Header real_name={user.real_name} id_role={user.id_role} gender={user.gender} company={user.company} phone={user.phone} avatar={user.avatar} birth={user.birth} />
            <Body real_name={user.real_name} id_role={user.id_role} />
            <Footer />
        </div>
    )
}

export default HomePage
