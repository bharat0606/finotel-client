import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Spin, Space } from 'antd';
import SimpleImageSlider from "react-simple-image-slider";


import { allHotels, deleteHotel } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";
import Search from "../components/forms/Search";


const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useSelector((state) => ({ ...state }));
  const images = [
    { url: "slider/hotel-banner.PNG" },
    { url: "slider/dashboard-banner.PNG" },
    { url: "slider/cab-banner.PNG"}
  ];
  

  useEffect(() => {
    loadAllhotels();
  }, []);


  const handleHotelDelete = async (hotelId) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    deleteHotel(auth.token, hotelId).then((res) => {
      toast.success("Hotel Deleted");
      loadAllhotels();
    }).catch(err =>{
      toast.error(err.response.data);
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
      <div className="text-center banner">
      <SimpleImageSlider
        width={'100%'}
        height={220}
        images={images}
        showBullets={true}
        showNavs={true}
        autoPlay={true}
        autoPlayDelay={4.0}
      />
        <h1>A Multipurpose Online Hotel Reservation System with Different Functionalities</h1>
      </div>
      <div className="col">
        <br />
        <Search />
      </div>
      <div className="home-content">
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
