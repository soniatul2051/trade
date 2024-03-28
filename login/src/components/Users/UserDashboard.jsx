import React from "react";
import Navbar from "../Navbar/Navbar";
import UserSidebar from "./UserSidebar";
import "../App.css";

import TradingViewChart from "../TradingChart/TradingViewChart";

function Home() {
  if (localStorage.getItem("isLoggedIn") == "true") {
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData.name);
    return (
      <>
        <Navbar name={"Dashboard"}></Navbar>
        <div className="flex">
          <div className="w-2/12 bg-[#1d2634]  mr-3 flex flex-col justify-center items-center">
            <UserSidebar></UserSidebar>
          </div>
          <div className="w-10/12 bg-[#1d2634] myhieght">
            <TradingViewChart></TradingViewChart>
          </div>
        </div>
      </>
    );
  } else {
    alert("Please Login First");
    return <></>;
  }
}

export default Home;
