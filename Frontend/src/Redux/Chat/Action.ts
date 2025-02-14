import api from "@/Config/Config";
import {
	FETCH_CHAT_BY_PROJECT_FAILURE,
	FETCH_CHAT_BY_PROJECT_REQUEST,
	FETCH_CHAT_BY_PROJECT_SUCCESS,
	FETCH_CHAT_MESSAGES_FAILURE,
	FETCH_CHAT_MESSAGES_REQUEST,
	FETCH_CHAT_MESSAGES_SUCCESS,
	SEND_MESSAGE_FAILURE,
	SEND_MESSAGE_REQUEST,
	SEND_MESSAGE_SUCCESS,
} from "./ActionType";
import { Dispatch } from "redux";
import { handleError } from "../Issue/Action";


export interface MessageType{
	senderID: number;
	projectID: number;
	content: string;
}
export const sendMessage = (messageData: MessageType) => async (dispatch: Dispatch) => {
	dispatch({ type: SEND_MESSAGE_REQUEST });
	try {
		const { data } = await api.post("/api/messages/send", messageData);
		dispatch({ type: SEND_MESSAGE_SUCCESS, message: data });
	} catch (error) {
		handleError(error, SEND_MESSAGE_FAILURE, dispatch);
	}
};



export const fetchChatByProject = (projectId: number) => async (dispatch: Dispatch) => {
	dispatch({ type: FETCH_CHAT_BY_PROJECT_REQUEST });
	try {
		const { data } = await api.get(`/api/projects/${projectId}/chat`);
		dispatch({ type: FETCH_CHAT_BY_PROJECT_SUCCESS, chat: data });
	} catch (error) {
		handleError(error, FETCH_CHAT_BY_PROJECT_FAILURE, dispatch);
	}
};

export const fetchChatMessages = (chatId: number) => async (dispatch: Dispatch) => {
	dispatch({ type: FETCH_CHAT_MESSAGES_REQUEST });
	try {
		const { data } = await api.get(`/api/messages/chat/${chatId}`);
		dispatch({ type: FETCH_CHAT_MESSAGES_SUCCESS, chatId, messages: data });
	} catch (error) {
		handleError(error, FETCH_CHAT_BY_PROJECT_FAILURE, dispatch);
	}
};
