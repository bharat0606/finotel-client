import { useState, useEffect } from "react";
import { Spin, Space, Table } from 'antd';
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import moment from "moment";

import { getHotelBookings } from "../actions/hotel";
import { DATE_WITH_MONTH, DATE_YMD } from "../constants";

const HotelBookings = ({customerView = false, match, history }) => {
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
    if(customerView) {
      const filterData = res.data.filter(row =>moment(moment(row.to).format(DATE_YMD)).isSameOrAfter(moment(new Date()).format(DATE_YMD)))
      setBooking(filterData);
    } else {
      setBooking(res.data);
    }    
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
          {moment(new Date(from)).format(DATE_WITH_MONTH)}
        </span>
      ),
    },
    {
      title: 'Check-Out',
      dataIndex: 'to',
      render: (to) => (
        <span>
          {moment(new Date(to)).format(DATE_WITH_MONTH)}
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

  return (
    <>
      {!customerView && <div className="container-fluid bg-secondary p-5 nav-banner">
      </div>}

      <div className="dashboard-content">
        {!customerView && <button className="go-back" onClick={goBack}>
          <span>
          <ArrowLeftOutlined />

          </span>
          <span>Go Back</span>
          </button>}
        {isLoading && <Space size="middle" className="spinner">
          <Spin size="large" />
        </Space>}
        <Table columns={COLUMNS} dataSource={booking} pagination={false} rowKey='_id' locale={{ emptyText: "No Bookings" }} />
      </div>
    </>
  );
};

export default HotelBookings;
