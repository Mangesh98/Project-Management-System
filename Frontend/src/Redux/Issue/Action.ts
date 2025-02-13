import api from "@/Config/Config";
import * as actionType from "./ActionType";
import { ProjectType } from "@/pages/ProjectList/ProjectList";
import { Dispatch } from "redux";

// Define IssueType properly
export interface IssueType {
	id: number;
	title: string;
	description: string;
	status: string;
	projectId: number;
	priority: string;
	dueDate: Date;
	project?: ProjectType;
	assignee?: {
		id: number;
		fullName: string;
	};
}

// Reusable error handler
const handleError = (error: unknown, type: string, dispatch: Dispatch) => {
	console.log(`${type} :`, error);
	const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
	dispatch({ type, error: errorMessage });
};

export const fetchIssue = (id: number) => async (dispatch: Dispatch) => {
	dispatch({ type: actionType.FETCH_ISSUES_REQUEST });
	try {
		const { data } = await api.get(`/api/issues/project/${id}`);
		dispatch({ type: actionType.FETCH_ISSUES_SUCCESS, issues: data });
	} catch (error) {
		handleError(error, actionType.FETCH_ISSUES_FAILURE, dispatch);
	}
};

export const fetchIssueById = (issueId: number) => async (dispatch: Dispatch) => {
	dispatch({ type: actionType.FETCH_ISSUES_BY_ID_REQUEST });
	try {
		const { data } = await api.get(`/api/issues/${issueId}`);
		dispatch({ type: actionType.FETCH_ISSUES_BY_ID_SUCCESS, issueDetails: data });
	} catch (error) {
		handleError(error, actionType.FETCH_ISSUES_BY_ID_FAILURE, dispatch);
	}
};

export const updateIssueStatus = (issueId: number, status: string) => async (dispatch: Dispatch) => {
	dispatch({ type: actionType.UPDATE_ISSUE_STATUS_REQUEST });
	try {
		const { data } = await api.put(`/api/issues/${issueId}/status/${status}`);
		dispatch({ type: actionType.UPDATE_ISSUE_STATUS_SUCCESS, issue: data });
	} catch (error) {
		handleError(error, actionType.UPDATE_ISSUE_STATUS_FAILURE, dispatch);
	}
};

export const assigneIssueToUser = ({ issueId, userId }: { issueId: number; userId: number }) => async (dispatch: Dispatch) => {
	dispatch({ type: actionType.ASSIGNED_ISSUE_TO_USER_REQUEST });
	try {
		const { data } = await api.put(`/api/issues/${issueId}/assignee/${userId}`);
		dispatch({ type: actionType.ASSIGNED_ISSUE_TO_USER_SUCCESS, issue: data });
	} catch (error) {
		handleError(error, actionType.ASSIGNED_ISSUE_TO_USER_FAILURE, dispatch);
	}
};

export const createIssue = (issueData: IssueType) => async (dispatch: Dispatch) => {
	dispatch({ type: actionType.CREATE_ISSUE_REQUEST });
	try {
		const { data } = await api.post("/api/issues", issueData);
		dispatch({ type: actionType.CREATE_ISSUE_SUCCESS, issue: data });
	} catch (error) {
		handleError(error, actionType.CREATE_ISSUE_FAILURE, dispatch);
	}
};

export const deleteIssue=(issueId:number)=>async (dispatch:Dispatch)=>{
	dispatch({type:actionType.DELETE_ISSUE_REQUEST});
	
	
	try {
		await api.delete(`/api/issues/${issueId}`);
		dispatch({ type: actionType.DELETE_ISSUE_SUCCESS, issueId: issueId});
	} catch (error) {
		handleError(error, actionType.DELETE_ISSUE_FAILURE, dispatch);
	}
}