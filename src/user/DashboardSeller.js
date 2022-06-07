import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";


import DashboardNav from "../components/DashboardNav";
import { sellerHotels, deleteHotel } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";

const DashboardSeller = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    loadSellersHotels();
  }, []);

  const loadSellersHotels = async () => {
    let { data } = await sellerHotels(auth.token);
    setHotels(data);
  };

  const handleHotelDelete = async (hotelId) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    deleteHotel(auth.token, hotelId).then((res) => {
      toast.success("Hotel Deleted");
      loadSellersHotels();
    }).catch(err =>{
      toast.error(err.response.data);
    })
  };

  const connected = () => (
    <div className="container-fluid">
      <div className="dashboard-top">
        <div className="dashboard-title">
          <h2>Your Hotels</h2>
        </div>
        <div className="dashboard-actions">
          <Link to="/hotels/new" className="btn btn-primary">
            + Add New
          </Link>
        </div>
      </div>

      <div className="row">
        {hotels.map((h) => (
          <SmallCard
            key={h._id}
            h={h}
            showViewMoreButton={false}
            owner={true}
            handleHotelDelete={handleHotelDelete}
            showDiscount = {false}
          />
        ))}
      </div>
    </div>
  );

  const notConnected = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <div className="p-5 pointer">
            <HomeOutlined className="h1" />
            <h4>Setup payouts to post hotel rooms</h4>           
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="container-fluid bg-secondary p-5 nav-banner">
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      {auth &&
      auth.user
        ? connected()
        : notConnected()}
    </>
  );
};

export default DashboardSeller;
