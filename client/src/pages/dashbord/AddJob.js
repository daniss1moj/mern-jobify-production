import { FormRow, Alert, FormRowSelect } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const AddJob = () => {
	const {
		isLoading,
		isEditing,
		showAlert,
		displayAlert,
		position,
		company,
		jobLocation,
		jobType,
		jobTypeOptions,
		status,
		statusOptions,
		handleChange,
		clearValues,
		createJob,
		clearAlert,
		editJob,
	} = useAppContext();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!position || !company || !jobLocation) {
			displayAlert();
			return;
		}
		if (isEditing) {
			editJob();
			return;
		}

		createJob();
		setTimeout(() => {
			clearAlert();
		}, 5000);
	};

	const handleJobInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		handleChange({ name, value });
	};

	return (
		<Wrapper>
			<form className="form" onSubmit={handleSubmit}>
				<h3>{isEditing ? 'Edit job' : 'Add job'}</h3>
				{showAlert && <Alert />}
				<div className="form-center">
					<FormRow
						type="text"
						name="position"
						value={position}
						handleChange={handleJobInput}
					/>
					<FormRow
						type="text"
						name="company"
						value={company}
						handleChange={handleJobInput}
					/>
					<FormRow
						type="text"
						name="jobLocation"
						labelText="Job Location"
						value={jobLocation}
						handleChange={handleJobInput}
					/>
					<FormRowSelect
						name="status"
						value={status}
						handleChange={handleJobInput}
						listOptions={statusOptions}
					/>
					<FormRowSelect
						name="jobType"
						labelText="type"
						value={jobType}
						handleChange={handleJobInput}
						listOptions={jobTypeOptions}
					/>
					<div className="btn-container">
						<button
							type="submit"
							className="btn btn-block submit-btn"
							disabled={isLoading}>
							submit
						</button>
						<button
							type="button"
							className="btn btn-block clear-btn"
							onClick={clearValues}>
							clear
						</button>
					</div>
				</div>
			</form>
		</Wrapper>
	);
};

export default AddJob;
