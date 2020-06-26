import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloProviderHooks} from 'react-apollo-hooks';
import client from './apollo';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloProviderHooks client={client}>
    <App />
    </ApolloProviderHooks>
    
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
if (module.hot) module.hot.accept();