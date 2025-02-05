import api from "@/Config/Config";
import * as actionType from "./ActionType";



export const getUserSubscription= (jwt: any) => async (dispatch: any) => {
	dispatch({ type: actionType.GET_USER_SUBSCRIPTION_REQUEST});
	try {
		const { data } = await api.get(`/api/subscriptions/user`, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		}
		);
		console.log("getUserSubscription() : ", data);
		if (data) {
			dispatch({ type: actionType.GET_USER_SUBSCRIPTION_SUCCESS, payload: data });
		}
	} catch (error) {
		console.log("getUserSubscription() : ", error);
		if (error instanceof Error) {
			dispatch({
				type: actionType.GET_USER_SUBSCRIPTION_FAILURE,
				error: error.message,
			});
		} else {
			dispatch({
				type: actionType.GET_USER_SUBSCRIPTION_FAILURE,
				error: "An unknown error occurred",
			});
		}
	}
};

export const upgradeSubscription = (planType: string) => async (dispatch: any) => {
	dispatch({ type: actionType.UPGRADE_SUBSCRIPTION_REQUEST });
	try {
		const { data } = await api.post(`/api/subscriptions/upgrade/`, null, {
			params: {
				planType: planType,
			},
		});
        console.log("upgradeSubscription() : ", data);
        
		if (data) {
			dispatch({ type: actionType.UPGRADE_SUBSCRIPTION_SUCCESS, payload: data });
		}
		}
	catch (error) {
		console.log("upgradeSubscription() : ", error);
		if (error instanceof Error) {
			dispatch({
				type: actionType.UPGRADE_SUBSCRIPTION_FAILURE,
				error: error.message,
			});
		} else {
			dispatch({
				type: actionType.UPGRADE_SUBSCRIPTION_FAILURE,
				error: "An unknown error occurred",
			});
		}
	}
}