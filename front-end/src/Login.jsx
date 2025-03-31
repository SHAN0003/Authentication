import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/authContext";
// import useLogin from "./contexts/LoginContext";

function Login() {
  // const { setUserLogedIn } = useLogin();

  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/login", { email, password }, { withCredentials: true })
      .then((result) => {
        console.log("-->", result.data)
        
        //check for login if user loged then it shows logout button
        if(result.data.loged){
          console.log("loged-->", result.data.loged);
          login(result.data.token)
          navigate("/");
          setUserLogedIn(true);

          //wellcome message
          const msg = result.data.msg.split(" ")[0]
          if(msg === "welcome"){
            alert(result.data.msg)
          }
          
        }else{
          navigate("/login");
          alert("enter valid email or password !");
        }
        
      })
      .catch((error) => console.log("login ERROR", error));

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="flex justify-center items-center h-96 my-30 ">
        <form onSubmit={handelSubmit} className="w-3xl mx-auto shadow-2xl p-7">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              placeholder="name@flowbite.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
