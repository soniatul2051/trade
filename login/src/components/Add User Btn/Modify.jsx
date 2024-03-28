import React, { useState } from 'react';
import axios from 'axios';

function UpdateBalance() {
  const [showForm, setShowForm] = useState(false);
//   const [email, setEmail] = useState('');
  const [newBalance, setNewBalance] = useState('');
    let userData=JSON.parse(localStorage.getItem('userData'))
    const email=userData.email
    
  const handleUpdateBalance = () => {
    setShowForm(true);
  };

  const  handleSubmit = async(e) => {
    e.preventDefault();
   await axios
      .post("http://localhost:3001/api/user/addBalance", { email, newBalance })
      .then((res) => {
        console.log(res.data);
        alert("Balance updated successfully");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update balance");
      });

    // Clear form fields
    // setEmail('');
    setNewBalance('');
    // Close the form
    setShowForm(false);
  };

  const handleCloseForm = () => {
    // Clear form fields
    // setEmail('');
    setNewBalance('');
    // Close the form
    setShowForm(false);
  };

  return (
    <div >
      <button onClick={handleUpdateBalance} className='btn '> 
      <lord-icon

src="https://cdn.lordicon.com/rguiapej.json"
trigger="hover"
>
</lord-icon>
</button>
      {showForm && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2b384d] p-2 rounded-lg">
          <button className="update-button p-1 h-9 w-9 rounded-full bg-red-500" onClick={handleCloseForm}>
            X

</button>
          <form onSubmit={handleSubmit} className='p-4 bg-[#2b384d]'>
            <div className='flex gap-5 flex-col '>

              <label className='p-1  '>
                
                <p className='py-2'>
                    Email:
                    </p>
                <input
                  type="email"
                  value={userData.email}
                  readOnly
                  className='px-1 py-2 w-full'
                  //   onChange={(e) => setEmail(e.target.value)}
                  />
              </label>
              <p>Current Balance : {userData.balance}</p>
              <label className='p-1 '>
                <p className='py-2'>
                    New Balance:
                    </p>
                <input
                  type="number"
                  value={newBalance}
                  onChange={(e) => setNewBalance(e.target.value)}
                  className='px-1 py-2 w-full '
                  />
              </label>
              <button type="submit" className='btn bg-green-500 text-black p-2 rounded-full'>Add</button>
              <button type="submit" className='btn bg-red-500 text-black p-2 rounded-full'>Subtract</button>
              <button type="submit" className='btn bg-green-500 text-black p-2 rounded-full'>Update</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdateBalance;
