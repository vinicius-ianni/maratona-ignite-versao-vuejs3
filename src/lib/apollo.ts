import { ApolloClient, InMemoryCache } from '@apollo/client/core'

const cache = new InMemoryCache()

const apolloClientConn = new ApolloClient({
  cache,
    uri:
      import.meta.env.VITE_API_URL,
    headers: {
      Authorization:
        `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`
    }
  })

export default apolloClientConn

/*import { DefaultApolloClient, useQuery, provideApolloClient } from '@vue/apollo-composable'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'

import gql from 'graphql-tag'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  uri: 'https://api-us-west-2.graphcms.com/v2/cl5cjh0f905ac01ta2ym2foht/master',
})

provideApolloClient(apolloClient);

const getLessons = gql`
  query MyQuery {
  lessons {
    id
    title
    slug
    availableAt
    description
    videoId
  }
}
`
const { result } = useQuery(getLessons);


const lessons = result.value?.lessons

console.log(result);

console.log(lessons);
*/
//export let resultado = result;