<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <h3>Mensajes de proyecto</h3>
      <ul v-if="!$apollo.queries.projectMessages.loading">
        <li v-for="(message, id) in projectMessages.data" :key="id">{{ message.body }}</li>
      </ul>

      <input
        type='text'
        class="form-control"
        placeholder="Type your message..."
        v-model="projectMessage"
        @keyup.enter="sendProjectMessage"
      >
    </div><br>
    <div>
      <h3>Mensajes generales</h3>
      <ul v-if="!$apollo.queries.messages.loading">
        <li v-for="(message, id) in messages.data" :key="id">{{ message.body }}</li>
      </ul>

      <input
        type='text'
        class="form-control"
        placeholder="Type your message..."
        v-model="message"
        @keyup.enter="sendMessage"
      >
    </div>
  </div>
</template>

<script>
import { CREATE_PROJECT_MESSAGE, CREATE_MESSAGE } from '../graphql/mutations'
import { PROJECT_MESSAGE_SENT_SUBSCRIPTION, MESSAGE_SENT_SUBSCRIPTION } from '../graphql/subscriptions'
import { PROJECT_MESSAGES, MESSAGES } from '../graphql/queries'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      projectMessage: '',
      message: ''
    };
  },
  apollo: {
    projectMessages: {
      query: PROJECT_MESSAGES,
      subscribeToMore: {
        document: PROJECT_MESSAGE_SENT_SUBSCRIPTION,
        updateQuery: (previousData, { subscriptionData }) => {
          console.log('Subscription data:', subscriptionData)
          return {
            projectMessages: {
              ...previousData.projectMessages,
              data: [subscriptionData.data.projectMessageCreated, ...previousData.projectMessages.data]
            },
          };
        },
      }
    },
    messages: {
      query: MESSAGES,
      subscribeToMore: {
        document: MESSAGE_SENT_SUBSCRIPTION,
        updateQuery: (previousData, { subscriptionData }) => {
          console.log('Subscription data:', subscriptionData)
          return {
            messages: {
              ...previousData.messages,
              data: [subscriptionData.data.messageCreated, ...previousData.messages.data]
            },
          };
        },
      }
    }
  },
  methods: {
    sendProjectMessage: async function() {
      const message = this.projectMessage;
      this.message = '';
      await this.$apollo.mutate({
        mutation: CREATE_PROJECT_MESSAGE,
        variables: {
          message
        },
      });
    },
    sendMessage: async function() {
      const message = this.message;
      this.message = '';
      await this.$apollo.mutate({
        mutation: CREATE_MESSAGE,
        variables: {
          message
        },
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
</style>
