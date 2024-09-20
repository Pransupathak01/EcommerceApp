import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store';
import EcommerceApp from './src/EcommerceApp';

export default function App() {

  return (
    <Provider store={store}>
      <EcommerceApp/>  
    </Provider>
  );
}


