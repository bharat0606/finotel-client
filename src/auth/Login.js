import { useState } from "react";
import { toast } from "react-toastify";

import { login } from "../actions/auth";
import LoginForm from "../components/LoginForm";
import { useDispatch } from "react-redux";
import { userHotelBookings, getCompletedOrdersCount } from "../actions/hotel";
import loginWallper from '../assets/login-backg.jpg'

import "./Login.css"

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await login({ email, password });

      if (res.data) {
        // let bookings = await userHotelBookings(res.data.token);
        let completedBookings = await getCompletedOrdersCount(res.data.token, res.data.user._id);      
          
        // save user and token to local storage
        window.localStorage.setItem("auth", JSON.stringify({ ...res.data, ...{ hotelCount: completedBookings?.data || 0 } }));
        // save user and token to redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: { ...res.data, ...{ hotelCount: completedBookings?.data || 0 } },
        });
        history.push("/dashboard");
      }
    } catch (err) {
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className="login-form">
        <img src={loginWallper} alt="login" />
          <div className="p-5">
            <LoginForm
              handleSubmit={handleSubmit}
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

export default Login;
