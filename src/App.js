import './App.css';
import React from 'react';
import Login from './Components/Login/Login';
import ListCarrers from './Components/Carrers/ListCarrers';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (

    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/list-carrers/' element={<ListCarrers/>} />
      </Routes>
    </Router>
  );
}

export default App;
