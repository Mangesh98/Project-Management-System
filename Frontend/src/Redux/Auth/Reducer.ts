import { UserType } from "@/pages/IssueDetails/IssueDetails";
import {
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGOUT,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
} from "./ActionType";

export interface UserState {
	user: UserType | null;
	loading: boolean;
	error: string | null;
	jwt: string | null;
	projectSize: number;
}
const initialState: UserState = {
	user: null,
	loading: false,
	error: null,
	jwt: null,
	projectSize: 0,
};

export const authReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case REGISTER_REQUEST:
		case LOGIN_REQUEST:
		case GET_USER_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};

		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				jwt: action.payload.jwt,
				error: null,
			};

		case GET_USER_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.payload,
				error: null,
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};
