import React, { useReducer } from 'react';
import axios from 'axios';
import setToken from "./../helpers/setToken";

const initialState = {
    loading: true,
    error: '',
    post: {}
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_PROJECT_SUCCESS':
            return {
                ...state,
                ...action.payload,
                loading: false,
                error: '',
                post: action.payload
            };
        case 'FETCH_PROJECT_ERROR':
            return {
                ...state,
                loading: false,
                error: 'Something went wrong!',
                post: {}
            };
        case 'ADD_PROJECT_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        case 'ADD_PROJECT_FAIL':
            return {
                ...state,
                error: 'Something went wrong!'
            }
        case 'EDIT_PROJECT_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        case 'EDIT_PROJECT_FAIL':
            return {
                ...state,
                error: 'Something went wrong!'
            }
        case "DELETE_PROJECT":
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
}

const TaskListContext = React.createContext(initialState);

function TaskListProvider(props) {
    const [state, dispatch] = useReducer (reducer, initialState);

    //getProjectByUserId
    const getProjectByUserId = async user_id => {
        try {
            const res = await axios.get(
                `http://localhost:5000/projects/${user_id}`
            );
            dispatch({
                type: "FETCH_PROJECT_SUCCESS",
                payload: res.data
            });
            // console.log(res.data)
        } catch (error) {
            dispatch({
                type: "FETCH_PROJECT_ERROR",
            })
            // console.log(error.response.data)
        }
    }

    //createProjectByUserId
    const createProjectByUserId = async (formData) => {
        if (localStorage.token) {
            setToken(localStorage.token);
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/projects/",
                formData
            );
            dispatch({
                type: "ADD_PROJECT_SUCCESS",
                payload: res.data
            });
            // console.log(res.data);
        } catch (error) {
            dispatch({
                type: "ADD_PROJECT_FAIL",
                // payload: error.response.data
            });
            // console.log(error.response.data);
        }
    }

    //updateProjects
    const updateProjects = async (formData) => {
        if (localStorage.token) {
            setToken(localStorage.token);
        }

        try {
            const res = await axios.patch(
                "http://localhost:5000/projects/",
                formData
            );
            dispatch({
                type: "EDIT_PROJECT_SUCCESS",
                payload: res.data
            });
            // console.log(res.data);
        } catch (error) {
            dispatch({
                type: "EDIT_PROJECT_FAIL",
                // payload: error.response.data
            });
            // console.log(error.response.data);
        }
    }

    // deleteProject
    const deleteProject = async (formData) => {
        if (localStorage.token) {
            setToken(localStorage.token);
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/projects/delete/",
                formData
            );
            dispatch({
                type: "DELETE_PROJECT",
                payload: res.data,
                payload1: formData,
            });
            // console.log(res.data);
            // console.log(formData);
            // console.log(state.post.data)
        } catch (error) {
            // console.log(error.response.data);
        }
    }

    return (
        <TaskListContext.Provider value={{ state, dispatch, getProjectByUserId, createProjectByUserId, updateProjects, deleteProject}}>
            {props.children}
        </TaskListContext.Provider>
    );
}

export { TaskListContext, TaskListProvider};

