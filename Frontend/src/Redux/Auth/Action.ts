import axios from "axios";
import { API_BASE_URL } from "@/Config/Config";
import {
	GET_USER_FAILURE,
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGOUT,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
} from "./ActionType";
import { Dispatch } from "redux";
import { LoginFormValues } from "@/pages/Auth/Login";

interface UserData {
	fullName?: string;
	email: string;
	password: string;
}

interface ApiResponse {
	jwt?: string;
	[key: string]: unknown;
}

export const register = (userData: UserData) => async (dispatch: Dispatch) => {
	dispatch({ type: REGISTER_REQUEST });
	try {
		const { data } = await axios.post<ApiResponse>(
			`${API_BASE_URL}/auth/signup`,
			userData
		);

		// console.log("register() : ", data);
		if (data.jwt) {
			localStorage.setItem("jwt", data.jwt);
			dispatch({ type: REGISTER_SUCCESS, payload: data });
		}
	} catch (err) {
		dispatch({ type: "REGISTER_FAIL", payload: err });
		console.log("register() :",err);
	}
};

export const login = (userData: LoginFormValues) => async (dispatch: Dispatch) => {
	dispatch({ type: LOGIN_REQUEST });
	try {
		const { data } = await axios.post<ApiResponse>(
			`${API_BASE_URL}/auth/login`,
			userData
		);
		// console.log("login() : ", data);

		if (data.jwt) {
			localStorage.setItem("jwt", data.jwt);
			dispatch({ type: LOGIN_SUCCESS, payload: data });
			// console.log(data);
		}
	} catch (err) {
		console.log("login() : ", err);
		dispatch({ type: "LOGIN_FAIL", payload: err });
	}
};

export const getUser = () => async (dispatch: Dispatch) => {
	dispatch({ type: GET_USER_REQUEST });
	try {
		const { data } = await axios.get<ApiResponse>(
			`${API_BASE_URL}/api/users/profile`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			}
		);
		
		if (data) {
			dispatch({ type: GET_USER_SUCCESS, payload: data });
			// console.log("getUser() : ", data);
		}
	} catch (error) {
		dispatch({ type: GET_USER_FAILURE });
		console.log("getUser() :",error);
	}
};

export const logout = () => async (dispatch: Dispatch) => {
	dispatch({ type: LOGOUT });
	localStorage.clear();
};
