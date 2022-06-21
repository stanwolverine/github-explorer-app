import { GraphQLClient } from 'graphql-request';

const graphQlClient = new GraphQLClient('https://api.github.com/graphql');

export default graphQlClient;
