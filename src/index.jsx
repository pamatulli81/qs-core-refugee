import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './containers/app';
import store from './store/store';

const appStore = store;

ReactDOM.render(<Provider store={appStore}><App /></Provider>, document.getElementById('index'));

export default appStore;