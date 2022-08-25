import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Subscribe from  './orderSubscribe'
import { emitCustomEvent } from 'react-custom-events'


const socketConnect = io();
let token = localStorage.getItem('api_access_token');
let socket = new WebSocket('ws://173.255.116.184:8002/transactionalws?access_token='+token);
socket.close()
function  SocketConnecter({handleData}) {
 

  
  useEffect(() => {
    

    if (socket.readyState === 3 && localStorage.getItem('api_access_token')) {
         socket = new WebSocket('ws://173.255.116.184:8002/transactionalws?access_token='+token);         
    }
    
    socket.onopen = function() {
        // Subscribe()
         
    }

    socket.onmessage = function(msg) {
        const data = JSON.parse(msg.data)
        if (data.method === 'Orders'){
            emitCustomEvent('my-event', data)
            // emitter.$emit('ordersSubscribeEvent', data)
        }     
    }

    socket.onclose = function(e) {
        if (localStorage.getItem('api_access_token')){
            setTimeout(function() {
               
            }, 5000)
        }
    }

    socket.onerror = function(err) {
        console.log('Socket', err)
    }
    

    

    return () => {
    };
  }, []);

  
 

  return (
    <div>
     
    </div>
  );
}

export default SocketConnecter;