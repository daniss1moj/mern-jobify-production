import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialState = {
	name: '',
	email: '',
	password: '',
	isMember: false,
};

const Register = () => {
	const [values, setValues] = useState(initialState);
	const { user, isLoading, showAlert, displayAlert, clearAlert, setupUser } = useAppContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate('/');
			}, 4000);
		}
	}, [user]);
	const toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember });
	};

	const onChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const { name, email, password, isMember } = values;
		if (!email || !password || (!isMember && !name)) {
			displayAlert();
			return;
		}
		const currentUser = { name, email, password };
		if (isMember) {
			setupUser({
				currentUser,
				endPoint: 'login',
				alertText: 'Login completed successfully! Rederecting...',
			});
		} else {
			setupUser({
				currentUser,
				endPoint: 'register',
				alertText: 'User created! Rederecting...',
			});
		}
		setTimeout(() => {
			clearAlert();
		}, 3000);
	};

	const testUserLogin = () => {
		setupUser({
			currentUser: { email: 'john1@gmail.com', password: 'secret' },
			endPoint: 'login',
			alertText: 'Login completed successfully! Rederecting...',
		});
	};

	return (
		<Wrapper className="full-page">
			<form className="form" onSubmit={onSubmit}>
				<Logo />
				{values.isMember ? <h3>Login</h3> : <h3>Register</h3>}
				{showAlert && <Alert />}
				{!values.isMember && (
					<FormRow
						labelText="Name"
						name="name"
						value={values.name}
						handleChange={onChange}
					/>
				)}
				<FormRow
					labelText="Email"
					type="email"
					name="email"
					value={values.email}
					handleChange={onChange}
				/>
				<FormRow
					labelText="Password"
					type="password"
					name="password"
					value={values.password}
					handleChange={onChange}
				/>
				<button type="submit" className="btn btn-block" disabled={isLoading}>
					Submit
				</button>
				<button
					type="button"
					className="btn btn-block btn-hipster"
					disabled={isLoading}
					onClick={testUserLogin}>
					{isLoading ? 'Loading...' : 'Demo app'}
				</button>
				<p>
					{values.isMember ? 'Not a member yet?' : 'Already a member?'}
					<button type="button" onClick={toggleMember} className="member-btn">
						{values.isMember ? 'Register' : 'Login'}
					</button>
				</p>
			</form>
		</Wrapper>
	);
};

export default Register;
