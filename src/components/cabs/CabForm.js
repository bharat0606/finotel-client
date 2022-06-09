import { useState } from "react";
import { toast } from "react-toastify";
import {  DatePicker, Select,TimePicker } from "antd";
import { useSelector } from "react-redux";
import moment from 'moment';
import { useHistory } from "react-router-dom";


import { currencyFormatter } from "../../actions/stripe";
import { bookCab } from "../../actions/cab";
import { CABS_FAIR_DATA, DISTANCE_DISCOUNT, DROP_LOCATIONS, PICK_UP_LOCATIONS } from "../../constants";

import  './cabForm.css'

const format = 'h:mm a';
const { Option } = Select;


const CabForm = () => {
  const history = useHistory()
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [values, setValues] = useState({
    source: "",
    destination: "",
    distance: 0,
    fair: 0,
    time: moment().format(format),
    departureDate: "",
    discount: 0
  });
  const [showFairReview, setShowFairReview] = useState(false)
  const [routeId, setRouteId] = useState(0)
  
  // destructuring variables from state
  const { source, destination, distance, fair,time,departureDate, discount } = values;

  const handleSubmit = async () => {
    if (!auth || !auth?.token) {
      history.push("/login");
      return;
    }

    if(values.fair) {
      window.sessionStorage.setItem("cabDetails", JSON.stringify(values));    history.push(`/cabs/payment/${routeId}`);
      return;
    }

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
        window.location.reload();
      }, 1000);
    } catch (err) {
      toast.error(err.response.data);
    }
  };


  function onChange(time, timeString) {
      if(!timeString) {
        return;
      }
    setValues({ ...values, time: timeString });
    setShowFairReview(false);
  }

  const handleLocationChange = (location, field) => {
        setValues((values)=>{
            return { ...values, [field]: location }
        });
        setShowFairReview(false)
        
};

const calculateFair = () => {
   if(values.destination && values.source && values.departureDate && values.time) {
                const result = CABS_FAIR_DATA.find(row => row.destionation === values.destination && row.source === values.source)
                if(result){
                  setRouteId(result.id)
                    const discount = DISTANCE_DISCOUNT > result.distance  ? result.distance * result.fairPerKm  : DISTANCE_DISCOUNT * result.fairPerKm;
                    const fair  = result.distance * result.fairPerKm - discount;
                    const distance  = result.distance;                   
                    setShowFairReview(true)
                      setValues({ ...values, fair, distance, discount })
                }

            }
}

  return (
    <>
      <form  className="cab-search-form">

<Select
    className="cab-form w-25"
    onChange = {(value) => {handleLocationChange(value, 'source')}}
    size="large"
    placeholder="Pick-Up"
  >
    {PICK_UP_LOCATIONS.map((bed) => (
            <Option key={bed}>{bed}</Option>
          ))}
  </Select>
  
  <Select
    className="cab-form w-25"
    onChange = {(value) => {handleLocationChange(value, 'destination')}}
    placeholder="Drop"
  >
    {DROP_LOCATIONS.map((bed) => (
            <Option key={bed}>{bed}</Option>
          ))}
\        </Select>
<DatePicker
  placeholder="Pick-Up Date"
  className="w-25"
  onChange={(date, dateString) => {
    setValues({ ...values, departureDate: dateString })
    setShowFairReview(false);
  }
  }
  disabledDate={(current) =>
    current && current.valueOf() < moment().subtract(1, "days")
  }
/>
  <TimePicker className="time" use12Hours format="h:mm a" onChange={onChange}  value={moment(time, format)}/>               
<div className="form-group col-md-4">&nbsp; &nbsp;
<button className="btn btn-outline-primary m-2" type="button" onClick={calculateFair}>Calculate Fair</button>
 
</div>
    </form>    
    {showFairReview && <div className="fair-details">
      <div className="fair-title">Review Fair Details</div>
      <div className="fair-row"><span>Distance</span> <span>{values.distance} KM</span></div>
      <div className="fair-row"><span>Rate per KM</span> <span>10 Rs</span></div>
      <div className="fair-row"><span>Discount <small>(for first 25 KM)</small></span> <span>{values.discount} Rs</span></div>
      <div className="fair-row"><span>Total Fair</span> <span>{values.fair} Rs</span></div>      
      <div className="fair-footer"><button className="btn btn-outline-primary" type="button" onClick={handleSubmit}>Book</button>
</div>      

    </div>}
    </>
  );
};

export default CabForm;
