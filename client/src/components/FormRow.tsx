interface Props {
	labelText?: string;
	type?: string;
	value: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	name: string;
}

const FormRow = ({ labelText, type = "text", value, handleChange, name }: Props) => {
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
