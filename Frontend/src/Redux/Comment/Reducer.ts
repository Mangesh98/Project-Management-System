import * as actionType from "./ActionType";
const initialState = {
	comments: [],
	loading: false,
	error: null,
};

export const chatReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case actionType.FETCH_COMMENTS_REQUEST:
		case actionType.CREATE_COMMENT_REQUEST:
		case actionType.DELETE_COMMENT_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case actionType.CREATE_COMMENT_SUCCESS:
			return {
				...state,
				loading: false,
				comments: [...state.comments, action.comment],
			};
		case actionType.DELETE_COMMENT_SUCCESS:
			return {
				...state,
				loading: false,
				comments: state.comments.filter((comment: any) => comment.id !== action.commentId),
			};
		case actionType.FETCH_COMMENTS_SUCCESS:
			return {
				...state,
				loading: false,
				comments: action.comments,
			};
		case actionType.CREATE_COMMENT_FAILURE:
		case actionType.DELETE_COMMENT_FAILURE:
		case actionType.FETCH_COMMENTS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		default:
			return state;
	}
};
