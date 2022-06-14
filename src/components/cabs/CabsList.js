import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from 'moment';
import { Table, Tag } from 'antd';
import { DeleteOutlined  } from "@ant-design/icons";
import { toast } from "react-toastify";

import { allBookedCabs,cancelCab } from '../../actions/cab';
import { DATE_YMD } from "../../constants";

const CabsList = () =>{

  const COLUMNS = [
    {
      title: 'Pick-Up',
      dataIndex: 'source',
    }, 
    {
      title: 'Drop',
      dataIndex: 'destination',
    },
  
    {
      title: 'Distance',
      dataIndex: 'distance',
    },
  
    {
      title: 'Fair',
      dataIndex: 'fair',
      render: (fair) => (      
        <Tag color={fair ?  'green' : 'blue'}>
          {fair || 'Free'}
        </Tag>
       ),
    },
  
    {
      title: 'Discount',
      dataIndex: 'discount',
    },  
    {
      title: 'Time',
      dataIndex: 'time',
    },  
    {
      title: 'Pick-Up Date',
      dataIndex: 'departureDate',
      render: (departureDate) => moment(departureDate).format("DD-MM-YYYY")
    },  
    {
      title: 'Cancel',
      dataIndex: 'cancel',
      render: (_, row) => (
        <DeleteOutlined
        onClick={() => cancelCabBooking(row)}
        className="text-danger"
        style={{ fontSize: '30px' }}
      />
       ),
    },    
  ];
  const { auth } = useSelector((state) => ({ ...state }));
  const [cabs, setCabs] = useState([]);
  const [isMobile, setIsMobile] = useState(false)
  const [columns, setColumns] = useState(COLUMNS);

  useEffect(() => {
    handleResize();
    loadAllBookedCabs();
  }, []);

  const loadAllBookedCabs = async () => {
    let res = await allBookedCabs(auth?.token);
    setCabs(res.data);
  };  

  const cancelCabBooking = (row) =>{
    let canCancel = false ;

    if(moment(moment(row.departureDate).format(DATE_YMD)).isBefore(moment(new Date()).format(DATE_YMD))) {
      toast.error("Past bookings can not be cancelled");      
    } else if(moment(moment(row.departureDate).format(DATE_YMD)).isAfter(moment(new Date()).format(DATE_YMD))) {
      canCancel = true; 
    } else {
    const currentTime = moment(moment().format('h:mma'), 'h:mma');
    const cabTime  = moment(row.time, 'h:mma');
      if(currentTime.isBefore(cabTime)){
        canCancel = true; 
      } else {
        toast.error("Past bookings can not be cancelled");  
      }
    }

    if(canCancel) {
      try {
        cancelCab(auth?.token, row._id).then((res) => {
          toast.success("Cab Booking Cancelled !!, Your refund will be credited your account in 24 hours");
          loadAllBookedCabs();
        });
      } catch (err) {
        console.log(err);
      }
    }    
  }

  

  const changeMobileDetail = () => {
    const mobileColumns = [
    {
        title: 'Route',
        dataIndex: 'destination',
        render: (_, row) => (      
          <span>{row.source} - {row.destination}</span>
         ),
      },
      {
        title: 'Date',
        dataIndex: 'departureDate',
        render: (_, row) => (      
          <span>{moment(row.departureDate).format("DD-MM-YYYY")} - {row.time}</span>
         ),
      }, 
      {
        title: 'Fair',
        dataIndex: 'fair',
        render: (fair) => (      
          <Tag color={fair ?  'green' : 'blue'}>
            {fair || 'Free'}
          </Tag>
         ),
      },
      {
        title: 'Cancel',
        dataIndex: 'cancel',
        render: (_, row) => (
          <DeleteOutlined
          onClick={() => cancelCabBooking(row)}
          className="text-danger"
          style={{ fontSize: '30px' }}
        />
         ),
      },       
    ];

    setColumns(mobileColumns);
  }


  const handleResize = () => {
    if (window.innerWidth < 720) {
        setIsMobile(true)
        changeMobileDetail()
    } else {
        setIsMobile(false)
    }
  } 
   

  return <Table columns={isMobile ? columns : COLUMNS} dataSource={cabs} pagination={false} rowKey='_id' />
}

export default CabsList;
