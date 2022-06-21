import graphQlClient from '../../utils/GraphqlClient';
import { searchQuery } from './query';

export const searchRepos = (queryString, afterCursor) => {
	return graphQlClient.request(searchQuery, { queryString: queryString, afterCursor: afterCursor });
};
