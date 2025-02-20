import { UserType } from "@/pages/IssueDetails/IssueDetails";
import * as actionType from "./ActionType";

interface userSubscription {
	id: number;
	planType: string;
	isValid: boolean;
	user:UserType
	subscriptionStartDate: string;
	subscriptionEndDate: string;
}
export interface SubscriptionState {
	userSubscription: userSubscription | null;
	loading: boolean;
	error: string | null;
}
const initialState :SubscriptionState= {
	userSubscription: null,
	loading: false,
	error: null,
};

export const subscriptionReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case actionType.GET_USER_SUBSCRIPTION_REQUEST:
		case actionType.UPGRADE_SUBSCRIPTION_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case actionType.GET_USER_SUBSCRIPTION_SUCCESS:
		case actionType.UPGRADE_SUBSCRIPTION_SUCCESS:
			return {
				...state,
				loading: false,
				userSubscription: action.payload,
			};
		case actionType.GET_USER_SUBSCRIPTION_FAILURE:
		case actionType.UPGRADE_SUBSCRIPTION_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		default:
			return state;
	}
};
