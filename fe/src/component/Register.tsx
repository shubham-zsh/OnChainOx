function Register() {
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
        <div className="  flex justify-center">Connect Wallet</div>
        <div className="p-3 m-3 flex justify-center">
          {" "}
          <button className=" bg-red-500 p-2 m-2 rounded-2xl">Register</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
