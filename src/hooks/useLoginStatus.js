import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { Constants } from '../utils/Constants';
import graphQlClient from '../utils/GraphqlClient';

export const LOGIN_STATUSES = {
	Loading: 10,
	LoggedIn: 20,
	LoggedOut: 30,
};

export const useLogin = () => {
	const [loginStatus, setLoginStatus] = useState(LOGIN_STATUSES.Loading);

	const login = useCallback((token) => {
		graphQlClient.setHeaders({ Authorization: `Bearer ${token}`, 'User-Agent': 'request' });

		setLoginStatus(LOGIN_STATUSES.LoggedIn);

		AsyncStorage.setItem(Constants.GITHUB_TOKEN, token);
	}, []);

	useEffect(() => {
		const getGithubToken = async () => {
			try {
				const token = await AsyncStorage.getItem(Constants.GITHUB_TOKEN);

				if (token) {
					login(token);
				} else {
					setLoginStatus(LOGIN_STATUSES.LoggedOut);
				}
			} catch (error) {
				setLoginStatus(LOGIN_STATUSES.LoggedOut);
			}
		};

		getGithubToken();
	}, [login]);

	return { loginStatus, login };
};
