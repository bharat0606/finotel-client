import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from 'moment';
import { Table, Tag } from 'antd';

import { allBookedCabs } from '../../actions/cab';

const COLUMNS = [
  {
    title: 'Source',
    dataIndex: 'source',
  }, 
  {
    title: 'Destination',
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
    title: 'Time',
    dataIndex: 'time',
  },  
  {
    title: 'Departure Date',
    dataIndex: 'departureDate',
    render: (departureDate) => moment(departureDate).format("DD-MM-YYYY")
  },  
  
];


const CabsList = () =>{
  const { auth } = useSelector((state) => ({ ...state }));
  const [cabs, setCabs] = useState([]);
  const [isMobile, setIsMobile] = useState(false)
  const [columns, setColumns] = useState(COLUMNS);

  useEffect(() => {
    handleResize();
    // window.addEventListener("resize", handleResize)
    loadAllBookedCabs();
  }, []);

  const loadAllBookedCabs = async () => {
    let res = await allBookedCabs(auth?.token);
    setCabs(res.data);
  };  

  const changeMobileDetail = () => {
    const mobileColumns = [
      {
        title: 'Source',
        dataIndex: 'source',
      }, 
      {
        title: 'Destination',
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
      }      
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
