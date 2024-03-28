import React, { useState } from "react";
import axios from "axios";

function AddUser() {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState("");
  const [name, setName] = useState("");

  const handleAddUser = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle submitting the form data (e.g., sending it to an API)
    axios
      .post("http://localhost:3001/api/auth/register", {
        name,
        email,
        password,
        balance,
      })
      .then((res) => {
        console.log(res.data);
      });
    alert("Registered Successfully").catch((err) => {
      console.log(err);
      alert("Registration Failed");
    });
    console.log("Form submitted with:", { name, email, password, balance });
    // Clear form fields
    setEmail("");
    setPassword("");
    setBalance("");
    setName("");
    // Close the form
    setShowForm(false);
  };

  const handleCloseForm = () => {
    // Clear form fields
    setEmail("");
    setPassword("");
    setBalance("");
    // Close the form
    setShowForm(false);
  };

  return (
    <div>
      <button
        onClick={handleAddUser}
        className="btn bg-green-500 text-black p-2 rounded-full m-2 flex items-center justify-center font-bold"
      >
        Add 
        <lord-icon
    src="https://cdn.lordicon.com/hqymfzvj.json"
    trigger="hover"
    colors="primary:#000000"
    style={{ width: "px", height: "25px" }}
    >
</lord-icon>
      </button>
      {showForm && (
        <div className="popup bg-[#2b384d] p-2 rounded-lg mb-3">
          <button
            className="close-button rounded-full  flex items-center justify-center text-black font-bold"
            onClick={handleCloseForm}
          >
            <lord-icon
              src="https://cdn.lordicon.com/nqtddedc.json"
              trigger="hover"
              colors="primary:#c71f16"
              style={{ width: "30px", height: "30px" }}
            ></lord-icon>
          </button>
          <form onSubmit={handleSubmit} className="p-4 bg-[#2b384d]">
            <div className="flex gap-5">
              <label className="p-1">
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-1 py-1 w-full"
                />
              </label>
              <label className="p-1">
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-1 py-1 w-full"
                />
              </label>
              <label className="p-1">
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-1 py-1 w-full"
                />
              </label>
              <label className="p-1">
                Balance:
                <input
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="px-1 py-1 w-full"
                />
              </label>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddUser;
