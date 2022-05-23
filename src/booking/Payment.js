import {
    CardHolder,
    CardNumber,
    CardSecurityCode,
    ValidThruMonth,
    ValidThruYear,
  } from "reactjs-credit-card/form";
  import Card from "reactjs-credit-card/card";
  import { useCardForm } from "reactjs-credit-card";
  import { useState } from "react";
  import { useSelector } from "react-redux";

import { getDiscountedPrice } from "../actions/hotel";
import { currencyFormatter } from "../actions/stripe";

  function Payment({onBookHotel, price, showDiscount = true}) {
    //useCardForm is a hook which returns a function.If this function calls,function returns credit card form data values and their validations
    const getFormData = useCardForm();
    const [numberValid, setNumberValid] = useState(true);
    const { auth } = useSelector((state) => ({ ...state }));

    let priceToPaid =  price;

    if(auth?.hotelCount && showDiscount) {
      priceToPaid = getDiscountedPrice(price);
    }

  
    function handleSubmit(e) {
      e.preventDefault();
      const [data, isValid] = getFormData();
      if (!data.number.isValid) setNumberValid(false); //we'll set a hook to show a error if card number is invalid
  
      if (!isValid) {
        alert(
          `${data.holder.value} form data values invalid :) and holder also ${
            data.holder.isValid ? "valid" : "invalid"
          }`
        );
      } else {
        onBookHotel(priceToPaid)
      }
        
    }
  
    //We can set any form element attribute
    function handleFocus() {
      setNumberValid(true);
    }
  
    return (
      <div className="row mt-5">
        <div className="alert alert-success text-center mb-5">    

               Your Bill amount is &nbsp;
               <b>
               {auth?.hotelCount && showDiscount ? (
                 <>
                 <s>{currencyFormatter({
                    amount: price || 0,
                    currency: "INR",
                  })}</s> 
                 &nbsp;              
                        <b>
                        {currencyFormatter({
                    amount: priceToPaid || 0,
                    currency: "INR",
                  })}
                          </b>
                        &nbsp;
                        <span className="discount-per">10 % off</span>
                        
                 </>
                ) : (
                  <>
                  {currencyFormatter({
                    amount: price || 0,
                    currency: "INR",
                  })}
                  </>
                )                 
                }
                </b>
             </div>
        <div className="col-md-4 payment-wrapper">
        <Card fixClass="fix-new" cardClass="card-new" />
        </div>

        <div className="col-md-8">
        <div className="form-box-pay">
          <form onSubmit={handleSubmit}>
            <CardNumber
              placeholder="Card Number"
              className={`input-text-pay${!numberValid ? " error" : ""}`}
              onFocus={handleFocus}
            />
            <CardHolder placeholder="Card Holder" className="input-text-pay" />
            <div className="flex-wrapper">
              <div className="semi flex-wrapper">
                <ValidThruMonth
                  placeholder="Card Holder"
                  className="input-text-pay semi"
                />
                <ValidThruYear
                  placeholder="Card Holder"
                  className="input-text-pay semi"
                />
              </div>
              <CardSecurityCode placeholder="CVV" className="input-text-pay semi" />
                    
            </div>
            <button className="pay-btn">Book</button>
          </form>
        </div>
        </div>
      </div>
    );
  }
  
  export default Payment;