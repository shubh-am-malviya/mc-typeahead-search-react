import "./App.css";
import ListBox from "./ListBox";
import SearchBox from "./SearchBox";

const maxItems = 5;

function App() {
	const transformResponse = (data) => data.results.slice(0, maxItems);

	const fetchPersonsPromise = async (query, signal) =>
		await fetch("https://swapi.dev/api/people/?search=" + query, { signal });

	return (
		<div className="wrapper">
			<SearchBox
				id="personName"
				name="personName"
				label="Enter Person Name"
				placeholder="Search your fav STAR WARS character"
				autoComplete
				style={{
					input: "input",
					label: "label",
				}}
				debounceWait={400}
				listBox={(items, activeIndex) => <ListBox items={items} activeIndex={activeIndex} />}
				noItemMessage={() => <div>Sorry no person found</div>}
				errorMessage={() => <div>Something went wrong</div>}
				transformResponse={transformResponse}
				fetchDataPromise={fetchPersonsPromise}
			/>
		</div>
	);
}
export default App;
