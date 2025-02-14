import { UserType } from "@/pages/IssueDetails/IssueDetails";
import { IssueType } from "../Issue/Action";
import * as actionType from "./ActionType";


 
  export interface ProjectType {
	id: number;
	name: string;
	description: string;
	category: string;
	tags: string[];
	owner: UserType;
	issues: IssueType[];
	team: UserType[];
  }
  
  export interface ChatType {
	id: number;
	name: string | null;
	project: ProjectType;
	users: UserType[];
  }
  export interface Message {
	id: number;
	content: string;
	createdAt: string;
	chat: ChatType;
	sender: UserType;
  }
  export interface ChatState {
	messages: Message[]; 
	loading: boolean;
	error: string | null;
	chat: ChatType | null;
  }
  
const initialState:ChatState = {
	messages: [],
	loading: false,
	error: null,
	chat: null,
};

export const chatReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case actionType.FETCH_MESSAGES_REQUEST:
		case actionType.SEND_MESSAGE_REQUEST:
		case actionType.FETCH_CHAT_MESSAGES_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case actionType.FETCH_MESSAGES_SUCCESS:
		case actionType.FETCH_CHAT_MESSAGES_SUCCESS:
			return {
				...state,
				loading: false,
				messages: action.messages,
			};
		case actionType.SEND_MESSAGE_SUCCESS:
			return {
				...state,
				loading: false,
				messages: [...state.messages, action.message],
			};
		case actionType.FETCH_CHAT_BY_PROJECT_SUCCESS:
			return {
				...state,
				loading: false,
				chat: action.chat,
			};
		case actionType.FETCH_MESSAGES_FAILURE:
		case actionType.SEND_MESSAGE_FAILURE:
		case actionType.FETCH_CHAT_MESSAGES_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		default:
			return state;
	}
};
