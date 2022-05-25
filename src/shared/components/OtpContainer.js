import { useState } from "react";
import OtpInput from 'react-otp-input';

import './Otp.css'

function OtpContainer({ submitOtp }) {
    const [otp, setOtp] = useState('');

    const handleChange = (otp) => {
        setOtp(otp)
    }

    const handleSubmitOtp = () => {
        submitOtp(otp)
    }

    return (
        <div className="otp-wrapper">
            <div className="otp-header">
                <h1>Please enter 6-digit otp to complete your booking</h1>
                <p>A One-Time Password has been sent to your registered mobile</p>
                
            </div>
            <div className="otp-content">
            <OtpInput
                value={otp}
                onChange={handleChange}
                numInputs={6}
                separator={<span>-</span>}
                inputStyle={{
                    width: '3rem',
                    height: '3rem',
                    fontSize: '1rem',
                    borderRadius: 4,
                    border: '2px solid rgba(0,0,0,0.3)',
                    color: 'black'
                }}
            />
            </div>
            <div className="otp-footer">
                <button className="btn btn-primary m-2" onClick={() => setOtp('')}>Clear</button>
                <button  className="btn btn-primary m-2" onClick={handleSubmitOtp}>Verify</button>
            </div>
        </div>

    );
}

export default OtpContainer;