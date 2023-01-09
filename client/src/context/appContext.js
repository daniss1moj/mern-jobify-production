import React, { useReducer, useEffect, useContext } from 'react';
import reducer from './reducer';
import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	TOGGLE_SIDEBAR,
	LOGOUT_USER,
	UPDATE_USER_BEGIN,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ERROR,
	HANDLE_CHANGE,
	CLEAR_VALUES,
	CREATE_JOB_BEGIN,
	CREATE_JOB_SUCCESS,
	CREATE_JOB_ERROR,
	GET_JOBS_BEGIN,
	GET_JOBS_SUCCESS,
	SET_EDIT_JOB,
	DELETE_JOB_BEGIN,
	EDIT_JOB_BEGIN,
	EDIT_JOB_SUCCESS,
	EDIT_JOB_ERROR,
	SHOW_STATS_BEGIN,
	SHOW_STATS_SUCCESS,
	CLEAR_FILTERS,
	CHANGE_PAGE,
	DELETE_JOB_ERROR,
} from './actions';
import axios from 'axios';

const token = JSON.parse(localStorage.getItem('token'));
const user = JSON.parse(localStorage.getItem('user'));
const location = JSON.parse(localStorage.getItem('location'));

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: '',
	alertType: '',
	user: user || null,
	token: token || null,
	userLocation: location || '',
	jobLocation: location || '',
	showSidebar: false,
	isEditing: false,
	editJobId: '',
	position: '',
	company: '',
	jobTypeOptions: ['full-time', 'part-time', 'remote', 'intership'],
	jobType: 'full-time',
	statusOptions: ['interview', 'declined', 'pending'],
	status: 'pending',
	jobs: [],
	totalJobs: 0,
	numOfPages: 1,
	page: 1,
	stats: {},
	monthlyApplications: [],
	search: '',
	searchStatus: 'all',
	searchType: 'all',
	sort: 'latest',
	sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const authFetch = axios.create({
		baseURL: '/api/v1',
		headers: {
			Authorization: `Bearer ${state.token}`,
		},
	});

	// request
	authFetch.interceptors.request.use(
		(config) => {
			config.headers.Authorization = `Bearer ${state.token}`;
			return config;
		},
		(error) => {
			console.log(error.response);

			return Promise.reject(error);
		},
	);

	authFetch.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			console.log(error.response);
			if (error.response.status === 401) {
				logout();
			}
			return Promise.reject(error);
		},
	);

	// axios.defaults.headers.Authorization = `Bearer ${state.token}`;

	const displayAlert = () => {
		dispatch({ type: DISPLAY_ALERT });
	};

	const clearAlert = () => {
		dispatch({ type: CLEAR_ALERT });
	};

	const toggleSidebar = () => {
		dispatch({ type: TOGGLE_SIDEBAR });
	};

	const logout = () => {
		removeUserFromLocalStorage();
		dispatch({ type: LOGOUT_USER });
	};

	const clearValues = () => {
		dispatch({ type: CLEAR_VALUES });
	};

	const updateUser = async (currentUser) => {
		try {
			dispatch({ type: UPDATE_USER_BEGIN });
			const { data } = await authFetch.patch('/auth/updateUser', currentUser);
			const { user, location, token } = data;
			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: { user, location, token, alertText: 'User updated!' },
			});
			addUserToLocalStorage({ user, token, location });
		} catch (err) {
			if (err.response.status !== 401) {
				dispatch({ type: UPDATE_USER_ERROR, payload: err.response.data.msg });
			}
		}
		setTimeout(() => {
			clearAlert();
		}, 5000);
	};

	const handleChange = ({ name, value }) => {
		dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
	};

	const addUserToLocalStorage = ({ user, token, location }) => {
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('token', JSON.stringify(token));
		localStorage.setItem('location', JSON.stringify(location));
	};

	const removeUserFromLocalStorage = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		localStorage.removeItem('location');
	};

	const setupUser = async ({ currentUser, endPoint, alertText }) => {
		dispatch({ type: SETUP_USER_BEGIN });
		try {
			const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser);
			const { user, token, location } = data;
			dispatch({ type: SETUP_USER_SUCCESS, payload: { user, token, location, alertText } });
			addUserToLocalStorage({ user, token, location });
		} catch (error) {
			dispatch({ type: SETUP_USER_ERROR, payload: { msg: error.response.data.msg } });
		}
	};

	const createJob = async () => {
		dispatch({ type: CREATE_JOB_BEGIN });

		try {
			const { position, company, jobLocation, jobType, status } = state;
			await authFetch.post('/jobs', {
				position,
				company,
				jobLocation,
				jobType,
				status,
			});
			dispatch({
				type: CREATE_JOB_SUCCESS,
				payload: {
					alertText: 'Job added successfully!',
				},
			});
			dispatch({ type: CLEAR_VALUES });
		} catch (err) {
			if (err.response.status === 401) return;
			dispatch({ type: CREATE_JOB_ERROR, payload: { msg: err.response.data.msg } });
		}
	};

	const getJobs = async () => {
		const { search, searchStatus, searchType, sort, page } = state;
		let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
		if (search) {
			url = url + `&search=${search}`;
		}
		dispatch({ type: GET_JOBS_BEGIN });
		try {
			const { data } = await authFetch.get(url);
			const { jobs, totalJobs, numOfPages } = data;
			dispatch({
				type: GET_JOBS_SUCCESS,
				payload: {
					jobs,
					totalJobs,
					numOfPages,
				},
			});
		} catch (err) {
			logout();
		}
	};

	const setEditJob = (id) => {
		dispatch({
			type: SET_EDIT_JOB,
			payload: {
				id,
			},
		});
	};

	const editJob = async () => {
		dispatch({ type: EDIT_JOB_BEGIN });
		try {
			const { position, company, jobLocation, jobType, status } = state;
			await authFetch.patch(`/jobs/${state.editJobId}`, {
				company,
				position,
				jobLocation,
				jobType,
				status,
			});
			dispatch({ type: EDIT_JOB_SUCCESS });
			dispatch({ type: CLEAR_VALUES });
		} catch (err) {
			if (err.response.status === 401) return;
			dispatch({ type: EDIT_JOB_ERROR, payload: { msg: err.response.data.msg } });
		}
		setTimeout(() => {
			clearAlert();
		}, 5000);
	};

	const deleteJob = async (jobId) => {
		dispatch({ type: DELETE_JOB_BEGIN });
		try {
			await authFetch.delete(`/jobs/${jobId}`);
			getJobs();
		} catch (err) {
			if (err.response.status === 401) return;
			dispatch({ type: DELETE_JOB_ERROR, payload: { msg: err.response.data.msg } });
		}
		setTimeout(() => {
			clearAlert();
		}, 5000);
	};

	const showStats = async () => {
		dispatch({ type: SHOW_STATS_BEGIN });
		try {
			const { data } = await authFetch.get('/jobs/stats');
			dispatch({
				type: SHOW_STATS_SUCCESS,
				payload: {
					stats: data.defaultStats,
					monthlyApplications: data.monthlyApplications,
				},
			});
		} catch (err) {
			logout();
		}
	};

	const clearFilters = () => {
		dispatch({ type: CLEAR_FILTERS });
	};

	const changePage = (pageNumber) => {
		dispatch({
			type: CHANGE_PAGE,
			payload: {
				page: pageNumber,
			},
		});
	};

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				clearAlert,
				setupUser,
				toggleSidebar,
				logout,
				updateUser,
				handleChange,
				clearValues,
				createJob,
				getJobs,
				setEditJob,
				deleteJob,
				editJob,
				showStats,
				clearFilters,
				changePage,
			}}>
			{children}
		</AppContext.Provider>
	);
};

const useAppContext = () => {
	return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
