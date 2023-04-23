import { AxiosRequestConfig } from "axios";

export interface ContextInterface {
	isLoading: boolean;
	showAlert: boolean;
	alertText: string;
	alertType: string;
	user: any;
	token: string | null;
	userLocation: string | null;
	jobLocation: string;
	showSidebar: boolean;
	isEditing: boolean;
	editJobId: string;
	position: string;
	company: string;
	jobTypeOptions: string[];
	jobType: string;
	statusOptions: string[];
	status: string;
	jobs: any[];
	totalJobs: number;
	numOfPages: number;
	page: number;
	stats: any;
	monthlyApplications: any[];
	search: string;
	searchStatus: string;
	searchType: string;
	sort: string;
	sortOptions: string[];
	getJobs: () => void;
	toggleSidebar: () => void;
	logout: () => void;
	handleChange: ({ name, value }: { name: string; value: string }) => void;
	clearFilters: () => void;
	setEditJob: (_id: string) => void;
	deleteJob: (_id: string) => void;
	changePage: (pageNumber: number) => void;
	displayAlert: () => void;
	clearAlert: () => void;
	setupUser: ({
		currentUser,
		endPoint,
		alertText,
	}: {
		currentUser: any;
		endPoint: string;
		alertText: string;
	}) => void;
	updateUser: (currentUser: any) => void;
	clearValues: () => void;
	createJob: () => void;
	editJob: () => void;
	showStats: () => void;
}

export interface AuthFetchConfig extends AxiosRequestConfig {
	headers: {
		Authorization: string;
	};
}
