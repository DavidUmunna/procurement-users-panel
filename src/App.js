import User from "./components/user-navbar";
import React from 'react';
import CreateOrder from "./components/CreateOrder";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <User />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createorder" element={<CreateOrder />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
function Home(){
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Welcome to the Procurement App</h1>
      <p className="text-gray-600 mt-2">Manage your orders and suppliers efficiently.</p>
    </div>
  )
}

export default App;