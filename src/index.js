import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider } from 'notistack';
import './index.css';

const client = new ApolloClient({
  uri: "https://thejabronispotifydatapipeline.herokuapp.com/api/",
  cache: new InMemoryCache()
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
