import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./registerApi";
import jwtDecode from "jwt-decode";



const initialState = {
    token: localStorage.getItem("token"),
    name: "",
    email: "",
    _id: "",
    isAdmin: false,
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
    userLoaded: false,
};

///registrar -ação
export const registerState = createAsyncThunk(
    "auth/registerUser",
    async (values, {rejectWithValue}) => {
        try {
           const token = await axios.post(`${url}/register`, {
                name: values.name,
                email: values.email,
                password: values.password
            }); 

            localStorage.setItem("token", token.data)

            return token.data

        } catch (err) {

            console.log(err.response.data);
            return rejectWithValue(err.response.data)
            
        }
    });

    //////login -ação 
    export const loginState = createAsyncThunk(
        "auth/loginUser",
        async (values, {rejectWithValue}) => {
            try {
               const token = await axios.post(`${url}/login`, {
                    email: values.email,
                    password: values.password
                }); 

                //insere o token no localstorage
                localStorage.setItem("token", token.data)
                //retorna o token
                return token.data
    
            } catch (err) {
    
                console.log(err.response.data);
                return rejectWithValue(err.response.data)
                
            }
        })


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        ///load a user
        loadUser(state, action){
            const token = state.token;// token está na localstorage, por isso pertence ao state
            if (token){
                const user = jwtDecode(token);

                return{
                    ...state, 
                    token,
                    name: user.name,
                    email: user.email,
                    _id: user._Id,
                    isAdmin: user.isAdmin,
                    userLoaded: true,
                }
            }
        },
        logoutUser(state, action){
            localStorage.removeItem("token");

            return {
                ...state,
                token: "",
                name: "",
                email: "",
                _id: "",
                isAdmin: false,
                registerStatus: "",
                registerError: "",
                loginStatus: "",
                loginError: "",
                userLoaded: false,
            }
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(registerState.pending, (state, action) => {
            return {...state, registerStatus
                : "pending"}

        });

        builder.addCase(registerState.fulfilled, (state, action) => {
            if(action.payload){

                //decofificar codigo jwt
                const user = jwtDecode(action.payload)


                return{
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id: user._Id,
                    isAdmin: user.isAdmin,
                    registerStatus: "success",
                    }
               
            }else return state
        });

        builder.addCase(registerState.rejected, (state, action) => {
            return{
                ...state,
                loginStatus: "rejected",
                loginError: action.payload,
            }

        });

        /////login
        builder.addCase(loginState.pending, (state, action) => {
            return {...state, loginStatus
                : "pending"}

        });

        builder.addCase(loginState.fulfilled, (state, action) => {
            if(action.payload){

                //decofificar codigo jwt
                const user = jwtDecode(action.payload)


                return{
                    ...state,
                    token: action.payload,
                    email: user.email,
                    _id: user._Id,
                    isAdmin: user.isAdmin,
                    loginStatus: "success",
                    }
               
            }else return state
        });

        builder.addCase(loginState.rejected, (state, action) => {
            return{
                ...state,
                loginStatus: "rejected",
                loginError: action.payload,
            }

        });


    },
});
//export reduce actions (nao sao requisições http)
export const {loadUser, logoutUser} = authSlice.actions

export default authSlice.reducer
