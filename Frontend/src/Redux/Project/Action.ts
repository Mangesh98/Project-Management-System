import api from "@/Config/Config";
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
	INVITE_TO_PROJECT_SUCCESS,
	SEARCH_PROJECT_FAILURE,
	SEARCH_PROJECT_REQUEST,
	SEARCH_PROJECT_SUCCESS,
} from "./ActionType";
import { CreateProjectForm } from "@/pages/Project/CreateProjectForm";

interface FetchProjectsParams {
	category?: string;
	tag?: string;
}

interface DispatchArg {
	type: string;
	projects?: unknown;
}

export const fetchProjects =
	({category,tag}: FetchProjectsParams) =>
	async (dispatch: (arg: DispatchArg) => void) => {
		dispatch({ type: FETCH_PROJECT_REQUEST });
		try {
			const { data } = await api.get("/api/projects", {
				params: { category, tag},
			});
			// console.log("fetchProjects() : ", data);
			if (data) {
				dispatch({ type: FETCH_PROJECT_SUCCESS, projects: data });
			}
		} catch (error) {
			dispatch({ type: FETCH_PROJECT_FAILURE });
			console.log("fetchProjects() : ", error);
		}
	};

interface SearchProjectParams {
	search: string;
}

export const searchProject =
	({ search }: SearchProjectParams) =>
	async (dispatch: (arg: DispatchArg) => void) => {
		dispatch({ type: SEARCH_PROJECT_REQUEST });
		try {
			const { data } = await api.get("/api/projects/search?keyword=" + search);
			// console.log("searchProject() : ", data);

			if (data) {
				dispatch({ type: SEARCH_PROJECT_SUCCESS, projects: data });
			}
		} catch (error) {
			dispatch({ type: SEARCH_PROJECT_FAILURE });
			console.log("searchProject() : ", error);
		}
	};



interface DispatchProject {
	type: string;
	project?: any;
}

export const createProject =
	(projectData: CreateProjectForm) =>
	async (dispatch: (arg: DispatchProject) => void) => {
		dispatch({ type: CREATE_PROJECT_REQUEST });
		try {
			const { data } = await api.post("/api/projects", projectData);
			// console.log("createProject() : ", data);
			if (data) {
				dispatch({ type: CREATE_PROJECT_SUCCESS, project: data });
			}
		} catch (error) {
			dispatch({ type: CREATE_PROJECT_FAILURE });
			console.log("createProject() : ", error);
		}
	};

interface FetchProjectByIdParams {
	id: string;
}

export const fetchProjectById =
	({ id }: FetchProjectByIdParams) =>
	async (dispatch: (arg: DispatchProject) => void) => {
		dispatch({ type: FETCH_PROJECT_BY_ID_REQUEST });
		try {
			const { data } = await api.get(`/api/projects/${id}`);
			// console.log("fetchProjectById() : ", data);
			if (data) {
				dispatch({ type: FETCH_PROJECT_BY_ID_SUCCESS, project: data });
			}
		} catch (error) {
			dispatch({ type: FETCH_PROJECT_BY_ID_FAILURE });
			console.log("fetchProjectById() : ", error);
		}
	};


interface DispatchDeleteArg {
	type: string;
	projectId?: number;
}

export const deleteProject =
	(projectId :number) =>
	async (dispatch: (arg: DispatchDeleteArg) => void) => {
		dispatch({ type: DELETE_PROJECT_REQUEST });
		try {
			const { data } = await api.delete(`/api/projects/${projectId}`);
			// console.log("deleteProject() : ", data);
			if (data) {
				dispatch({ type: DELETE_PROJECT_SUCCESS, projectId });
			}
		} catch (error) {
			dispatch({ type: DELETE_PROJECT_FAILURE });
			console.log("deleteProject() : ", error);
		}
	};

interface InviteToProjectParams {
	projectId: string;
	email: string;
}

interface DispatchArg {
	type: string;
	payload?: any;
}

export const inviteToProject =
	({ projectId, email }: InviteToProjectParams) =>
	async (dispatch: (arg: DispatchArg) => void) => {
		dispatch({ type: INVITE_TO_PROJECT_REQUEST });
		try {
			const { data } = await api.post(`/api/projects/invite`, {
				email,
				projectId,
			});
			console.log("inviteToProject() : ", data);
			if (data) {
				dispatch({ type: INVITE_TO_PROJECT_SUCCESS, payload: data });
			}
		} catch (error) {
			dispatch({ type: INVITE_TO_PROJECT_FAILURE });
			console.log("inviteToProject() : ", error);
		}
	};
interface AcceptInvitationParams {
	token: string;
	navigate: (arg: string) => void;
}

export const acceptInvitation =
	({ token, navigate }: AcceptInvitationParams) =>
	async (dispatch: (arg: DispatchArg) => void) => {
		dispatch({ type: ACCEPT_PROJECT_INVITATION_REQUEST });
		try {
			const { data } = await api.get(`/api/projects/accept_invitation`, {
				params: {
					token: token,
				},
			});
			console.log("acceptInvitation() : ", data);
			if (data) {
				dispatch({ type: ACCEPT_PROJECT_INVITATION_SUCCESS, payload: data });
				navigate("/project/" + data.projectId);
			}
		} catch (error) {
			dispatch({ type: ACCEPT_PROJECT_INVITATION_FAILURE });
			console.log("acceptInvitation() : ", error);
		}
	};
