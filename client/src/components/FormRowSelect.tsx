interface Props {
	labelText?: string;
	type?: string;
	value: string;
	handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	name: string;
	listOptions: string[];
}

const FormRowSelect = ({ labelText, name, value, handleChange, listOptions }: Props) => {
	return (
		<div className="form-row">
			<label htmlFor={name} className="form-label">
				{labelText || name}
			</label>
			<select name={name} id={name} value={value} onChange={handleChange} className="form-select">
				{listOptions.map((option, index) => {
					return (
						<option key={index} value={option}>
							{option}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default FormRowSelect;
