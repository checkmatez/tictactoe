import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import {
  SubscriptionClient,
  addGraphQLSubscriptions,
} from 'subscriptions-transport-ws'

import { AUTH_TOKEN_KEY } from './config/constants'
import App from './components/App'

const wsClient = new SubscriptionClient(
  process.env.REACT_APP_GRAPH_COOL_SUBSCRIPTIONS,
  {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN_KEY),
    },
  }
)
const networkInterface = createNetworkInterface({
  uri: process.env.REACT_APP_GRAPH_COOL_SIMPLE_API,
})

networkInterface.use([
  {
    applyMiddleware(request, next) {
      if (!request.options.headers) {
        request.options.headers = {}
      }

      const token = localStorage.getItem(AUTH_TOKEN_KEY)
      request.options.headers.authorization = token ? `Bearer ${token}` : null
      next()
    },
  },
])

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: o => o.id,
})

ReactDOM.render(
  <ApolloProvider client={client}><App /></ApolloProvider>,
  document.getElementById('root')
)
