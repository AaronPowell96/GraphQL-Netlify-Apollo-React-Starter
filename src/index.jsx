import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import {resolvers, typeDefs} from './state/resolvers'

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: '/.netlify/functions/apollo-graphql',
  cache,
  typeDefs,
  resolvers
});

client.writeData({
  data:{
    test: "Hello"
  }
})
const Application = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Application />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
