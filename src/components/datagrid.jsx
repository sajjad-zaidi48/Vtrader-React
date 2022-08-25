import React, { useState, useEffect } from 'react';
import DataGrid from 'devextreme-react/data-grid';
import DataSource from 'devextreme/data/data_source';
import Subscribe from '../service/orderSubscribe';
import ArrayStore from 'devextreme/data/array_store';
import axios from 'axios';
import { useCustomEventListener } from 'react-custom-events'




function GridData({handleData }) {

  const columns = ['symbol','qOrderID','account','sideDesc','orderTypeDesc','price', 'avgPx','statusDesc','tifDesc','transactionTime','text', 'destination'];
  
  const OrderGridStore = new ArrayStore({
    key: 'id',
   });
 
   useCustomEventListener('my-event', (data) => {
    let eventType = data.data.eventType
                let eventData = data.data.eventData
                if (eventType === 0) {
                    eventData.forEach((value,key)=>{
                        OrderGridStore.push([{ type: "insert", data: value }]);
                    })
                } else if (eventType === 1) {
                        eventData.forEach((value,key)=>{
                            OrderGridStore.push([{ type: "update", data: value, key: value.id }]);
                        })
                } else if (eventType === 2) {
                    eventData.forEach((value,key)=>{
                            OrderGridStore.push([{ type: "remove", key: value.id }]);
                    })
                }
  
  
    
  })
 
  useEffect(() => {
    let token = localStorage.getItem('api_access_token');
    if(token != null){
      axios.get('http://173.255.116.184:8002/int/ord/api/subscription/orders/subscribe',{
          headers: { Authorization: `Bearer ${token}` }
        })
      .then(function(response){
         response.data.eventData.forEach(function(value,key){
         OrderGridStore.push([{ type: "insert", data: value }]); 

         
        })
        //    return response
      })
      .catch(err => console.log('checking in data grid' , err));
    }

   
  });

 

  const dataSource = new DataSource({
    store: OrderGridStore,
    reshapeOnPush: true,
    paginate: true,
    pageSize: 10
   });  
 

    return (
        <DataGrid
          dataSource={dataSource}
          defaultColumns={columns}
          showBorders={true}
          defaultPageSize={2}
          defaultPageIndex={1} 
        />
      );
}

export default GridData;
