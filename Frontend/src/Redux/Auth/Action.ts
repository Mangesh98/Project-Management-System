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

export const register =
	(userData: any) =>
	async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
		dispatch({ type: REGISTER_REQUEST });
		try {
			const { data } = await axios.post(
				`${API_BASE_URL}/auth/signup`,
				userData
			);
			if (data.jwt) {
				localStorage.setItem("jwt", data.jwt);
				dispatch({ type: REGISTER_SUCCESS, payload: data });
				console.log(data);
			}
		} catch (err) {
			dispatch({ type: "REGISTER_FAIL", payload: err });
			console.log(err);
		}
	};

export const login =
	(userData: any) =>
	async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
		dispatch({ type: LOGIN_REQUEST });
		try {
			const { data } = await axios.post(
				`${API_BASE_URL}/auth/signin`,
				userData
			);
			if (data.jwt) {
				localStorage.setItem("jwt", data.jwt);
				dispatch({ type: LOGIN_SUCCESS, payload: data });
				console.log(data);
			}
		} catch (err) {
			dispatch({ type: "LOGIN_FAIL", payload: err });
			console.log(err);
		}
	};

export const getUser =
	() => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
		dispatch({ type: GET_USER_REQUEST });
		try {
			const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("jwt")}`,
				},
			});
			if (data.jwt) {
				dispatch({ type: GET_USER_SUCCESS, payload: data });
				console.log(data);
			}
		} catch (error) {
			dispatch({ type: GET_USER_FAILURE });
			console.log(error);
		}
	};

export const logout =
	() => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
		dispatch({ type: LOGOUT });
		// localStorage.removeItem("jwt");
		localStorage.clear();
		// window.location.reload();
	};
