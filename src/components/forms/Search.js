import React, { useState } from "react";
import { DatePicker, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import AlgoliaPlaces from "algolia-places-react";
import { useHistory } from "react-router-dom";

import { BEDS } from "../../constants";

// destructure values from ant components
const { RangePicker } = DatePicker;
const { Option } = Select;

const config = {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
  language: "en",
  // countries: ["au"],
};

const Search = () => {
  // state
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [bed, setBed] = useState("");
  // route
  const history = useHistory();

  const handleSubmit = () => {
    history.push(`/search-result?location=${location}&date=${date}&bed=${bed}`);
  };

  return (
    <div className="d-flex pb-4">
      <div className="w-100">
        <AlgoliaPlaces
          placeholder="Location"
          defaultValue={location}
          options={config}
          onChange={({ suggestion }) => setLocation(suggestion.value)}
          style={{ height: "50px" }}
        />
      </div>

      <RangePicker
        onChange={(value, dateString) => setDate(dateString)}
        // disabledDate={(current) =>
        //   current && current.valueOf() < moment().subtract(1, "days")
        // }
        className="w-100"
      />

      <Select
        onChange={(value) => setBed(value)}
        className="w-100"
        size="large"
        placeholder="Number of beds"
      >
        <Option key={''}>---Select---</Option>
        {BEDS.map((bed) => (
            <Option key={bed}>{bed}</Option>
          ))}
      
      </Select>

      <SearchOutlined
        onClick={handleSubmit}
        className="show-more"
        style={{borderRadius: '0px', color:'#fff',paddingTop:'16px'}}
      />
    </div>
  );
};

export default Search;