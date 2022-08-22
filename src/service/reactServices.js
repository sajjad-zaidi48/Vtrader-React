import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socketConnect = io();

function  SocketConnecter() {
  const [isConnected, setIsConnected] = useState(socketConnect.connected);
  const [lastPong, setLastPong] = useState(null);

  let token = localStorage.getItem('api_access_token');
  console.log(token)
  let socket = new WebSocket('ws://173.255.116.184:8002/transactionalws?access_token='+token);
  
  useEffect(() => {
    
    console.log('checking socket' , socket.readyState)

    connectServer()

    // socket.onopen = function() {
    //     console.log('Connected')
    //     let  token  = localStorage.getItem("api_access_token")
    //     axios.get('http://173.255.116.184:8002/int/ord/api/subscription/orders/subscribe',{
    //         headers: { Authorization: `Bearer ${token}` }
    //       })
    //     .then(function(response){
    //        console.log(response)

    //      })
    //     .catch(err => console.log('checking in socket onOpen' , err));
         

    // }
    

    

    return () => {
    };
  }, []);

  const connectServer = () => {
    
    if(socket.readyState < 3){

        socket = new WebSocket('ws://173.255.116.184:8002/transactionalws?access_token='+token);
        socket.onopen = function() {
            console.log('connected')
           
    
        }
        socket.onclose = function() {
            console.log('disconnected')
           
    
        }
    }

  }

 

  return (
    <div>
     
    </div>
  );
}

export default SocketConnecter;