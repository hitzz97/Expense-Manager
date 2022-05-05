import { Provider } from 'react-redux';
import './App.css';
import OuterContainer from './components/ExpenseManager/OuterContainer';
import store from "./Redux/store"
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { Skeleton } from '@mui/material';
import NotFound from './components/NotFound';
import Accounts from './components/ExpenseManager/Accounts';

const persistor = persistStore(store)

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={
        <>
          <Skeleton />
          <Skeleton variant="rectangular" animation="wave" />
        </>
      }
        persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/app/:accName" element={
              // <div className="App">
              <OuterContainer />
              // </div>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
