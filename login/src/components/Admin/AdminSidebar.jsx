import React from "react";
import { useNavigate } from "react-router-dom";
function Sidebar() {
const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    alert("Logout Successfully");
    navigate('/login')
  }
  return (
    <>
      <ul className="w-full flex flex-col  items-center justify-center">
        <a href="/admindashboard" className="w-full">
          <li className="flex items-center text-white p-6 pl-8 hover:bg-black w-full gap-2">
            <lord-icon
              src="https://cdn.lordicon.com/ozckswtv.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{ width: 25, height: 25 }}
            ></lord-icon>
            User
          </li>
        </a>
        <a href="/admintransactionmanagement" className="w-full">
          <li className="flex items-center text-white p-6 pl-8 hover:bg-black w-full gap-2">
            <lord-icon
              src="https://cdn.lordicon.com/vuiggmtc.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{ width: 25, height: 25 }}
            ></lord-icon>
            Transactions
          </li>
        </a>
        <a href="/admindashboard" className="w-full">
          {" "}
          <li className="flex items-center text-white p-6 pl-8 hover:bg-black w-full gap-2">
            <lord-icon
              src="https://cdn.lordicon.com/kthelypq.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{ width: 25, height: 25 }}
            ></lord-icon>
            Profile
          </li>
        </a>
        <div className="flex  items-center text-white  pl-8 w-full">

<button className="bg-red-500    w-20 rounded-xl text-black text-center" onClick={onLogout} >Logout</button>
 </div>
      </ul>
    </>
  );
}

export default Sidebar;
