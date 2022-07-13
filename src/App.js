import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import Header from './components/headers/Header';
import MainRoute from './routes/MainRoute';

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <div className="App">
          <Header />
          <MainRoute />
        </div>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
