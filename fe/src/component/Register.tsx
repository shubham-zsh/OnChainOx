import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import axios from "axios";
import { useState } from "react";

function Register() {
  const wallet = useWallet();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const onRegister = () => {
    axios.post("http://localhost:5100/signup", {
      username,
      password,
      publicKey: wallet.publicKey,
    });
  };
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
        <div className="  flex justify-center">
          <div>
            <WalletMultiButton />
          </div>
        </div>
        <div className="p-3 m-3 flex justify-center">
          {" "}
          <button className=" bg-red-500 p-2 m-2 rounded-2xl">Register</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
