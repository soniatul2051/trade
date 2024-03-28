import React, { useState, useEffect } from "react";
import axios from "axios";


const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  
  // If email is retrieved successfully
  
  

  useEffect(() => {
    // Fetch transactions from backend API

    const userData=JSON.parse(localStorage.getItem('userData'))
    const email=userData.email
    axios.get(`http://localhost:3001/api/user/transactions`)
      .then(response => {
        
        setTransactions(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">All Transactions</h2>
      <div className="bg-white shadow-md rounded-lg text-black overflow-auto">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider pl-2">
                UserId
              </th>
              <th className="py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Share
              </th>
              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qauntity
              </th>
              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Price
              </th>
              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          
          {transactions.map(transaction => (
            <tr key={transaction._id}>
              <td className="pl-2">{transaction.email}</td>
              <td>{transaction.share}</td>
              <td>{transaction.share}</td>
              <td>{transaction.price}</td>
              <td>{transaction.quantity}</td>
              <td>{transaction.totalPrice}</td>
              <td>{new Date(transaction.dateTime).toLocaleString()}</td>
            </tr>
          ))}
          
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsList;
