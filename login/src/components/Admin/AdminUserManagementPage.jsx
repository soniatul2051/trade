import React, { useState, useEffect } from "react";
import axios from "axios";
import AddUser from "../Add User Btn/AddUser.jsx";
import Modify from "../Add User Btn/Modify.jsx";
// import ModifyBtn from "..Add User Btn/Mofify.jsx";

const AdminUserManagementPage = () => {
  const [users, setUsers] = useState([]);

  // Function to fetch user data
  const fetchUsers = () => {
    axios
      .get("http://localhost:3001/api/user/all")
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  
  useEffect(() => {
    // Fetch users when component mounts
    
    fetchUsers();
  }, []);

  // Function to handle user deletion
  const handleDelete = (email) => {
    axios
      .delete(`http://localhost:3001/api/user/${email}`)
      .then((response) => {
        console.log(response.data);
        // Fetch updated user list after successful deletion
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Admin User Management</h2>
      <AddUser></AddUser>
      <div className="bg-white shadow-md rounded-lg text-black overflow-auto">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
               PassKey 
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.password}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.isAdmin ? "Admin" : "User"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.isAdmin ? "NA" : user.balance}
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-3">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      className=" text-black rounded-full h-10 w-10 pb-1 flex justify-center items-center"
                      onClick={() => handleDelete(user.email)}
                    >
                      <lord-icon
                        src="https://cdn.lordicon.com/nqtddedc.json"
                        trigger="hover"
                        style={{ width: "35px", height: "35px" }}
                      ></lord-icon>
                    </button>
                   <div>

                      <Modify></Modify>
                   </div>
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserManagementPage;
