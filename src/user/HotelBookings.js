import { useState, useEffect } from "react";
import { Spin, Space, Table } from 'antd';
import { ArrowLeftOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";

import { deleteBooking, getHotelBookings } from "../actions/hotel";

const HotelBookings = ({ match, history }) => {
  const {
    auth: { token },
  } = useSelector((state) => ({ ...state }));
  const [booking, setBooking] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUserBookings();
  }, []);

  const loadUserBookings = async () => {
    setIsLoading(true)
    const res = await getHotelBookings(token, match.params.hotelId);
    setBooking(res.data);
    setIsLoading(false)
  };

  const goBack = () => {
    history.push('/dashboard/seller')
  }

  const COLUMNS = [
    {
      title: 'Rooms',
      dataIndex: 'bed',
    },

    {
      title: 'Amount',
      dataIndex: 'session',
      render: (session) => (
        <span>
          {session.amount_total}
        </span>
      ),
    },
    {
      title: 'Check-In',
      dataIndex: 'from',
      render: (from) => (
        <span>
          {moment(new Date(from)).format("Do MMMM YYYY")}
        </span>
      ),
    },
    {
      title: 'Check-Out',
      dataIndex: 'to',
      render: (to) => (
        <span>
          {moment(new Date(to)).format("Do MMMM YYYY")}
        </span>
      ),
    },
    {
      title: 'Customer',
      dataIndex: 'orderedBy',
      render: (orderedBy) => (
        <span>
          {orderedBy.name}
        </span>
      ),
    }
  ]

  const handleOrderDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      deleteBooking(token, orderId).then((res) => {
        toast.success("Booking Deleted");
        loadUserBookings();
      });
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 nav-banner">
      </div>

      <div className="dashboard-content">
        <button className="go-back" onClick={goBack}>
          <span>
          <ArrowLeftOutlined />

          </span>
          <span>Go Back</span>
          </button>
        {isLoading && <Space size="middle" className="spinner">
          <Spin size="large" />
        </Space>}
        <Table columns={COLUMNS} dataSource={booking} pagination={false} rowKey='_id' locale={{ emptyText: "No Bookings" }} />
      </div>
    </>
  );
};

export default HotelBookings;
