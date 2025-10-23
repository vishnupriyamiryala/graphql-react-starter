import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://graphqlzero.almansi.me/api',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: {
            keyArgs: ['options', ['paginate', ['page', 'limit']]],
            merge(_existing, incoming) {
              return incoming;
            },
          },
          user: {
            keyArgs: ['id'],
            merge(_existing, incoming) {
              return incoming;
            },
          },
        },
      },
      User: {
        keyFields: ['id'],
        fields: {
          posts: {
            keyArgs: false,
            merge(_existing, incoming) {
              return incoming;
            },
          },
          albums: {
            keyArgs: false,
            merge(_existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default client;
