import "./App.css";
// import Register from "./components/register.jsx";
import Login from "./components/login.jsx";
import Dashboard from "./components/Users/UserDashboard.jsx";
import Transactions from "./components/Users/UserTransactions.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import BuyBtn from "./components/ButBtn/BuyBtn.jsx";
import { useEffect } from 'react';

import AdminTransactionManagement from "./components/Admin/AdminTransactionMangement.jsx";
const UseLocalStorageUpdater = (key, value) => {
  useEffect(() => {
    // Function to update localStorage
    const updateLocalStorage = () => {
      localStorage.setItem(key, JSON.stringify(value));
    };

    // Call the updateLocalStorage function initially
    updateLocalStorage();

    // Set up an interval to update localStorage every 10 seconds
    const intervalId = setInterval(updateLocalStorage, 10000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [key, value]);
};
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard name={"Home"} />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/Buy" element={<BuyBtn />} />
          <Route
            path="/admintransactionmanagement"
            element={<AdminTransactionManagement />}
          />

          {/* <Route path="/Support" element={<Support />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
