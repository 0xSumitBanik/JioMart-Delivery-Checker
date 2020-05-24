const message_block = document.getElementById('message')
let data = ''
find = (pincode) => {

  console.log(typeof(pincode))
  if(pincode.value==''){
    document.querySelector('#message').style.visibility='visible'
    message_block.innerHTML=`<span style="color:red">Pincode cannot be blank!</span>`
  }
  else if(pincode.value.length<6){
    document.querySelector('#message').style.visibility='visible'
    message_block.innerHTML=`<span style="color:red">Please enter a 6 digit Pincode!</span>`
  }
    
  else{
      const request = new XMLHttpRequest()
      const URL = 'https://www.jiomart.com/mst/rest/v1/pin/'+pincode.value
      request.open('GET',URL,true)
      
      request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE && request.status ===200){
          data = JSON.parse(request.responseText)
          document.querySelector('.location-details').style.visibility='visible'
          document.querySelector('#message').style.visibility='visible'
          message_block.innerHTML=`<span style="color:green">Delivery is available in your area</span>`
          document.querySelector('#city_name').innerHTML=data.result.city
          document.querySelector('#state_name').innerHTML=data.result.state_name
          document.querySelector('#state_code').innerHTML=data.result.state_code
        }
        else if(request.status === 400){
          document.querySelector('#message').style.visibility='visible'
          message_block.innerHTML=`<span style="color:red">Sorry, Delivery is not available at your Pincode. </span>`
        }
      }
      request.send()
    }
  
}