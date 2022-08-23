import React, { useState, useEffect } from 'react';
import Subscribe from '../service/orderSubscribe';
import Form from 'devextreme-react/form';
import '../css/formData.css';
import { Button } from 'devextreme-react/button';
import axios from 'axios';

const colCountByScreen = {
  sm: 2,
  md: 2,
};



function TraderForm({handleData,checkingTest}) {
  let [formData , setFormData] = useState({
    ordType: '1',
    side: '1',
    symbol: 'MSFT',
    timeInForce: "1",
    account: 'qatest24account1',
    orderQty: '100',
  })

  // handleForm  

  const handleFormData = async(e)=>{
    let token = localStorage.getItem("api_access_token")
    let x =  {
      ordType: "1",   
      side: "1",   
      symbol: "LUMN",
      timeInForce: "1",   
      account: "qatest24account1",   
      orderQty: 100 
   }
   console.log('formData' , formData)
   console.log(x)
    await axios.post( 'http://173.255.116.184:8002/int/ord/api/orders',
    x,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    ).then(function(response){
      console.log('buy response' , response)
      Subscribe()
    }).catch((err)=>console.log(err)); 
   
  }

  
 

    return (
      <div className='Orderform'>

        <div>Order Form</div>

        <Form
          id="form"
          formData={formData}
          colCountByScreen={colCountByScreen}
          labelLocation="top"
          minColWidth={533}
          colCount="auto"
          screenByWidth={screenByWidth}
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