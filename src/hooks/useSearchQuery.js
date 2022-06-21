import { useEffect, useRef, useState, useCallback } from 'react';

export const useSearchQuery = (fetchQueryFn) => {
	const timerRef = useRef(null);
	const cursorRef = useRef(null);
	const [value, setValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isAppending, setIsAppending] = useState(false);
	const [error, setError] = useState(false);
	const [data, setData] = useState({});
	const [paginationEnded, setPaginationEnded] = useState(false);

	const fetchData = useCallback(
		(searchValue, { append } = {}) => {
			if (append) {
				setIsAppending(true);
			} else {
				setIsLoading(true);
			}

			fetchQueryFn(searchValue, cursorRef.current)
				.then((responseData) => {
					const { repositoryCount, pageInfo, edges } = responseData.search;

					if (pageInfo.hasNextPage) {
						cursorRef.current = pageInfo.endCursor;
					} else {
						cursorRef.current = null;
						setPaginationEnded(true);
					}

					if (append) {
						setIsAppending(false);

						setData((prev) => ({
							...prev,
							repositoryCount: repositoryCount,
							edges: [...prev.edges, ...edges],
						}));
					} else {
						setIsLoading(false);

						setData({ repositoryCount, edges });

						if (pageInfo.hasNextPage) {
							setPaginationEnded(false);
						}
					}
				})
				.catch((err) => {
					console.log(err.message);

					if (append) {
						setIsAppending(false);
					} else {
						setIsLoading(false);
					}

					setError(err instanceof Error ? err.message : err);
				});
		},
		[fetchQueryFn],
	);

	useEffect(() => {
		if (value.length > 3) {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}

			timerRef.current = setTimeout(() => {
				fetchData(value);
				timerRef.current = null;
			}, 700);
		}
	}, [value, fetchData]);

	return {
		searchText: value,
		setSearchText: setValue,
		loading: isLoading,
		appending: isAppending,
		data,
		error,
		fetchData,
		paginationEnded,
	};
};
