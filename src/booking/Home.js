import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Spin, Space } from 'antd';


import { allHotels, deleteHotel } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";
import Search from "../components/forms/Search";

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useSelector((state) => ({ ...state }));
  

  useEffect(() => {
    loadAllhotels();
  }, []);


  const handleHotelDelete = async (hotelId) => {
    if (!window.confirm("Are you sure?")) return;
    deleteHotel(auth.token, hotelId).then((res) => {
      toast.success("Hotel Deleted");
      loadAllhotels();
    });
  };

  const loadAllhotels = async () => {
    setIsLoading(true)
     let res = await allHotels();
    setHotels(res.data);
    setIsLoading(false)
   
  };  

  return (
    <>
      <div className="container-fluid p-5 text-center banner">
        <h1>A Multipurpose Online Hotel Reservation System with Different Functionalities</h1>
      </div>
      <div className="col">
        <br />
        <Search />
      </div>
      <div className="container-fluid home-content">
          {isLoading &&  <Space size="middle"  className="spinner">
            <Spin size="large" />
          </Space>}
        <br />
        {hotels.map((h) => (
          <SmallCard key={h._id} h={h}  showViewMoreButton={!(h.postedBy._id === auth?.user._id)} owner={h.postedBy._id === auth?.user._id} handleHotelDelete={handleHotelDelete}/>
        ))}
      </div>
    </>
  );
};

export default Home;
