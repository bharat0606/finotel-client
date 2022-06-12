import { useState, useEffect } from "react";
import moment from "moment";


import { Link } from "react-router-dom";
import { Spin, Space, Tabs  } from 'antd';
import { useSelector,useDispatch } from "react-redux";
import { toast } from "react-toastify";

import DashboardNav from "../components/DashboardNav";
import { deleteBooking, userHotelBookings, sellerHotels } from "../actions/hotel";
import BookingCard from "../components/cards/BookingCard";
import { DATE_YMD } from "../constants";

const { TabPane } = Tabs;

const Dashboard = () => {
  const { auth } = useSelector((state) => ({ ...state }));

  const [booking, setBooking] = useState([]);
  const [filteredBooking, setFilteredBooking] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [onGoingBookings, setOnGoingBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hotels, setHotels] = useState([]);
  const dispatch = useDispatch();


  useEffect(() => {
    loadUserBookings();
    loadSellersHotels();
  }, []);

  const loadSellersHotels = async () => {
    let { data } = await sellerHotels(auth?.token);
    setHotels(data);
  };

  const loadUserBookings = async () => {
    setIsLoading(true)
    const res = await userHotelBookings(auth?.token);
    setBooking(res.data);

    if(res.data.length){      
      dispatch({
        type: "SHOW_CABS",
        payload: {showCabs: true},
      });
      window.localStorage.setItem("auth", JSON.stringify({ ...auth, ...{ showCabs: true } }))
    }
    
    

    const completedBookings = res.data.filter(row =>moment(moment(row.to).format(DATE_YMD)).isBefore(moment(new Date()).format(DATE_YMD)))
    setCompletedBookings(completedBookings)
    setFilteredBooking(completedBookings);

    const onGoingBookings = res.data.filter(row =>{      
      //  from <= current &&  to >= current
      const fromDate = moment(row.from).format(DATE_YMD);
      const toDate = moment(row.to).format(DATE_YMD);
      const currentDate = moment(new Date()).format(DATE_YMD);
      return moment(fromDate).isSameOrBefore(currentDate) &&  moment(toDate).isSameOrAfter(currentDate)
    })
    setOnGoingBookings(onGoingBookings)

    const upcomingBookings = res.data.filter(row =>moment(moment(row.from).format(DATE_YMD)).isAfter(moment(new Date()).format(DATE_YMD)))
    setUpcomingBookings(upcomingBookings)

    console.log(upcomingBookings)

    setIsLoading(false)
  };

  const handleOrderDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      deleteBooking(auth?.token, orderId).then((res) => {
        toast.success("Booking Deleted");
        loadUserBookings();
      });
    } catch (err) {
      console.log(err);
    }
    
  };

  const onChange = (key) => {
    if(key === 'completed') {
      setFilteredBooking(completedBookings)
    } else if(key === 'going') {
      setFilteredBooking(onGoingBookings)
    }
    else if(key === 'upcoming') {
      setFilteredBooking(upcomingBookings)
    }
    
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 nav-banner">
      </div>

      <div className="container-fluid p-4">
        <DashboardNav bookingsCount ={booking.length} hotelsCount= {hotels.length}/>
      </div>

      <div className="container-fluid">
        <div className="dashboard-top">
          <div className="dashboard-title">
            <h2>Your Bookings</h2>
          </div>
          <div className="dashboard-actions">
            <Link to="/" className="btn btn-primary">
              Browse Hotels
            </Link>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
      <Tabs defaultActiveKey="1" onChange={onChange}>
    <TabPane tab={`Completed (${completedBookings.length})`} key="completed">
    </TabPane>
    <TabPane tab={`On-Going (${onGoingBookings.length})`} key="going">
    </TabPane>
    <TabPane tab={`Upcoming (${upcomingBookings.length})`} key="upcoming">
    </TabPane>
  </Tabs>
      {isLoading && <Space size="middle"  className="spinner">
            <Spin size="large" />
          </Space>}
        {filteredBooking.map((b) => (
          <BookingCard
            key={b._id}
            orderId={b._id}
            hotel={b.hotel}
            session={b.session}
            to={b.to}
            bed={b.bed}
            from={b.from}
            orderedBy={b.orderedBy}
            handleOrderDelete = {handleOrderDelete}
          />
        ))}

{!filteredBooking.length &&  <div className="text-center">
  <h3>No Bookings!!</h3>
          </div>}
      </div>
    </>
  );
};

export default Dashboard;
