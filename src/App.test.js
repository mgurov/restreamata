import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import kibanatorApp from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

let store = createStore(kibanatorApp)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
});