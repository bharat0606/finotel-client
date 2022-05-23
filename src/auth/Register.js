import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import { toast } from "react-toastify";

import { register } from "../actions/auth";
import loginWallper from '../assets/login-backg.jpg'


const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({
        name,
        email,
        password,
      });
      toast.success("Register success. Please login.");
      history.push("/login");
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className="login-form">
        <img src={loginWallper} />
        <div className="p-5">
          <RegisterForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        </div>
      </div>
    </>
  );
};

export default Register;
