import api from "@/Config/Config";
import * as actionType from "./ActionType";
import { Dispatch } from "redux";
import { handleError } from "../Issue/Action";

export interface CommentDataType {
	issueId: number;
	content: string;
}

export const createComment = (commentData: CommentDataType) => async (dispatch: Dispatch) => {
	dispatch({ type: actionType.CREATE_COMMENT_REQUEST });
	try {
		const { data } = await api.post("/api/comments", commentData);
		dispatch({ type: actionType.CREATE_COMMENT_SUCCESS, comment: data });
	} catch (error) {
		handleError(error, actionType.CREATE_COMMENT_FAILURE, dispatch);
	}
};



export const deleteComment = (commentId: number) => async (dispatch: Dispatch) => {
	dispatch({ type: actionType.DELETE_COMMENT_REQUEST });
	try {
		await api.delete(`/api/comments/${commentId}`);
		dispatch({ type: actionType.DELETE_COMMENT_SUCCESS, commentId });
	} catch (error) {
		handleError(error, actionType.DELETE_COMMENT_FAILURE, dispatch);
	}
};

export const fetchComments = (issueId: number) => async (dispatch: Dispatch) => {
	dispatch({ type: actionType.FETCH_COMMENTS_REQUEST });
	try {
		const { data } = await api.get(`/api/comments/${issueId}`);
		dispatch({ type: actionType.FETCH_COMMENTS_SUCCESS, comments: data });
	} catch (error) {
		handleError(error, actionType.FETCH_COMMENTS_FAILURE, dispatch);
	}
};
