import { useState } from "react";
import { toast } from "react-toastify";
import {  DatePicker, Select,TimePicker } from "antd";
import { useSelector } from "react-redux";
import moment from 'moment';
import { useHistory } from "react-router-dom";


import { currencyFormatter } from "../../actions/stripe";
import { bookCab } from "../../actions/cab";
import { CABS_FAIR_DATA, DISTANCE_DISCOUNT } from "../../constants";

import  './cabForm.css'

const format = 'h:mm a';
const { Option } = Select;


const CabForm = () => {
  const history = useHistory()
  // redux
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  // state
  const [values, setValues] = useState({
    source: "",
    destination: "",
    distance: 0,
    fair: 0,
    time: moment().format(format),
    departureDate: "",
  });
  const [message, setMessage] = useState('')
  const [routeId, setRouteId] = useState(0)
  
  // destructuring variables from state
  const { source, destination, distance, fair,time,departureDate } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    setMessage("");
  }

  const handleLocationChange = (location, field) => {
        setValues((values)=>{
            return { ...values, [field]: location }
        });
        setMessage("")
        
};

const calculateFair = () => {
   if(values.destination && values.source) {
                const result = CABS_FAIR_DATA.find(row => row.destionation === values.destination && row.source === values.source)
                if(result){
                  setRouteId(result.id)
                    const fair  = DISTANCE_DISCOUNT > result.distance  ? 0 : (result.distance -DISTANCE_DISCOUNT) * result.fairPerKm;
                    const distance  = result.distance;
                    let message = `Your total fair is ${currencyFormatter({
                      amount: fair,
                      currency: "INR",
                    })}`

                    message += `&nbsp; Rate per KM - ${result.fairPerKm} Rupees`
                    message += `&nbsp; Distance is - ${distance} KM`

                    if(!fair) {
                      message += `&nbsp; You got discount for 25KM`
                    }
                      setMessage(message)
                      setValues({ ...values, fair, distance })
                }

            }
}

  return (
    <>
      <form onSubmit={handleSubmit} className="cab-search-form">

<Select
    className="cab-form w-25"
    onChange = {(value) => {handleLocationChange(value, 'source')}}
    size="large"
    placeholder="Pick-Up"
  >
    <Option key={"Mansarovar"}>Mansarovar</Option>
    <Option key={"Sodala"}>Sodala</Option>
  </Select>
  
  <Select
    className="cab-form w-25"
    onChange = {(value) => {handleLocationChange(value, 'destination')}}
    placeholder="Drop"
  >
    <Option key={"Mahesh Nagar"}>Mahesh Nagar</Option>
    <Option key={"Vaishali"}>Vaishali</Option>
    <Option key={"Bagru"}>Bagru</Option>
\        </Select>
<DatePicker
  placeholder="Departure Date"
  className="w-25"
  onChange={(date, dateString) => {
    setValues({ ...values, departureDate: dateString })
    setMessage("");
  }
  }
  disabledDate={(current) =>
    current && current.valueOf() < moment().subtract(1, "days")
  }
/>
  <TimePicker className="time" use12Hours format="h:mm a" onChange={onChange}  value={moment(time, format)}/>               
<div className="form-group col-md-4">&nbsp; &nbsp;
<button className="btn btn-outline-primary m-2" type="button" onClick={calculateFair}>Calculate Fair</button>
<button className="btn btn-outline-primary m-2">Book</button>
 
</div>
    </form>
    {message && <div className="alert alert-primary" role="alert" dangerouslySetInnerHTML={{__html: message}}>
    </div>}
    </>
  );
};

export default CabForm;
