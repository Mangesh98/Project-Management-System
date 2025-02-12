import api from "@/Config/Config";
import * as actionType from "./ActionType";
import { ProjectType } from "@/pages/ProjectList/ProjectList";

export const fetchIssue = (id: any) => async (dispatch: any) => {
	dispatch({ type: actionType.FETCH_ISSUES_REQUEST });
	try {
		const { data } = await api.get(`/api/issues/project/${id}`);
		console.log("fetchIssue() : ", data);
		if (data) {
			dispatch({ type: actionType.FETCH_ISSUES_SUCCESS, issues: data });
		}
	} catch (error) {
		console.log("fetchIssue() : ", error);
		if (error instanceof Error) {
			dispatch({
				type: actionType.FETCH_ISSUES_FAILURE,
				error: error.message,
			});
		} else {
			dispatch({
				type: actionType.FETCH_ISSUES_FAILURE,
				error: "An unknown error occurred",
			});
		}
	}
};

export const fetchIssueById = (issueId: number) => async (dispatch: any) => {
	dispatch({ type: actionType.FETCH_ISSUES_BY_ID_REQUEST });
	try {
		const { data } = await api.get(`/api/issues/${issueId}`);
		console.log("fetchIssueById() : ", data);
		if (data) {
			dispatch({ type: actionType.FETCH_ISSUES_BY_ID_SUCCESS, issues: data });
		}
	} catch (error) {
		console.log("fetchIssueById() : ", error);
		if (error instanceof Error) {
			dispatch({
				type: actionType.FETCH_ISSUES_BY_ID_FAILURE,
				error: error.message,
			});
		} else {
			dispatch({
				type: actionType.FETCH_ISSUES_BY_ID_FAILURE,
				error: "An unknown error occurred",
			});
		}
	}
};

export const updateIssueStatus =
	(id: string, status: string) => async (dispatch: any) => {
		dispatch({ type: actionType.UPDATE_ISSUE_STATUS_REQUEST });
		try {
			const { data } = await api.put(`/api/issues/${id}/status/${status}`);
			console.log("updateIssueStatus() : ", data);
			if (data) {
				dispatch({
					type: actionType.UPDATE_ISSUE_STATUS_SUCCESS,
					issues: data,
				});
			}
		} catch (error) {
			console.log("updateIssueStatus() : ", error);
			if (error instanceof Error) {
				dispatch({
					type: actionType.UPDATE_ISSUE_STATUS_FAILURE,
					error: error.message,
				});
			} else {
				dispatch({
					type: actionType.UPDATE_ISSUE_STATUS_FAILURE,
					error: "An unknown error occurred",
				});
			}
		}
	};

export const assignedUserToIssue =
	({ issueId, userId }: { issueId: any; userId: any }) =>
	async (dispatch: any) => {
		dispatch({ type: actionType.ASSIGNED_ISSUE_TO_USER_REQUEST });
		try {
			const { data } = await api.put(
				`/api/issues/${issueId}/assignee/${userId}`
			);
			console.log("assignedUserToIssue() : ", data);
			if (data) {
				dispatch({
					type: actionType.ASSIGNED_ISSUE_TO_USER_SUCCESS,
					issue: data,
				});
			}
		} catch (error) {
			console.log("assignedUserToIssue() : ", error);
			if (error instanceof Error) {
				dispatch({
					type: actionType.ASSIGNED_ISSUE_TO_USER_FAILURE,
					error: error.message,
				});
			} else {
				dispatch({
					type: actionType.ASSIGNED_ISSUE_TO_USER_FAILURE,
					error: "An unknown error occurred",
				});
			}
		}
	};

export interface IssueType{
	id?: number;
	title: string;
	description: string;
	status: string;
	projectId:number,
	priority:string,
	dueDate:Date,
	project?:ProjectType;

}

export const createIssue = (issueData: IssueType) => async (dispatch:any) => {
	dispatch({ type: actionType.CREATE_ISSUE_REQUEST });
	try {
		const { data } = await api.post("/api/issues", issueData);
		console.log("createIssue() : ", data);
		if (data) {
			dispatch({ type: actionType.CREATE_ISSUE_SUCCESS, issue: data });
		}
	} catch (error) {
		console.log("createIssue() : ", error);
		if (error instanceof Error) {
			dispatch({ type: actionType.CREATE_ISSUE_FAILURE, error: error.message });
		} else {
			dispatch({
				type: actionType.CREATE_ISSUE_FAILURE,
				error: "An unknown error occurred",
			});
		}
	}
};
