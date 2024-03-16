import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    user:null,
    token:null,
    isAuthenticated:false

    
}

const userAuthSlice = createSlice({
    name:"userAuthSlice",
    initialState,
    reducers:{
        authUserSuccess:(state,action)=>{
            state.user = action.payload.user
            state.token = 123
            state.isAuthenticated = true
        },
        
        userlogout:(state,action)=>{

            state.user = null
            state.token = null
            state.isAuthenticated = false

        }
       
    }
})

export const {authUserSuccess,userlogout} = userAuthSlice.actions

export default userAuthSlice.reducer