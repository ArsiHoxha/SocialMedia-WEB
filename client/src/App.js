import React from 'react';
import { Routes, Route, BrowserRouter as Router, Form } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
function App() {
  return (
    <Router>
      <Routes>
        
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>

      </Routes>
    </Router>
  );
}

export default App;