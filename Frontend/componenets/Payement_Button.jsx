import React from 'react'
import userazorpay from " react-razorpay"// install this lib


const Payement_Button = () => {
  const[razorpay] = userazorpay(); // as it is destructing as the usehook may have array of functions 

  const RAZORPAY_KEY_ID =import.meta.env.RAZORPAY_ID;// get the razorpay id

  const handlePayment = async (res,req) => { 
    // the whole payment will done this functions
    try{
      const response = await fetch("",{   //( use a url route to integrate in this)
          method: "POST",
          headers: {
            "content-type" : "application/JSON"
          },
          body: JSON.stringify(
            {
              amount:500000   // simple converting string into JSON to api
            }
          ),
      }); 
      
      const order =await response.json();
      console.log(order);

      const options ={
        key:RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Test Payment",
        description:"order",
        order_id:order.id,
         handle :  async(response) =>{
    try{  
         await fetch('url',{
          method: "POST",
          headers:{
            "content-type":"application/JSON"
          },
          body: JSON.stringify({
            razorpay_order_id :response.razorpay_order_id,
            razorpay_payement_id:response.razorpay_payment_id,
            razorpay_signature:response.razorpay_signature,
          }),

          });
          alert("payment succed bro !");
         }
         catch(err){
          alert( "payment failed bro !"+err.message);
         }
        
      },
      theme:{
        color : "#3399cc"
      },
      
      };
   const rzpay = new Razorpay(options);
         rzpay.open(options);
    }  
  catch(err){
alert(err.message);
    }
  }
      // add button to the page 
      


  return (
    <div>
       
    </div>
  )

}
export default Payement-Button
