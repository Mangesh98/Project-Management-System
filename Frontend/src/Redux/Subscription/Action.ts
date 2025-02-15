import api from "@/Config/Config";
import * as actionType from "./ActionType";
import { Dispatch } from "redux";



export const getUserSubscription= (jwt: string) => async (dispatch: Dispatch) => {
	dispatch({ type: actionType.GET_USER_SUBSCRIPTION_REQUEST});
	try {
		const { data } = await api.get(`/api/subscriptions/user`, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		}
		);
		console.log("getUserSubscription() : ", data);
			dispatch({ type: actionType.GET_USER_SUBSCRIPTION_SUCCESS, payload: data });
} catch (error) {
			dispatch({ type: actionType.GET_USER_SUBSCRIPTION_FAILURE});
			console.log("fetchProjectById() : ", error);
		}
};

export const upgradeSubscription = (planType: string) => async (dispatch: Dispatch) => {
	dispatch({ type: actionType.UPGRADE_SUBSCRIPTION_REQUEST });
	try {
		const { data } = await api.post(`/api/subscriptions/upgrade/`, {
			params: {
				planType: planType,
			},
		});
			dispatch({ type: actionType.UPGRADE_SUBSCRIPTION_SUCCESS, payload: data });
	} catch (error) {
			dispatch({ type: actionType.UPGRADE_SUBSCRIPTION_FAILURE});
			console.log("fetchProjectById() : ", error);
		}
}