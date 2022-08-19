import React, { useState, useEffect } from 'react';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';
import GridData from './components/datagrid';
import TraderForm from './components/traderform';
import { Button } from 'devextreme-react/button';
import axios from 'axios';



function App() {
  const [codeId, setcodeId] = useState('')
  const [tfa, setTfa] = useState('')

  async function fetchData() {
    await axios.post("http://173.255.116.184:8002/int/is/api/login",
    
    {
    email: 'qatest34@mailinator.com',
    password : 'qatest34',
    captchaToken : ''
    }
    ).then(function(response){
    if(response.data.status == true && response.data.codeId != null)
      { 
      let codeId = 
      setcodeId(response.data.codeId) 
      setTfa(123456)
      console.log(response.data)
    
      // console.log(`http://173.255.116.184:8002/int/is/api/login/tfa
      // ?codeId=${codeId}&tfaCode=${TFA}`)
      // ===========
     
      // axios.post("http://173.255.116.184:8002/int/is/api/login",
      // {
      //   codeId :codeId,
      //   tfa:TFA
      //   }
      //   ).then(function(response){
      //     console.log(response)
      //   })

      //   }

      //  axios.post(`http://173.255.116.184:8002/int/is/api/login/tfa?codeId=${codeId}&tfaCode=${TFA}`)

      // 'int/is/api/login/tfa?codeId='+codeId+'&tfaCode='+TFA

      // localStorage.setItem("verification_id",response.data.codeId)  
      //  localStorage.setItem("api_access_token",response.data.token)
      // localStorage.setItem("email",self.email) 

      }       
    }).catch(function(error){
     console.log(error)
    });

    // setFetchedData(data)
  }
  
  async function handleTfa(){
    console.log('tfa', codeId)
    axios.post('http://173.255.116.184:8002/int/is/api/login/tfa',null,{ params: {
      codeId: codeId ,
      tfaCode: 123456
    }},{
      'Content-Type': 'application/json',
    })
    .then(response => response.data)
    .catch(err => console.warn(err));

  }

  useEffect(() => {
    // fetchData()
  }, [])

 const handleLogin=(e)=>{
  // e.preventDefault();
  fetchData()
 }
  return (
    <div >
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
        <Button
                  width={120}
                  text="login"
                  type="default"
                  stylingMode="contained"
                  onClick={handleTfa}
                />
        
      </div>
      <div className='dashBoard'>
      <div >
          <TraderForm/>
        </div>
        <div className='orderBlotter'>
          <GridData />
        </div>
      </div>
        
        
    </div>
  );
}

export default App;
