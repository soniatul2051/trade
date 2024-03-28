import React from "react";
import BuyBtn from "../ButBtn/BuyBtn.jsx";
import SelBtn from "../SelBtn/SelBtn.jsx";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  // const userData = JSON.parse(localStorage.getItem('email'));
  // const userBalance= JSON.parse(localStorage.getItem('balance'));
  const userData = JSON.parse(localStorage.getItem("userData"));
  let userBalance = userData.balance;
  let userId = userData.email;
  const onLogout = () => {
    localStorage.clear();
    alert("Logout Successfully");
    navigate("/login");
  };
  return (
    <>
      <div className="w-full bg-[#1d2634]">
        <div className="px-5">
          <p>User Id : {userId}</p>
          <p>Wallet Balnce: {userBalance}</p>
        </div>

        <ul className="w-full flex flex-col  items-center justify-center ">
          <a href="/dashboard" className="w-full">
            <li className="flex items-center text-white p-6 pl-8 hover:bg-black w-full  gap-2">
              <lord-icon
                src="https://cdn.lordicon.com/wmwqvixz.json"
                trigger="hover"
                colors="primary:#ffffff"
                style={{ width: 25, height: 25 }}
              ></lord-icon>
              Dashboard
            </li>
          </a>
          <a href="/transactions" className="w-full">
            <li className="flex items-center text-white p-6 pl-8 hover:bg-black w-full flex gap-2">
              <lord-icon
                src="https://cdn.lordicon.com/vuiggmtc.json"
                trigger="hover"
                colors="primary:#ffffff"
                style={{ width: 25, height: 25 }}
              ></lord-icon>
              Transactions
            </li>
          </a>
          <a href="/profile" className="w-full">
            <li className="flex items-center text-white p-6 pl-8 hover:bg-black w-full flex gap-2">
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
            <button
              className="bg-red-500    w-20 rounded-xl text-black text-center"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </ul>
        <div className="">
          <button className="bg-green-500  m-2 h-12 mt-8 w-20 rounded-xl text-black text-center ">
            <BuyBtn></BuyBtn>
          </button>
          <button className="bg-red-500  m-2 h-12 mt-8 w-20 rounded-xl text-black text-center ">
            <SelBtn></SelBtn>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;