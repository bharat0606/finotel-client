import { useHistory, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined  } from "@ant-design/icons";
import { useSelector } from "react-redux";

import { diffDays, getDiscountedPrice } from "../../actions/hotel";
import { currencyFormatter } from "../../actions/stripe";

const SmallCard = ({
  h,
  handleHotelDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
  showDiscount = true, // for Seller it will be false
}) => {
  const { auth } = useSelector((state) => ({ ...state }));

  const history = useHistory();
  return (
    <>
      <div className="card mb-1 small-cards"  style={{width:'100%', background:'white'}}>
        {/* <span><i className="fa fa-check" aria-hidden="true" style={{color:'green', fontSize:'24x'}}></i></span> */}
        <div className="no-gutters">
          <div className="col-md-3">
            {h.image && h.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/hotel/image/${h._id}`}
                alt="default hotel image"
                className="hotel-image"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
                alt="default hotel image"
                className="hotel-image"
              />
            )}
                
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h3 className="card-title">
                {h.title}{" "}
                {
                  auth?.hotelCount && showDiscount ? (<>
                  <s><span className="float-right text-primary">
                  {currencyFormatter({
                    amount: h.price,
                    currency: "INR",
                  })}
                </span></s>
                <b>&nbsp;
                {currencyFormatter({
                    amount: getDiscountedPrice(h.price) || 0,
                    currency: "INR",
                  })}
                </b>
                &nbsp;
                  </>) : (<span className="float-right text-primary">
                  {currencyFormatter({
                    amount: h.price,
                    currency: "INR",
                  })}
                </span>)
                }
                
              </h3>
              <p className="hotel-location"> <i className="fa fa-map-marker" aria-hidden="true"></i>
              &nbsp;{h.location}</p>
              <p className="card-text">{`${h.content.substring(0, 150)}...`}</p>
              <p className="card-text">
                <span className="float-right text-primary">
                  for {diffDays(h.from, h.to)}{" "}
                  {diffDays(h.from, h.to) <= 1 ? " day" : " days"}
                </span>
              </p>
              <p className="card-text">
                Available {h.bed} bed from {new Date(h.from).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="col-md-3 d-flex justify-content-center align-items-center extra-actions">
          <div className="w-100 d-flex justify-content-center align-items-center">
                {showViewMoreButton && (
                  <button
                    onClick={() => history.push(`/hotel/${h._id}`)}
                    className="show-more"
                  >
                    Show more <i className="fa fa-angle-right"></i>
                  </button>
                          
                )}
                {owner && (
                  <div>
                    <Link to={`/hotel/edit/${h._id}`}>
                      <EditOutlined className="text-warning"  style={{ fontSize: '30px' }}/>
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <DeleteOutlined
                      onClick={() => handleHotelDelete(h._id)}
                      className="text-danger"
                      style={{ fontSize: '30px' }}
                    />
                  </div>
                )}
              </div>
                
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallCard;
