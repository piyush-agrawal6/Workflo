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

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "toDo" | "inProgress" | "underReview" | "finished";
  priority?: "Low" | "Medium" | "Urgent";
  deadline?: number;
  createdAt: number;
}
interface Action {
  type: string;
  payload?: any;
}
export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: boolean;
}

const initState: TaskState = {
  tasks: [],
  loading: false,
  error: false,
};

export const reducer = (
  state: TaskState = initState,
  action: Action
): TaskState => {
  switch (action.type) {
    case GET_TASK_LOADING: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case GET_TASK_SUCCESS: {
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: false,
      };
    }
    case GET_TASK_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    case CREATE_TASK_LOADING: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case CREATE_TASK_SUCCESS: {
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task],
        loading: false,
        error: false,
      };
    }
    case CREATE_TASK_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    case UPDATE_TASK_LOADING: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case UPDATE_TASK_SUCCESS: {
      let edited = state.tasks.map((el) => {
        if (el._id === action.payload.id) {
          return action.payload.data;
        } else return el;
      });
      return {
        ...state,
        tasks: edited,
        loading: false,
        error: false,
      };
    }

    case UPDATE_TASK_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    case DELETE_TASK_LOADING: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }

    case DELETE_TASK_SUCCESS: {
      let dataAfterDeletion = state.tasks.filter((el) => {
        if (el._id !== action.payload) {
          return el;
        }
      });

      return {
        ...state,
        loading: false,
        error: false,
        tasks: dataAfterDeletion,
      };
    }

    case DELETE_TASK_ERROR: {
      return {
        ...state,
        error: true,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};
