import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { bookHotel, read } from "../actions/hotel";
import { HunelProvider, HunelCreditCard } from "reactjs-credit-card";

import Payment from "./Payment";
import { useSelector } from "react-redux";

const PaymentContainer = ({ match, type="hotelBooking" }) => {
    const hunel = new HunelCreditCard();
    const [hotel, setHotel] = useState({});
    const [finalAmount, setFinalAmount] = useState(0);
    

    const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSellerHotel();
  }, []);

  const loadSellerHotel = async () => {
    let res = await read(match.params.hotelId);
    let bookingDetails =  {}    
    setHotel(res.data);
    if(res?.data && window.sessionStorage.getItem("bookingDetails")) {
      bookingDetails = JSON.parse(window.sessionStorage.getItem("bookingDetails"));
      setFinalAmount(parseInt(bookingDetails.bed) * res.data.price)
    }
  };

  const onBookHotel = async (priceToPaid) =>{
    try {
     const bookingDetails =  window.sessionStorage.getItem("bookingDetails");
      let res = await bookHotel(auth.token, hotel._id, priceToPaid, bookingDetails);
      toast.success("Hotel is booked", {...auth, ...{hotelCount: ((auth.hotelCount || 0) + 1)}});
      window.localStorage.setItem("auth", JSON.stringify({...auth, ...{hotelCount: ((auth.hotelCount || 0) + 1)}}));
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
       <HunelProvider config={hunel}>
    <Payment onBookHotel={onBookHotel} price={finalAmount} />
  </HunelProvider>, 
    </>
  );
};

export default PaymentContainer;
