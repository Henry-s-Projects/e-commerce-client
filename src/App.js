import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DateProvider } from './GlobalState';
import Header from './components/headers/Header';
import MainPages from './components/mainpages/Pages';

function App() {
  return (
    <DateProvider>
      <Router>
        <div className="App">
          <Header />
          <MainPages />
        </div>
      </Router>
    </DateProvider>
  );
}

export default App;
