import { useState } from "react";
// import { useHistory } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  // const history=useHistory()
let [isLoggedIn, setIsLoggedIn] = useState(false);
const [userData, setUserData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault()  ;

    axios
      .post("http://localhost:3001/api/auth/login", { email, password })
      .then((res) => {
        // const jsonData=res.data
        const jsonArray=res.data.data
        console.log(jsonArray.name);
        const extractedData = {
          name: jsonArray.name,
          email: jsonArray.email,
          balance: jsonArray.balance
          

        };
        localStorage.setItem('userData',JSON.stringify(jsonArray));

        setEmail(jsonArray.email);
        setPassword(jsonArray.password);
        console.log(res);
        if (res.status === 200) {
          isLoggedIn=true;
          const email = jsonArray.email;
          const balance = jsonArray.balance;
          
          localStorage.setItem('email', JSON.stringify(email));
          localStorage.setItem('balance', JSON.stringify(balance));
          localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
          console.log("Welcome"+jsonArray.name);
          console.log(jsonArray);
          if (jsonArray.isAdmin ==true) {
            alert("Welcome Admin!");
            navigate("/admindashboard");
          }  else{
            alert("Login successful!");
            navigate("/dashboard");

          }
          // Navigate('/home')
          // History.push('/home')
        } else {
          alert("Incorrect password! Please try again.");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container flex h-screen w-full justify-center items-center">
        <div className="login w-1/2 h-screen  flex flex-col justify-center items-center ">
          <form onSubmit={handleSubmit}>
            <div className="welcome h-16 w-96 mb-6">
              <h1 className="text-3xl">Welcome</h1>
              <p className="">Welcome back! Please enter your details.</p>
            </div>
            <div className="Mobile h-22 w-96 mb-6">
              <p className="text-xl">Email</p>
              <input
                className="border-2 border-black p-2 rounded-lg w-full text-balck"
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="Password h-22 w-96 mb-6">
              <p className="text-xl">Password</p>
              <input
                className="border-2 border-black p-2 rounded-lg w-full text-black"
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="Login-Btn h-22 w-96 mb-2">
              <button className=" bg-red-500 rounded-lg w-full h-9">
                Sign In
              </button>
            </div>
            <div className="Forget h-22 w-96 mb-6">
              <p className="float-right">
                <a href="#">Forget Password</a>
              </p>
            </div>
          
          </form>
        </div>
        <div className="picture w-1/2 h-screen overflow-hidden">
          <img
            src="coin.jpg"
            alt=""
            className="h-screen w-full"
          />
        </div>
      </div>
       
    </>
  );
}
export default Login;
