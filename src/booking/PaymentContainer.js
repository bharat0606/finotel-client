import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { bookHotel, getDiscountedPrice, read } from "../actions/hotel";
import { HunelProvider, HunelCreditCard } from "reactjs-credit-card";

import Payment from "./Payment";
import { useSelector } from "react-redux";
import OtpContainer from "../shared/components/OtpContainer";

const PaymentContainer = ({ match, type = "hotelBooking" }) => {
  const hunel = new HunelCreditCard();
  const [hotel, setHotel] = useState({});
  const [finalAmount, setFinalAmount] = useState(0);
  const [showOtp, setShowOtp] = useState(true);


  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSellerHotel();
  }, []);

  const loadSellerHotel = async () => {
    let res = await read(match.params.hotelId);
    let bookingDetails = {}
    setHotel(res.data);
    if (res?.data && window.sessionStorage.getItem("bookingDetails")) {
      bookingDetails = JSON.parse(window.sessionStorage.getItem("bookingDetails"));
      let priceToPaid =  res.data.price;
      if(auth?.hotelCount) {
        priceToPaid = getDiscountedPrice(res.data.price);
      }
      setFinalAmount(parseInt(bookingDetails.bed) * priceToPaid)
    }
  };

  const onBookHotel = async (priceToPaid) => {
    setShowOtp(true)
  }

  const submitOtp = async (otp) => {
    try {
      const bookingDetails = window.sessionStorage.getItem("bookingDetails");
      let res = await bookHotel(auth.token, hotel._id, finalAmount, bookingDetails);
      toast.success("Hotel is booked", { ...auth, ...{ hotelCount: ((auth.hotelCount || 0) + 1) } });
      window.localStorage.setItem("auth", JSON.stringify({ ...auth, ...{ hotelCount: ((auth.hotelCount || 0) + 1) } }));
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  }

  return (
    <>
      {!showOtp && <HunelProvider config={hunel}>
        <Payment onBookHotel={onBookHotel} price={finalAmount} />
      </HunelProvider>}
      {showOtp && <OtpContainer submitOtp={submitOtp} />}
    </>
  );
};

export default PaymentContainer;
