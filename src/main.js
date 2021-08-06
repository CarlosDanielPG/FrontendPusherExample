import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from "apollo-link";
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import Pusher from 'pusher-js'
import PusherLink from './PusherLink'
import VueApollo from 'vue-apollo'
import App from './App'
import router from './router'

Vue.config.productionTip = false

const API_LOCATION = 'https://sandbox.obraapp.mx'
const BEARER_TOKEN = "1|ejbVrc8KYu4WJfcZw9srw7lxgDyO7K1xquKOIHxA"
const PUSHER_API_KEY = "583da0e828667768cba0"
const PUSHER_CLUSTER = "us2"

const pusherLink = new PusherLink({
  pusher: new Pusher(PUSHER_API_KEY, {
    cluster: PUSHER_CLUSTER,
    authEndpoint: `${API_LOCATION}/graphql/subscriptions/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    },
  }),
});

const authLink = setContext(async (_, { headers }) => {
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${BEARER_TOKEN}`,
    }
  }
})

const link = ApolloLink.from([pusherLink, authLink, new HttpLink({ uri: `${API_LOCATION}/graphql` })]);

// create the apollo client
const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

// install the vue plugin
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

/* eslint-disable no-new */

new Vue({ el: '#app', router, provide: apolloProvider.provide(), render: h => h(App) })