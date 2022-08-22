import React, { useState, useEffect } from 'react';

import Form from 'devextreme-react/form';
import Employe from '../data/formdata';
import '../css/formData.css';
import { Button } from 'devextreme-react/button';
import notify from 'devextreme/ui/notify';
import axios from 'axios';

const colCountByScreen = {
  sm: 2,
  md: 2,
};



function TraderForm() {
  const [form , setForm] = useState({
    ordType: '1',
    side: '1',
    symbol: 'BABA',
    timeInForce: "1",
    account: 'qatest21account1',
    orderQty: '100',
    
   
  })
  const handleFormData = async(e)=>{
    let token = localStorage.getItem("api_access_token")
    console.log(token)
    await axios.post( 'http://173.255.116.184:8002/int/ord/api/orders',
    {
        ordType: "1",   
        side: "1",   
        symbol: "LUMN",
        timeInForce: "1",   
        account: "qatest24account1",   
        orderQty: 100 
    },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    ).then(function(response){
      console.log(response)
    }).catch((err)=>console.log(err)); 
   
  }

    return (
      <div className='Orderform'>

        <div>Order Form</div>

        <Form
          id="form"
          formData={form}
          colCountByScreen={colCountByScreen}
          labelLocation="top"
          minColWidth={533}
          colCount="auto"
          screenByWidth={screenByWidth}
          // onValueChanged={handleFormData}
        />
        <div className="buttons-demo">
        <div className="buttons">
        <Button
                  width={120}
                  text="BUY"
                  type="default"
                  stylingMode="contained"
                  onClick={handleFormData}
                />
        </div>
        </div>
      </div>
    );
  }

function screenByWidth(width) {
  return width < 720 ? 'md' : 'md';
}

export default TraderForm;