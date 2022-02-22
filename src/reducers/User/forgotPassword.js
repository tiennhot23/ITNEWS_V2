import { createSlice } from "@reduxjs/toolkit";

const forgotPassword = createSlice({
    name: 'forgotPass',
    initialState: {
        id_account: 0,
        accessToken: ''
    },
    reducers: {
        setId(state, action){
            state.id_account = action.payload
        }

    },
    extraReducers: (builder) => {

    }

})

const forgotPassReducer = forgotPassword.reducer

export const {setId} = forgotPassword.actions


export default forgotPassReducer