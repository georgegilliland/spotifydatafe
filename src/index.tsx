import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { SnackbarProvider } from 'notistack';
import './index.css';

const client = new ApolloClient({
  uri: "https://thejabronispotifydatapipeline.herokuapp.com/api",
  cache: new InMemoryCache(),
  headers: {
    'Authorization': "123546"
  }
});

ReactDOM.render(
  <React.StrictMode>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
