import { useState } from "react";
import Login from "../component/Login";
import Register from "../component/Register";
import Play from "./Play";

function Home() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="text-white flex justify-center  h-screen  flex-col w-full">
      <div>{isLogin ? <Login /> : <Register />}</div>

      <div className=" ">
        <button
          className=" border p-3 m-3 rounded-3xl"
          onClick={() => {
            setIsLogin(!isLogin);
          }}
        >
          {isLogin ? "click here to Register" : " click here to Login"}
        </button>
        <hr className="border-t-2 border-white my-4" />
      </div>

      {/* <Play /> */}
    </div>
  );
}

export default Home;
