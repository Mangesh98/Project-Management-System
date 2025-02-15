import { Dispatch } from "redux";
import * as actionType from "./ActionType";
import api from "@/Config/Config";
import { handleError } from "../Issue/Action";

export const createPayment= (planType: string) => async (dispatch: Dispatch) => {
	dispatch({ type: actionType.CREATE_PYAMENT_REQUEST });
	try {
		const { data } = await api.post(`/api/payments/${planType}`,);
		dispatch({ type: actionType.CREATE_PYAMENT_SUCCESS, data: data });
        if(data.payment_link_url){
            window.location.href=data.payment_link_url;
        }
	} catch (error) {
		handleError(error, actionType.CREATE_PYAMENT_FAILURE, dispatch);
	}
};