import { gql } from 'graphql-request';

export const searchQuery = gql`
	query SearchMostTop10Star($queryString: String!, $afterCursor: String) {
		search(query: $queryString, type: REPOSITORY, first: 10, after: $afterCursor) {
			repositoryCount
			pageInfo {
				hasNextPage
				endCursor
			}
			edges {
				node {
					... on Repository {
						id
						name
						descriptionHTML
						stargazers {
							totalCount
						}
						forks {
							totalCount
						}
						updatedAt
					}
				}
			}
		}
	}
`;
