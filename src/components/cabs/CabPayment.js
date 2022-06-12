import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { HunelProvider, HunelCreditCard } from "reactjs-credit-card";
import { useSelector } from "react-redux";

import Payment from "../../booking/Payment";
import { bookCab } from "../../actions/cab";
import { CABS_FAIR_DATA } from "../../constants";
import OtpContainer from "../../shared/components/OtpContainer";


const CabPayment = ({ match }) => {
  const hunel = new HunelCreditCard();
  const [showOtp, setShowOtp] = useState(false);
  const values = window.sessionStorage.getItem("cabDetails");
  const { fair} = JSON.parse(values);
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const onBookHotel = async (priceToPaid) => {
    setShowOtp(true)    
  }

  const submitOtp = async (otp) => {
    const values = window.sessionStorage.getItem("cabDetails");
    const { source, destination, distance, fair, time, departureDate,discount } = JSON.parse(values);

    let formData = new FormData();
    formData.append("source", source);
    formData.append("destination", destination);
    formData.append("distance", distance);
    formData.append("fair", fair);
    formData.append("time", time);
    formData.append("departureDate", departureDate);
    formData.append("discount", discount);
    try {
      await bookCab(token, formData);
      toast.success("Cab is booked");
      setTimeout(() => {
        window.location.href = "/cabs"
      }, 1000);
    } catch (err) {
      toast.error(err.response.data);
    }
  }

  return (
    <>
      {!showOtp && <HunelProvider config={hunel}>
        <Payment onBookHotel={onBookHotel} price={fair} showDiscount={false} />
      </HunelProvider> }
      {showOtp && <OtpContainer submitOtp={submitOtp} />}
    </>
  );
};

export default CabPayment;
