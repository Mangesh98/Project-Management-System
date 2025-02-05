import api from "@/Config/Config";
import * as actionType from "./ActionType";

export const createComment = (commentData: any) => async (dispatch: any) => {
	dispatch({ type: actionType.CREATE_COMMENT_REQUEST });
	try {
		const { data } = await api.post("/api/comments", commentData);
		console.log("createComment() : ", data);
		if (data) {
			dispatch({ type: actionType.CREATE_COMMENT_SUCCESS, comment: data });
		}
	} catch (error) {
		console.log("createComment() : ", error);
		if (error instanceof Error) {
			dispatch({
				type: actionType.CREATE_COMMENT_FAILURE,
				error: error.message,
			});
		} else {
			dispatch({
				type: actionType.CREATE_COMMENT_FAILURE,
				error: "An unknown error occurred",
			});
		}
	}
};

export const deleteComment = (commentId: any) => async (dispatch: any) => {
	dispatch({ type: actionType.DELETE_COMMENT_REQUEST });
	try {
		const { data } = await api.delete(`/api/comments/${commentId}`);
		console.log("deleteComment() : ", data);
		if (data) {
			dispatch({ type: actionType.DELETE_COMMENT_SUCCESS, commentId });
		}
	} catch (error) {
		console.log("deleteComment() : ", error);
		if (error instanceof Error) {
			dispatch({
				type: actionType.DELETE_COMMENT_FAILURE,
				error: error.message,
			});
		} else {
			dispatch({
				type: actionType.DELETE_COMMENT_FAILURE,
				error: "An unknown error occurred",
			});
		}
	}
};

export const fetchComments = (issueId: any) => async (dispatch: any) => {
	dispatch({ type: actionType.FETCH_COMMENTS_REQUEST });
	try {
		const { data } = await api.get(`/api/comments/${issueId}`);
		console.log("fetchComments() : ", data);
		if (data) {
			dispatch({ type: actionType.FETCH_COMMENTS_SUCCESS, comments: data });
		}
	} catch (error) {
		console.log("fetchComments() : ", error);
		if (error instanceof Error) {
			dispatch({
				type: actionType.FETCH_COMMENTS_FAILURE,
				error: error.message,
			});
		} else {
			dispatch({
				type: actionType.FETCH_COMMENTS_FAILURE,
				error: "An unknown error occurred",
			});
		}
	}
};
