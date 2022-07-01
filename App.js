import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persister, store} from './src/redux/store';
import AppNav from './AppNav';


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <AppNav />
     
      </PersistGate>
    </Provider>
  );
};
export default App;
