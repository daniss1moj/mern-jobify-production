const FormRow = ({ labelText, type = 'text', value, handleChange, name }) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{labelText || name}
			</label>
			<input
				id={name}
				name={name}
				type={type}
				value={value}
				onChange={handleChange}
				className="form-input"
			/>
		</div>
	);
};

export default FormRow;
