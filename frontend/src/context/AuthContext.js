import React, { useReducer } from 'react';
import axios from 'axios';
import setToken from "./../helpers/setToken";

const initialState = {
    token: localStorage.getItem("token"),
    loading: true,
    error: '',
    isAuthenticated: null,
    // userData: {},
    // userId: localStorage.getItem("userId"),
    userData: JSON.parse(localStorage.getItem("userData")),
    users:[],
    userById: {}
}

const reducer = (stateAuth, action) => {
    switch(action.type) {
        case 'AUTH_SUCCESS':
            localStorage.setItem("token", action.payload.token);
            // localStorage.setItem("userId", action.payload.data.id);
            localStorage.setItem("userData", JSON.stringify(action.payload.data));
            return {
                ...stateAuth,
                ...action.payload,
                loading: false,
                error: '',
                isAuthenticated: true,
                userData: action.payload.data,
                // userData: localStorage.setItem("userData", JSON.stringify(action.payload.data)),
            };
        case 'AUTH_ERROR':
            localStorage.removeItem("token", action.payload.token);
            return {
                ...stateAuth,
                loading: false,
                error: 'Something went wrong!',
                isAuthenticated: false
            };
        case "UNAUTHENTICATED":
            return {
                ...stateAuth,
                isAuthenticated: false
            };
        case 'FETCH_USERS_SUCCESS':
            return {
                ...stateAuth,
                ...action.payload,
                loading: false,
                error: '',
                users: action.payload.data
            };
        case 'FETCH_USERS_ERROR':
            return {
                ...stateAuth,
                loading: false,
                error: 'Something went wrong!',
                users: []
            };
        case 'FETCH_USERID_SUCCESS':
            return {
                ...stateAuth,
                ...action.payload,
                loading: false,
                error: '',
                userById: action.payload.data
            };
        case 'FETCH_USERID_ERROR':
            return {
                ...stateAuth,
                loading: false,
                error: 'Something went wrong!',
                userById: {}
            };
        case 'EDIT_USERID_SUCCESS':
            return {
                ...stateAuth,
                ...action.payload
            }
        case 'EDIT_USERID_FAIL':
            return {
                ...stateAuth,
                error: 'Something went wrong!'
            }
        default:
            return stateAuth;
    }
}

const AuthContext = React.createContext(initialState);

function AuthProvider(props) {
    const [stateAuth, dispatch] = useReducer (reducer, initialState);
    
    //createUser or register
    const createUser = async (formData) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/users/",
                formData, 
                {headers: {'Content-Type': 'multipart/form-data'}}
            );
            dispatch({
                type: "AUTH_SUCCESS",
                payload: res.data
            });
            // console.log(res.data);
        } catch (error) {
            dispatch({
                type: "AUTH_ERROR",
                // payload: error.response.data
            });
            // console.log(error.response.data);
        }
    }

    //login
    const login = async (formData) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/users/login",
                formData
            );
            dispatch({
                type: "AUTH_SUCCESS",
                payload: res.data
            });
            // console.log(res.data);
        } catch (error) {
            dispatch({
                type: "AUTH_ERROR",
                // payload: error.response.data
            });
            // console.log(error.response.data);
        }
    }

    //logout
    const logout = () => {
        localStorage.clear();
        return {
            type: "UNAUTHENTICATED"
        };
    }

    //getUsers
    const getUsers = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/users`
            );
            dispatch({
                type: "FETCH_USERS_SUCCESS",
                payload: res.data
            });
            // console.log(res.data)
        } catch (error) {
            dispatch({
                type: "FETCH_USERS_ERROR",
            })
            // console.log(error.response.data)
        }
    }

    // getUserByUserId
    const getUserByUserId= async id => {
        try {
            const res = await axios.get(
                `http://localhost:5000/users/${id}`
            );
            dispatch({
                type: "FETCH_USERID_SUCCESS",
                payload: res.data
            });
            // console.log(res.data)
        } catch (error) {
            dispatch({
                type: "FETCH_USERID_ERROR",
            })
            // console.log(error.response.data)
        }
    }

    // updateUsers
    const updateUsers = async (formData) => {
        if (localStorage.token) {
            setToken(localStorage.token);
        }

        try {
            const res = await axios.patch(
                "http://localhost:5000/users/",
                formData,
                {headers: {'Content-Type': 'multipart/form-data'}}
            );
            dispatch({
                type: "EDIT_USERID_SUCCESS",
                payload: res.data
            });
            // console.log(res.data);
        } catch (error) {
            dispatch({
                type: "EDIT_USERID_FAIL",
                // payload: error.response.data
            });
            // console.log(error.response.data);
        }
    }
    // deleteUser

    return (
        <AuthContext.Provider value={{ stateAuth, dispatch, createUser, login, logout, getUsers, getUserByUserId, updateUsers}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider};




