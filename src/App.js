import { Provider } from 'react-redux';
import './App.css';
import OuterContainer from './components/ExpenseManager/OuterContainer';
import store from "./Redux/store"
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore';

const persistor = persistStore(store)

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <OuterContainer />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
