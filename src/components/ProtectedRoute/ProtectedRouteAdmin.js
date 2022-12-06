import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadUser, userSelector } from "../../reducers/User/loginForm"
import { Route, Redirect } from "react-router-dom"
import * as types from "../.././contains/types"

const ProtectedRouteAdmin = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch()
  const user = useSelector(userSelector)

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          if (
            localStorage[types.LOCAL_STORAGE_TOKEN_NAME] &&
            user.id_role !== 3
          ) {
            return <Component {...rest} {...props} />
          } else {
            return <Redirect to="/forbidden" />
          }
        }}
      />
    </>
  )
}

export default ProtectedRouteAdmin
