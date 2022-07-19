import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import Header from './components/headers/Header';
import MainRoute from './routes/MainRoute';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <div className="App">
          <Header />
          <MainRoute />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
