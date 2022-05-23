import { useState } from "react";
import { toast } from "react-toastify";

import { login } from "../actions/auth";
import LoginForm from "../components/LoginForm";
import { useDispatch } from "react-redux";
import { userHotelBookings } from "../actions/hotel";
import loginWallper from '../assets/login-backg.jpg'

import "./Login.css"

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SEND LOGIN DATA", { email, password });
    try {
      let res = await login({ email, password });

      if (res.data) {
        let bookings = await userHotelBookings(res.data.token);
        console.log(
          "SAVE USER RES IN REDUX AND LOCAL STORAGE THEN REDIRECT ===> ", bookings.data?.length
        );
        // save user and token to local storage
        window.localStorage.setItem("auth", JSON.stringify({ ...res.data, ...{ hotelCount: bookings.data?.length || 0 } }));
        // save user and token to redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: { ...res.data, ...{ hotelCount: bookings.data?.length || 0 } },
        });
        history.push("/dashboard");
      }
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
