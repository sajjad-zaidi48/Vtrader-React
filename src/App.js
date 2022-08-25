import React, { useState, useEffect ,CSSProperties } from 'react';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';
import GridData from './components/datagrid';
import TraderForm from './components/traderform';
import { Button } from 'devextreme-react/button';
import axios from 'axios';
import SocketConnecter from './service/reactServices';
import MoonLoader from "react-spinners/MoonLoader";
import Subscribe from './service/orderSubscribe';


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "black",
  marginLeft: '1rem',
  marginRight:'1rem'
};

function App() {
  const [codeId, setcodeId] = useState('')
  let [loading, setLoading] = useState(false);

  const [userlogin, setuserlogin] = useState(false);

  const [test, setTest] = useState(false);
  
 
  async function login() {
     setLoading(true)
    await axios.post("http://173.255.116.184:8002/int/is/api/login",
      {
        email: 'qatest24@mailinator.com',
        password: 'qatest24',
        captchaToken: ''
      }
    ).then(function (response) {
      if (response.data.status == true && response.data.codeId != null) {
        setcodeId(response.data.codeId)
        //  axios  TFA 
        axios.post('http://173.255.116.184:8002/int/is/api/login/tfa/' + response.data.codeId + "/123456")
          .then(function (response) {
            let bearerToken = response.data.access_token
            localStorage.setItem("api_access_token", bearerToken)
            setLoading(false)
          })
          .catch(err => console.warn(err));
      }
    }).catch(function (error) {
      console.log(error)
    });

    // setFetchedData(data)
  }



  useEffect(() => {
    handleData()

    // 
  }, [])

  const handleData = (data) => {
    // socketData.push(data)
    console.log('getting socket on message data from child ', data)
    setTest(true)
    return data

  }
  const handleLogin = (e) => {
    // e.preventDefault();
    login()
  }

  const checkingTest = () => {
    console.log('checked')
    setTest(true)
    return true
  }
  return (
    <div >

      <SocketConnecter handleData={handleData}  />

      {/* <ReactSocket/> */}
      
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
            <MoonLoader color={'#337ab7'} loading={loading} cssOverride={override} size={20} />

        </div>


      </div>
      <div className='dashBoard'>
        <div >
          <TraderForm checkingTest={checkingTest}   />
        </div>
        <div className='orderBlotter'>
          <GridData handleData={handleData} login={userlogin} checkingTest={checkingTest}   />
        </div>
      </div>


    </div>
  );
}

export default App;