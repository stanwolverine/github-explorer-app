import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '@env';
import { authorize } from 'react-native-app-auth';

export const loginWithGithub = async () => {
	const config = {
		redirectUrl: 'com.my.app://oauth',
		clientId: GITHUB_CLIENT_ID,
		clientSecret: GITHUB_CLIENT_SECRET,
		scopes: [
			'user',
			'public_repo',
			'repo',
			'repo_deployment',
			'repo:status',
			'read:repo_hook',
			'read:org',
			'read:public_key',
			'read:gpg_key',
		],
		additionalHeaders: { Accept: 'application/json' },
		serviceConfiguration: {
			authorizationEndpoint: 'https://github.com/login/oauth/authorize',
			tokenEndpoint: 'https://github.com/login/oauth/access_token',
			revocationEndpoint: `https://github.com/settings/connections/applications/${GITHUB_CLIENT_ID}`,
		},
	};

	const authState = await authorize(config);

	return authState;
};
