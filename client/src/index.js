import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ChakraProvider} from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { baseUrl } from './config';

axios.defaults.baseURL = baseUrl

ReactDOM.render(
  <GoogleOAuthProvider clientId='649756563934-5s9tb6eocdj3j6nrg5k4fvmi226lk08o.apps.googleusercontent.com'>
    <React.StrictMode>
      <ChakraProvider>
        <App/>
      </ChakraProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
