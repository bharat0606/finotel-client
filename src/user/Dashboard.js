import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spin, Space } from 'antd';
import { useSelector } from "react-redux";


import DashboardNav from "../components/DashboardNav";
import { userHotelBookings } from "../actions/hotel";
import BookingCard from "../components/cards/BookingCard";

const Dashboard = () => {
  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));
  const [booking, setBooking] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUserBookings();
  }, []);

  const loadUserBookings = async () => {
    setIsLoading(true)
    const res = await userHotelBookings(token);
    setBooking(res.data);
    console.log(res.data)
    setIsLoading(false)
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 nav-banner">
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      <div className="container-fluid">
        <div className="row dashboard-top">
          <div className="col-md-10">
            <h2>Your Bookings</h2>
          </div>
          <div className="col-md-2">
            <Link to="/" className="btn btn-primary">
              Browse Hotels
            </Link>
          </div>
        </div>
      </div>

      <div className="row dashboard-content">
      {isLoading && <Space size="middle"  className="spinner">
            <Spin size="large" />
          </Space>}
        {booking.map((b) => (
          <BookingCard
            key={b._id}
            hotel={b.hotel}
            session={b.session}
            bookingDetails={b.bookingDetails}
            orderedBy={b.orderedBy}
          />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
