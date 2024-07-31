import axios from "axios";
import {
  CREATE_TASK_ERROR,
  CREATE_TASK_LOADING,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  DELETE_TASK_LOADING,
  DELETE_TASK_SUCCESS,
  GET_TASK_ERROR,
  GET_TASK_LOADING,
  GET_TASK_SUCCESS,
  UPDATE_TASK_ERROR,
  UPDATE_TASK_LOADING,
  UPDATE_TASK_SUCCESS,
} from "./actionTypes";
import { Dispatch } from "redux";

const BASE_URI = process.env.NEXT_PUBLIC_API_URL;

interface addTaskData {
  title: string;
  description?: string;
  status: string;
  priority?: string;
  deadline?: number;
}

//! Get Tasks

export const getTasks = () => async (dispatch: Dispatch) => {
  dispatch({ type: GET_TASK_LOADING });
  try {
    let result = await axios.get(`${BASE_URI}/task/get`, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token") as string),
      },
    });
    dispatch({ type: GET_TASK_SUCCESS, payload: result.data.tasks });
  } catch (error) {
    dispatch({ type: GET_TASK_ERROR });
  }
};

//! Create Task

export const createTask = (data: addTaskData) => async (dispatch: Dispatch) => {
  dispatch({ type: CREATE_TASK_LOADING });
  try {
    let newTask = await axios.post(`${BASE_URI}/task/add`, data, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token") as string),
      },
    });
    dispatch({ type: CREATE_TASK_SUCCESS, payload: newTask.data });
  } catch (error) {
    dispatch({ type: CREATE_TASK_ERROR });
  }
};

//! Update a Task

export const updateTask =
  (id: string, data: Partial<addTaskData>) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_TASK_LOADING });
    try {
      await axios.patch(`${BASE_URI}/task/edit/${id}`, data, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token") as string),
        },
      });
      dispatch({ type: UPDATE_TASK_SUCCESS, payload: { id, data } });
    } catch (error) {
      console.log(error);
      dispatch({ type: UPDATE_TASK_ERROR });
    }
  };

//! Delete a Task

export const deleteTask = (id: string) => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_TASK_LOADING });
  try {
    await axios.delete(`${BASE_URI}/task/delete/${id}`, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token") as string),
      },
    });

    dispatch({ type: DELETE_TASK_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_TASK_ERROR });
  }
};
