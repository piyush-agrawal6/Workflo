import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  LOGIN_ERROR,
  SIGNUP_ERROR,
  RESET_ERROR,
  GET_USER_LOADING,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
} from "./actionTypes";

interface AuthState {
  user: {
    name: string | null;
    email: string | null;
    id: string | null;
  };
  loading: boolean;
  error: boolean;
  errorMessage: string;
  token: string;
}

interface Action {
  type: string;
  payload?: any;
}

let token;
if (typeof window !== "undefined") {
  // Access localStorage here
  token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token") as string)
    : "";
}
const initState: AuthState = {
  user: {
    name: null,
    email: null,
    id: null,
  },
  loading: false,
  error: false,
  errorMessage: "",
  token: token || "",
};

export const reducer = (
  state: AuthState = initState,
  action: Action
): AuthState => {
  switch (action.type) {
    case SIGNUP_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: "",
        user: action.payload.newUser,
        token: action.payload.token,
      };
    }
    case SIGNUP_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.errorMessage,
      };
    }
    case LOGIN_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        error: false,
        errorMessage: "",
        token: action.payload.token,
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,

        loading: false,
        error: true,
        errorMessage: action.payload.errorMessage,
      };
    }

    case GET_USER_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        error: false,
        errorMessage: "",
      };
    }
    case GET_USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.errorMessage,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        user: {
          name: null,
          email: null,
          id: null,
        },

        loading: false,
        error: false,
        errorMessage: "",
        token: "",
      };
    }
    case RESET_ERROR:
      return { ...state, error: false, errorMessage: "" };
    default: {
      return state;
    }
  }
};
