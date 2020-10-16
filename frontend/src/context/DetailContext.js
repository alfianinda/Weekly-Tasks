import React, { useReducer } from 'react';
import axios from 'axios';
import setToken from "./../helpers/setToken";

const initialState = {
    loading: true,
    error: '',
    detail: {}
}

const reducer = (stateDetail, action) => {
    switch(action.type) {
        case 'FETCH_DETAIL_SUCCESS':
            return {
                ...stateDetail,
                ...action.payload,
                loading: false,
                error: '',
                detail: action.payload
            };
        case 'FETCH_DETAIL_ERROR':
            return {
                ...stateDetail,
                loading: false,
                error: 'Something went wrong!',
                detail: {}
            };
        case 'ADD_DETAIL_SUCCESS':
            return {
                ...stateDetail,
                ...action.payload
            }
        case 'ADD_DETAIL_FAIL':
            return {
                ...stateDetail,
                error: 'Something went wrong!'
            };
        case 'EDIT_DETAIL_SUCCESS':
            return {
                ...stateDetail,
                ...action.payload
            }
        case 'EDIT_DETAIL_FAIL':
            return {
                ...stateDetail,
                error: 'Something went wrong!'
            }
        case "DELETE_DETAIL":
            return {
                ...stateDetail,
                ...action.payload
            };
        default:
            return stateDetail
    }
}

const DetailContext = React.createContext(initialState);

function DetailProvider(props) {
    const [stateDetail, dispatch] = useReducer (reducer, initialState);

    //getDetailByProjectId
    const getDetailByProjectId = async project_id => {
        try {
            const res = await axios.get(
                `http://localhost:5000/details/${project_id}`
            );
            dispatch({
                type: "FETCH_DETAIL_SUCCESS",
                payload: res.data
            });
            // console.log(res.data)
        } catch (error) {
            dispatch({
                type: "FETCH_DETAIL_ERROR",
            })
            // console.log(error.response.data)
        }
    }

    //createDetailByUserIdByProjectId
    const createDetailByUserIdByProjectId = async (formData) => {
        if (localStorage.token) {
            setToken(localStorage.token);
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/details/",
                formData
            );
            dispatch({
                type: "ADD_DETAIL_SUCCESS",
                payload: res.data
            });
            // console.log(res.data);
        } catch (error) {
            dispatch({
                type: "ADD_DETAIL_FAIL",
                // payload: error.response.data
            });
            // console.log(error.response.data);
        }
    }

    //updateDetail
    const updateDetail = async (formData) => {
        if (localStorage.token) {
            setToken(localStorage.token);
        }

        try {
            const res = await axios.patch(
                "http://localhost:5000/details/",
                formData
            );
            dispatch({
                type: "EDIT_DETAIL_SUCCESS",
                payload: res.data
            });
            // console.log(res.data);
        } catch (error) {
            dispatch({
                type: "EDIT_DETAIL_FAIL",
                // payload: error.response.data
            });
            // console.log(error.response.data);
        }
    }

    // deleteDetail
    const deleteDetail = async (formData) => {
        if (localStorage.token) {
            setToken(localStorage.token);
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/details/delete/",
                formData
            );
            dispatch({
                type: "DELETE_DETAIL",
                payload: res.data,
                payload1: formData,
            });
            // console.log(res.data);
            // console.log(formData);
            // console.log(stateDetail.post.data)
        } catch (error) {
            // console.log(error.response.data);
        }
    }

    return (
        <DetailContext.Provider value={{ stateDetail, dispatch, createDetailByUserIdByProjectId, getDetailByProjectId, updateDetail, deleteDetail }}>
            {props.children}
        </DetailContext.Provider>
    );
}

export { DetailContext, DetailProvider};