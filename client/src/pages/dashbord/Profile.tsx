import { useState } from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
const Profile = () => {
	const { user, showAlert, displayAlert, updateUser, isLoading, clearAlert } = useAppContext();
	const [name, setName] = useState(user?.name);
	const [email, setEmail] = useState(user?.email);
	const [lastName, setLastName] = useState(user?.lastName);
	const [location, setLocation] = useState(user?.location);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!name || !email || !lastName || !location) {
			displayAlert();
			return;
		}
		updateUser({ name, email, lastName, location });
		clearAlert();
	};

	return (
		<Wrapper>
			<form onSubmit={handleSubmit}>
				<h3>Profile</h3>
				{showAlert && <Alert />}
				<div className="form-center">
					<FormRow
						type="text"
						name="name"
						value={name}
						handleChange={(e) => setName(e.target.value)}
					/>
					<FormRow
						type="email"
						name="email"
						value={email}
						handleChange={(e) => setEmail(e.target.value)}
					/>
					<FormRow
						type="text"
						name="lastName"
						labelText="Last Name"
						value={lastName}
						handleChange={(e) => setLastName(e.target.value)}
					/>
					<FormRow
						type="text"
						name="location"
						value={location}
						handleChange={(e) => setLocation(e.target.value)}
					/>
					<button type="submit" className="btn btn-block" disabled={isLoading}>
						{isLoading ? "Please wait. Loading..." : "Save Changes"}
					</button>
				</div>
			</form>
		</Wrapper>
	);
};

export default Profile;
