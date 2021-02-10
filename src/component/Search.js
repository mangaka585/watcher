import React, { useState } from "react";

const Search = (props) => {
	const [searchValue, setSearchValue] = useState("");

	const handleSearchInputChange = (e) => {
		setSearchValue(e.target.value);
	}

	const resetInpoutField = () => {
		setSearchValue('');
	}

	const callSearchFunction = (e) => {
		e.preventDefault();
		props.search(searchValue);
		resetInpoutField();
	}

	return(
		<form className="search">
			<input value={searchValue} onChange={handleSearchInputChange} type="text" />
			<input onClick={callSearchFunction} type="submit" value="SEARCH" />
		</form>
	);
};

export default Search;