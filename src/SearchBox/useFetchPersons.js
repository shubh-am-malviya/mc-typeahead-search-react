import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

const useFetchPersons = (
	query,
	fetchDataPromise,
	transformResponse,
	debounceWait,
	autoComplete
) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const fetchData = useCallback(
		debounce(async (query, transformResponse, signal) => {
			try {
				const response = await fetchDataPromise(query, signal);
				if (!response.ok) throw new Error(response.statusText);
				const data = await response.json();
				setData(transformResponse(data));
			} catch (e) {
				if (!signal.aborted) setError(e);
			}
		}, debounceWait),
		[debounceWait, fetchDataPromise]
	);

	useEffect(() => {
		if (query === "" || !autoComplete) {
			setData(null);
			setError(null);
			return;
		}

		const controller = new AbortController();
		const signal = controller.signal;

		fetchData(query, transformResponse, signal);

		return () => {
			controller.abort();
		};
	}, [query, transformResponse, fetchData, autoComplete]);

	return [data, setData, error];
};

export default useFetchPersons;
