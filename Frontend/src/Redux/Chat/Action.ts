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

interface MessageData {
	[key: string]: any;
}

export const sendMessage =
	(messageData: MessageData) =>
	async (
		dispatch: (arg0: { type: string; message?: any; error?: string }) => void
	) => {
		dispatch({ type: SEND_MESSAGE_REQUEST });
		try {
			const { data } = await api.post("/api/messages/send", messageData);
			console.log("sendMessage() : ", data);
			if (data) {
				dispatch({ type: SEND_MESSAGE_SUCCESS, message: data });
			}
		} catch (error) {
			console.log("sendMessage() : ", error);
			if (error instanceof Error) {
				dispatch({
					type: SEND_MESSAGE_FAILURE,
					error: error.message,
				});
			} else {
				dispatch({
					type: SEND_MESSAGE_FAILURE,
					error: "An unknown error occurred",
				});
			}
		}
	};
interface FetchChatByProjectAction {
	type: string;
	chat?: any;
	error?: string;
}

export const fetchChatByProject =
	(projectId: string) =>
	async (dispatch: (action: FetchChatByProjectAction) => void) => {
		dispatch({ type: FETCH_CHAT_BY_PROJECT_REQUEST });
		try {
			const { data } = await api.get(`/api/projects/${projectId}/chat`);
			console.log("fetchChatByProject() : ", data);
			if (data) {
				dispatch({ type: FETCH_CHAT_BY_PROJECT_SUCCESS, chat: data });
			}
		} catch (error) {
			console.log("fetchChatByProject() : ", error);
			if (error instanceof Error) {
				dispatch({ type: FETCH_CHAT_BY_PROJECT_FAILURE, error: error.message });
			} else {
				dispatch({
					type: FETCH_CHAT_BY_PROJECT_FAILURE,
					error: "An unknown error occurred",
				});
			}
		}
	};

export const fetchChatMessages = (chatId: string) => async (dispatch: any) => {
	dispatch({ type: FETCH_CHAT_MESSAGES_REQUEST });
	try {
		const { data } = await api.get(`/api/messages/chat/${chatId}`);
		console.log("fetchChatMessages() : ", data);
		if (data) {
			dispatch({ type: FETCH_CHAT_MESSAGES_SUCCESS, chatId, messages: data });
		}
	} catch (error) {
		console.log("fetchChatMessages() : ", error);
		if (error instanceof Error) {
			dispatch({ type: FETCH_CHAT_MESSAGES_FAILURE, error: error.message });
		} else {
			dispatch({
				type: FETCH_CHAT_MESSAGES_FAILURE,
				error: "An unknown error occurred",
			});
		}
	}
};
