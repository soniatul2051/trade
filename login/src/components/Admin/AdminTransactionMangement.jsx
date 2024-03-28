import Navbar from "../Navbar/Navbar";
import AllTransaction from "./allPaymentHistory";
import AdminSidebar from "./AdminSidebar";
// import UserPaymentHistory from "./Users/UserPaymentHistory";
function Transactions(props) {
  if (localStorage.getItem("isLoggedIn") == "true") {
    return (
      <>
        <Navbar name={"Transaction"}></Navbar>
        <div className="flex">
          <div className="w-2/12 bg-[#1d2634]  mr-3 flex flex-col justify-center items-center">
            <AdminSidebar></AdminSidebar>
          </div>
          <div className="w-10/12 bg-[#1d2634] myhieght">
            {/* <UserPaymentHistory></UserPaymentHistory> */}
            <AllTransaction></AllTransaction>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex justify-center items-center h-screen flex-col">
          <h1 text="text-white text-3xl">Please Login </h1>
          <a
            href="/login"
            className="p-4 hover:text-white hover:bg-blue-500 rounded-d"
          >
            Login Here
          </a>
        </div>
      </>
    );
  }
}
export default Transactions;
