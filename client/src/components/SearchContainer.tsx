import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useState, useMemo } from "react";
const SearchContainer = () => {
	const [localSearch, setLocalSearch] = useState("");
	const {
		isLoading,
		search,
		searchStatus,
		searchType,
		sort,
		sortOptions,
		handleChange,
		clearFilters,
		jobTypeOptions,
		statusOptions,
	} = useAppContext();

	const handleSearch = (e: React.ChangeEvent<HTMLSelectElement>) => {
		handleChange({ name: e.target.name, value: e.target.value });
	};

	const handleClear = () => {
		clearFilters();
		setLocalSearch("");
	};

	const debounce = () => {
		let timeoutID: any;
		return (e: React.ChangeEvent<HTMLInputElement>) => {
			setLocalSearch(e.target.value);
			clearTimeout(timeoutID);
			timeoutID = setTimeout(() => {
				handleChange({ name: e.target.name, value: e.target.value });
			}, 1000);
		};
	};

	const optimizedDebounce = useMemo(() => debounce(), []);
	return (
		<Wrapper>
			<form className="form">
				<h4>Search form</h4>
				<div className="form-center">
					<FormRow type="text" name="search" value={localSearch} handleChange={optimizedDebounce} />
					<FormRowSelect
						labelText="Status"
						name="searchStatus"
						value={searchStatus}
						handleChange={handleSearch}
						listOptions={["all", ...statusOptions]}
					/>
					<FormRowSelect
						labelText="Type"
						name="searchType"
						value={searchType}
						handleChange={handleSearch}
						listOptions={["all", ...jobTypeOptions]}
					/>
					<FormRowSelect
						labelText="Sort"
						name="sort"
						value={sort}
						handleChange={handleSearch}
						listOptions={sortOptions}
					/>
					<button
						type="button"
						className="btn btn-block btn-danger"
						disabled={isLoading}
						onClick={handleClear}>
						clear filters
					</button>
				</div>
			</form>
		</Wrapper>
	);
};

export default SearchContainer;
