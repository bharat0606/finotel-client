import { useState, useEffect } from "react";
import queryString from "query-string";
import { Spin, Space } from 'antd';


import Search from "../components/forms/Search";
import { searchListings } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";

const SearchResult = () => {
  // state
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchBed, setSearchBed] = useState("");
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // when component mounts, get search params from url and use to send search query to backend
  useEffect(() => {
    const { location, date, bed } = queryString.parse(window.location.search);
    setIsLoading(true)
    searchListings({ location, date, bed }).then((res) => {
      setHotels(res.data);
      setIsLoading(false)
    });
  }, [window.location.search]);

  return (
    <>
      <div className="col">
        <br />
        <Search />
      </div>
      <div className="container">
      {isLoading &&  <Space size="middle"  className="spinner">
            <Spin size="large" />
          </Space>}
        <div className="row">
          {hotels.map((h) => (
            <SmallCard key={h._id} h={h} />
          ))}
        </div>
        {
          !hotels?.length && !isLoading && <div className="alert alert-danger m-5" role="alert">No Results found!!!</div>
        }
      </div>
    </>
  );
};

export default SearchResult;
