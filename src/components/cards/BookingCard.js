import { useState } from "react";
import moment from "moment";


import { currencyFormatter } from "../../actions/stripe";
import { diffDays } from "../../actions/hotel";
import OrderModal from "../modals/OrderModal";

const BookingCard = ({orderId, hotel, session, orderedBy,bookingDetails,handleOrderDelete }) => {
  const [showModal, setShowModal] = useState(false);
  // const [canCancelBooking, setCanCancelBooking] = useState(true);

  const cancelBooking = () =>{
    handleOrderDelete(orderId);
  }

  return (
    <>
      <div className="card mb-3 small-cards" style={{width:'100%', background:'white'}}>
        <div className="no-gutters">
          <div className="col-md-4">
            {hotel.image && hotel.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/hotel/image/${hotel._id}`}
                alt="default hotel image"
                className="card-image img img-fluid hotel-image"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
                alt="default hotel image"
                className="card-image img img-fluid hotel-image"
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                {hotel.title}{" "}
                <span className="float-right text-primary">
                  {currencyFormatter({
                    amount: hotel.price,
                    currency: "INR",
                  })}
                </span>{" "}
              </h3>
              <p className="hotel-location"> <i className="fa fa-map-marker" aria-hidden="true"></i>
              &nbsp;{hotel.location}</p>
              <p className="card-text">{`${hotel.content.substring(
                1,
                200
              )}...`}</p>
              <p className="card-text">
                { bookingDetails?.to && bookingDetails?.from && 
                    <span className="float-right text-primary">
                    for {diffDays(bookingDetails.from, bookingDetails.to)}{" "}
                    {diffDays(bookingDetails.from, bookingDetails.to) <= 1 ? " day" : " days"}
                  </span>

                }
                
              </p>
              { bookingDetails?.bed &&
                   <p className="card-text">
                   Booked {bookingDetails.bed} bed from {new Date(bookingDetails.from).toLocaleDateString()}
                 </p>
                }

              {showModal && (
                <OrderModal
                  session={session}
                  bookingDetails ={bookingDetails}
                  orderedBy={orderedBy}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              )}

              <div className="d-flex justify-content-between h4">
                <button
                  onClick={() => setShowModal(!showModal)}
                  className="btn btn-primary"
                >
                  Show Booking info
                </button>

                {moment(bookingDetails.from).isAfter(moment(new Date()).format("YYYY-MM-DD")) &&  <button
                  onClick={cancelBooking}
                  className="btn btn-primary"
                >
                  Cancel Booking
                </button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCard;
