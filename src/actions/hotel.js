import axios from "axios";

export const createHotel = async (token, data) =>
  await axios.post(`${process.env.REACT_APP_API}/create-hotel`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const allHotels = async () =>
  await axios.get(`${process.env.REACT_APP_API}/hotels`);



export const diffDays = (from, to) => {
  const day = 24 * 60 * 60 * 1000;
  const start = new Date(from);
  const end = new Date(to);
  const difference = Math.round(Math.abs((start - end) / day));
  return difference + 1;
};


export const getDiscountedPrice = (price) => {
  const discountPercentage = 10;
  let discount = 0;
  let discountPrice = price;
  if(price > 0) {
    discountPrice = (price * (100 - discountPercentage))/100;
    discount = (price * discountPercentage)/100;
  }

  return {price: discountPrice, discount:discount};
};



export const sellerHotels = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/seller-hotels`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


export const deleteHotel = async (token, hotelId) =>
  await axios.delete(`${process.env.REACT_APP_API}/delete-hotel/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const read = async (hotelId) =>
  await axios.get(`${process.env.REACT_APP_API}/hotel/${hotelId}`);

  

export const updateHotel = async (token, data, hotelId) =>
  await axios.put(
    `${process.env.REACT_APP_API}/update-hotel/${hotelId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const userHotelBookings = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/user-hotel-bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


export const isAlreadyBooked = async (token, hotelId) =>
  await axios.get(`${process.env.REACT_APP_API}/is-already-booked/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


export const searchListings = async (query) =>
  await axios.post(`${process.env.REACT_APP_API}/search-listings`, query);

 

export const bookHotel = async (token, hotelId, amount, discount, bookingDetails) =>
  await axios.post(`${process.env.REACT_APP_API}/book-hotel`,{hotelId, amount,discount, bookingDetails}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export const deleteBooking = async (token, orderId) =>
  await axios.delete(`${process.env.REACT_APP_API}/delete-booking/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  export const checkHotelAvailability = async (query) =>
  await axios.post(`${process.env.REACT_APP_API}/check-hotel-availability`, query);


  export const getHotelBookings = async (token, hotelId) =>
  await axios.get(`${process.env.REACT_APP_API}/hotel-bookings/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  export const getCompletedOrdersCount = async (token, userlId) =>
  await axios.get(`${process.env.REACT_APP_API}/completed-bookings/${userlId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });