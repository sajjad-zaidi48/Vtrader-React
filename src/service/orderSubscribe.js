import axios from 'axios';
let token = localStorage.getItem('api_access_token');
console.log(token);
const  Subscribe =()=>{

    axios.get('http://173.255.116.184:8002/int/ord/api/subscription/orders/subscribe',{
        headers: { Authorization: `Bearer ${token}` }
      })
    .then(function(response){
       console.log('subscribe response' , response)
    //    return response
     })
    .catch(err => console.log('checking in socket onOpen' , err));
}
export default Subscribe