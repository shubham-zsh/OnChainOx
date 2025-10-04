import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const wallet = useWallet();
  const [email, setemail] = useState("asd");
  const [password, setPassword] = useState("asd");

  const onRegister = () => {
    if (!wallet.publicKey || !email || !password) {
      alert("Please connect to the wallet !");
    }
    axios
      .post("http://localhost:5100/user/signup", {
        email,
        password,
        pubKey: wallet.publicKey,
      })
      .then((res) => {
        console.log("res is : ", res);
        navigate("/play");
      })
      .catch((err) => {
        console.log("error is :  ", err);
      });
  };
  return (
    <div className=" flex justify-center flex-col items-center ">
      <div className=" border p-3 m-3  rounded-2xl">
        <div className=" m-3 p-3">
          <h1>Register</h1>
        </div>
        <div className=" m-3 p-3">
          <label htmlFor=""> email </label>
          <input type="text" placeholder="Enter email " name="" id="" />
        </div>
        <div className=" p-3 m-3">
          <label htmlFor=" "> password</label>{" "}
          <input type="text" placeholder="Enter password " name="" id="" />
        </div>
        <div className="  flex justify-center">
          <div>
            <WalletMultiButton />
          </div>
        </div>
        <div className="p-3 m-3 flex justify-center">
          {" "}
          <button
            onClick={onRegister}
            className=" bg-red-500 p-2 m-2 rounded-2xl"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
