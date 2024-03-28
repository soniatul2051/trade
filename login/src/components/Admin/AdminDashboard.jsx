import React from "react";
import Navbar from "../Navbar/Navbar";
import AdminSidebar from "./AdminSidebar";
import AdminUserManagementPage from "../Admin/AdminUserManagementPage";
import "../App.css";

function Home() {
  
  return (
    <>
      <Navbar name={"Dashboard"}></Navbar>
      <div className="flex">
        <div className="w-2/12 bg-[#1d2634]  mr-3 flex flex-col justify-center items-center">
          <AdminSidebar></AdminSidebar>
        </div>
        <div className="w-full bg-[#1d2634] myhieght ">
          <AdminUserManagementPage></AdminUserManagementPage>
        </div>
      </div>
    </>
  );
}

export default Home;
