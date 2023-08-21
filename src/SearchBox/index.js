import React, { useState } from "react";
import useFetchPersons from "./useFetchPersons";

const SearchBox = ({
	id,
	name,
	label,
	placeholder,
	autoComplete,
	style,
	debounceWait,
	noItemMessage,
	errorMessage,
	listBox,
	transformResponse,
	fetchDataPromise,
}) => {
	const [query, setQuery] = useState("");
	const [activeIndex, setActiveIndex] = useState(null);
	const [isAutoComplete, setIsAutoComplete] = useState(autoComplete);

	const [data, setData, error] = useFetchPersons(
		query,
		fetchDataPromise,
		transformResponse,
		debounceWait,
		isAutoComplete
	);

	const handleQueryChange = (event) => {
		setQuery(event.target.value);
		setActiveIndex(null);
	};

	const handleKeyUp = (event) => {
		const keyCode = event.keyCode;

		if (keyCode === 13) {
			// ENTER key pressed
			if (activeIndex === null) return;
			console.log(data[activeIndex].name);
			setQuery(data[activeIndex].name);
			setData(null);
			setActiveIndex(null);
			setIsAutoComplete(false);
			return;
		}

		setIsAutoComplete(true);
		if (!data || data.length === 0) return;

		if (keyCode === 40) {
			// DOWN arrow key pressed
			if (activeIndex === null || activeIndex === data.length - 1) setActiveIndex(0);
			else setActiveIndex((prevActiveIndex) => prevActiveIndex + 1);
		} else if (keyCode === 38) {
			// UP arrow key pressed
			if (activeIndex === null || activeIndex === 0) setActiveIndex(data.length - 1);
			else setActiveIndex((prevActiveIndex) => prevActiveIndex - 1);
		}
	};

	return (
		<>
			<label className={style.label} htmlFor={name}>
				{label}
			</label>
			<br />
			<input
				className={style.input}
				type="text"
				name={name}
				id={id}
				value={query}
				placeholder={placeholder}
				autoComplete="off"
				onChange={handleQueryChange}
				onKeyUp={handleKeyUp}
			/>
			{data && data?.length > 0 && listBox(data, activeIndex)}
			{data && data.length === 0 && noItemMessage()}
			{error && errorMessage()}
		</>
	);
};

export default SearchBox;
