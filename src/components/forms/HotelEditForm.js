import AlgoliaPlaces from "algolia-places-react";
import { Checkbox, DatePicker, Select } from "antd";
import moment from "moment";

import { AMENITIES, BEDS } from "../../constants";

const { Option } = Select;

const config = {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
  language: "en",
  // countries: ["au"],
};

const HotelEditForm = ({
  values,
  setValues,
  handleChange,
  handleImageChange,
  handleSubmit,
}) => {
  const { title, content, location, price, bed, from, to, amenities } = values;
  let amenitiesString = amenities ? amenities.split(",") : []
    
     

  function onChange(checkedValues) {
    setValues({ ...values, amenities: checkedValues.toString()})
  }

  return (
    <>
    {/* { !title && <div>Loading</div>} */}

    { title && 
    <form onSubmit={handleSubmit}>
      
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </label>

        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        />

        <textarea
          name="content"
          onChange={handleChange}
          placeholder="Content"
          className="form-control m-2"
          value={content}
        />

        {location && location.length && (
          <AlgoliaPlaces
            className="form-control m-2"
            placeholder="Location"
            defaultValue={location}
            options={config}
            onChange={({ suggestion }) =>
              setValues({ ...values, location: suggestion.value })
            }
            style={{ height: "50px" }}
          />
        )}

        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price per bed"
          className="form-control m-2"
          value={price}
        />

        <Select
          onChange={(value) => setValues({ ...values, bed: value })}
          className="w-100 m-2"
          size="large"
          placeholder="Number of beds"
          value={bed}
        >
         
          {BEDS.map((bed) => (
            <Option key={bed}>{bed}</Option>
          ))}
        </Select>
      </div>

      {from && (
        <DatePicker
          defaultValue={moment(from, "YYYY-MM-DD")}
          placeholder="From date"
          className="form-control m-2"
          onChange={(date, dateString) =>
            setValues({ ...values, from: dateString })
          }
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
        />
      )}

      {to && (
        <DatePicker
          defaultValue={moment(to, "YYYY-MM-DD")}
          placeholder="To date"
          className="form-control m-2"
          onChange={(date, dateString) =>
            setValues({ ...values, to: dateString })
          }
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
        />
      )}

<Checkbox.Group options={AMENITIES} defaultValue={[...amenitiesString]} onChange={onChange} />

      <button className="btn btn-outline-primary m-2">Update</button>
    </form> 
}
    </>  
  );
};

export default HotelEditForm;