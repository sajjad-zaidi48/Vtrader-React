import axios from 'axios';

const  Subscribe =()=>{
  let token = localStorage.getItem('api_access_token');
   console.log(token);

    axios.get('http://173.255.116.184:8002/int/ord/api/subscription/orders/subscribe',{
        headers: { Authorization: `Bearer ${token}` }
      })
    .then(function(response){
    //    return response
     })
    .catch(err => ('checking in socket onOpen' , err));
}
export default Subscribe