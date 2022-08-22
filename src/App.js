import React, { useState, useEffect } from 'react';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';
import GridData from './components/datagrid';
import TraderForm from './components/traderform';
import { Button } from 'devextreme-react/button';
import axios from 'axios';
import SocketConnecter from './service/reactServices';



function App() {
  const [codeId, setcodeId] = useState('')
  const [tfa, setTfa] = useState('')

  async function fetchData() {
    await axios.post("http://173.255.116.184:8002/int/is/api/login",
    
    {
    email: 'qatest24@mailinator.com',
    password : 'qatest24',
    captchaToken : ''
    }
    ).then(function(response){
    if(response.data.status == true && response.data.codeId != null)
      { 
      setcodeId(response.data.codeId)
      //  axios  TFA 
      axios.post('http://173.255.116.184:8002/int/is/api/login/tfa/'+response.data.codeId+"/123456")
     .then(function(response){
      let bearerToken =  response.data.access_token
      localStorage.setItem("api_access_token", bearerToken)
      })
     .catch(err => console.warn(err));
      }       
    }).catch(function(error){
     console.log(error)
    });

    // setFetchedData(data)
  }
  
 

  useEffect(() => {
    // 
  }, [])

  const handleData = (data)=>{
    return data
  }
 const handleLogin=(e)=>{
  // e.preventDefault();
  fetchData()
 }
  return (
    <div >
      <SocketConnecter handleData={handleData} />
      <div className='nav'>
        <h1>V-Trader App</h1>
        <div className='btn-login'>
        <Button
                  width={120}
                  text="login"
                  type="default"
                  stylingMode="contained"
                  onClick={handleLogin}
                />
        </div>

        
      </div>
      <div className='dashBoard'>
      <div >
          <TraderForm />
        </div>
        <div className='orderBlotter'>
          <GridData />
        </div>
      </div>
        
        
    </div>
  );
}

export default App;