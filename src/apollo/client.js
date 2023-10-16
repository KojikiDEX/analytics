import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.studio.thegraph.com/query/51072/kojiki-test/v0.0.1',
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})

export const healthClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/index-node/graphql',
  }),
  cache: new InMemoryCache(),
  shouldBatch: true,
})

export const blockClient = new ApolloClient({
  link: new HttpLink({
    // uri: 'https://api.studio.thegraph.com/query/45654/zksync-blocks/v0.0.5',
    uri: 'https://api.studio.thegraph.com/query/51072/kojiki-test-block/v0.0.2',
  }),
  cache: new InMemoryCache(),
})
