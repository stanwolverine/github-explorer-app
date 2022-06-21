import React from 'react';

import SearchScreen from './src/screens/Search';
import LoginScreen from './src/screens/Login';
import { useLogin, LOGIN_STATUSES } from './src/hooks/useLoginStatus';

const App = () => {
	const { loginStatus, login } = useLogin();

	if (loginStatus === LOGIN_STATUSES.Loading) {
		return null;
	}

	if (loginStatus === LOGIN_STATUSES.LoggedIn) {
		return <SearchScreen />;
	}

	return <LoginScreen login={login} />;
};

export default App;
