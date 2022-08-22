import React, { useState, useEffect } from 'react';
import DataGrid from 'devextreme-react/data-grid';
import DataSource from 'devextreme/data/data_source';
import Subscribe from '../service/orderSubscribe';
import ArrayStore from 'devextreme/data/array_store';
import axios from 'axios';

const  order = [ {
  account: "qatest24account1",
  avgPx: 71.40289999999999,
  clOrdID: "LSL680400037",
  complianceID: null,
  contactName: null,
  cumQty: 100,
  destination: "D0",
  id: "LSL680400037",
  leavesQty: 0,
  locateID: null,
  locateRate: 0,
  locateRequired: false,
  ordType: "1",
  orderQty: 100,
  orderTypeDesc: "MKT",
  originatingUserDesc: "qatest24",
  price: 0,
  qOrderID: 74,
  side: "1",
  sideDesc: "BUY",
  status: null,
  statusDesc: "Filled",
  stopPx: 0,
  symbol: "LUMN",
  symbolSfx: null,
  symbolWithoutSfx: "LUMN",
  text: null,
  tifDesc: "GTC",
  time: "8/22/2022 5:00:53 AM",
  timeInForce: "1",
  transactTime: "2022-08-22T09:00:53.216Z",
  workableQty: 0
    }]

function GridData() {

  const columns = ['account', 'avgPx', 'destination', 'ordType', 'orderQty','orderTypeDesc','sideDesc' , 'time' , 'timeInForce' , 'transactTime'];
  const [ss , setCount] = useState(0);
  
  const OrderGridStore = new ArrayStore({
    key: 'id',
   });
  
  useEffect(() => {
    let token = localStorage.getItem('api_access_token');
    axios.get('http://173.255.116.184:8002/int/ord/api/subscription/orders/subscribe',{
        headers: { Authorization: `Bearer ${token}` }
      })
    .then(function(response){
       console.log('subscribe response' , response)
       response.data.eventData.forEach(function(value,key){
        OrderGridStore.push([{ type: "insert", data: value }]); 
  })
    //    return response
     })

    .catch(err => console.log('checking in socket onOpen' , err));

   
  });
  const dataSource = new DataSource({
    store: OrderGridStore,
    reshapeOnPush: true
   });

  
  
 
    return (
        <DataGrid
          dataSource={dataSource}
          defaultColumns={columns}
          showBorders={true}
        />
      );
}

export default GridData;
