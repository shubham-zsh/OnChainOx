import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setemail] = useState("asd");
  const navigate = useNavigate();
  const [password, setPassword] = useState("asd");
  const onLogin = () => {
    if (!email || !password) {
      alert("Please connect to the wallet !");
    }
    axios
      .post("http://localhost:5100/user/signin", {
        email,
        password,
      })
      .then((res) => {
        console.log("res is : ", res);
        navigate("/play");
      })
      .catch((err) => {
        console.log("error is :  ", err);
      });
  };
  //   const handleRegister = () => {
  //     navigate("/play");
  //   };
  return (
    <div className=" flex justify-center flex-col items-center ">
      <div className=" border p-3 m-3  rounded-2xl">
        <div className=" m-3 p-3">
          <h1>Register</h1>
        </div>
        <div className=" m-3 p-3">
          <label htmlFor=""> username </label>
          <input type="text" placeholder="Enter username " name="" id="" />
        </div>
        <div className=" p-3 m-3">
          <label htmlFor=" "> password</label>{" "}
          <input type="text" placeholder="Enter password " name="" id="" />
        </div>

        <div className="p-3 m-3 flex justify-center">
          {" "}
          <button onClick={onLogin} className=" bg-red-500 p-2 m-2 rounded-2xl">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
