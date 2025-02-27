import { ProjectType } from "@/pages/ProjectList/ProjectList";
import {
	ACCEPT_PROJECT_INVITATION_FAILURE,
	ACCEPT_PROJECT_INVITATION_REQUEST,
	ACCEPT_PROJECT_INVITATION_SUCCESS,
	CREATE_PROJECT_FAILURE,
	CREATE_PROJECT_REQUEST,
	CREATE_PROJECT_SUCCESS,
	DELETE_PROJECT_FAILURE,
	DELETE_PROJECT_REQUEST,
	DELETE_PROJECT_SUCCESS,
	FETCH_PROJECT_BY_ID_FAILURE,
	FETCH_PROJECT_BY_ID_REQUEST,
	FETCH_PROJECT_BY_ID_SUCCESS,
	FETCH_PROJECT_FAILURE,
	FETCH_PROJECT_REQUEST,
	FETCH_PROJECT_SUCCESS,
	INVITE_TO_PROJECT_FAILURE,
	INVITE_TO_PROJECT_REQUEST,
	SEARCH_PROJECT_SUCCESS,
} from "./ActionType";

const initialState = {
	projects: [],
	loading: false,
	error: null,
	projectDetails: null,
	searchProjects: [],
};

export const projectReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case FETCH_PROJECT_REQUEST:
		case CREATE_PROJECT_REQUEST:
		case DELETE_PROJECT_REQUEST:
		case FETCH_PROJECT_BY_ID_REQUEST:
		case ACCEPT_PROJECT_INVITATION_REQUEST:
		case INVITE_TO_PROJECT_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case FETCH_PROJECT_SUCCESS:
			return {
				...state,
				loading: false,
				projects: action.projects,
				error: null,
			};
		case SEARCH_PROJECT_SUCCESS:
			return {
				...state,
				loading: false,
				searchProjects: action.projects,
				error: null,
			};
		case CREATE_PROJECT_SUCCESS:
			return {
				...state,
				loading: false,
				projects: [...state.projects, action.project],
				error: null,
			};
		case FETCH_PROJECT_BY_ID_SUCCESS:
			return {
				...state,
				loading: false,
				projectDetails: action.project,
				error: null,
			};
		case DELETE_PROJECT_SUCCESS:
			return {
				...state,
				loading: false,
				projects: state.projects.filter(
					(project: ProjectType) => project.id !== action.projectId
				),
				error: null,
			};
		case ACCEPT_PROJECT_INVITATION_SUCCESS:
			return {
				...state,
				loading: false,
				projects: state.projects.map((project: ProjectType) => {
					if (project.id === action.projectId) {
						return {
							...project,
							accepted: true,
						};
					}
					return project;
				}),
			};

		case CREATE_PROJECT_FAILURE:
		case DELETE_PROJECT_FAILURE:
		case FETCH_PROJECT_FAILURE:
		case FETCH_PROJECT_BY_ID_FAILURE:
		case ACCEPT_PROJECT_INVITATION_FAILURE:
		case INVITE_TO_PROJECT_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
