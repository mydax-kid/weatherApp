
let weather= {
  
  appId: process.env.API_KEY,
  
  fetchweather: function(cityName){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${this.appId}`)
   .then(response =>{
    return response.json();
 })
   .then(data =>{
    // console.log(data)
    this.displayWeather(data)
 })
  },
  
 displayWeather: function(data){
   const city= data.name;
   const {temp}= data.main
   const {main, description}= data.weather[0];
   const {speed} = data.wind;
   const {humidity} = data.main;
   
   //console.log({city,temp, main, description, speed, humidity})
   
   document.getElementById('city').innerText= city;
   document.getElementById('temperature').innerText= temp+' °C';
   document.getElementById('weather-type').innerText= main
   //document.getElementById('icon')
   document.getElementById('wind-speed').innerText= 'Winds speed: '+ speed +'m/s'
   document.getElementById('humidity').innerText= 'Humidity level: '+humidity+'%';
   
   this.setBanner(main);  
 },
  
  setBanner: function(weatherType){
    const banner = document.querySelector('.weather-container');  
    
    switch(weatherType){
      case 'Clear': 
        banner.style.backgroundImage= "url('https://images.pexels.com/photos/518415/pexels-photo-518415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
        break;
      case 'Clouds': 
         banner.style.backgroundImage= "url('https://images.pexels.com/photos/417063/pexels-photo-417063.jpeg?auto=compress&cs=tinysrgb&w=600')";
        break;
      case 'Rain': 
         banner.style.backgroundImage= "url('https://images.pexels.com/photos/39811/pexels-photo-39811.jpeg?auto=compress&cs=tinysrgb&w=600')";
        break;
      case 'Thunderstorm': 
         banner.style.backgroundImage= "url('https://images.pexels.com/photos/3999923/pexels-photo-3999923.jpeg?auto=compress&cs=tinysrgb&w=600')";
        break;
      case 'Snow': 
         banner.style.backgroundImage= "url('https://images.pexels.com/photos/907284/pexels-photo-907284.jpeg?auto=compress&cs=tinysrgb&w=600')";
        break;
       default:
         banner.style.backgroundImage= "url('https://i.insider.com/5ed7da3b2618b908386c02d6?width=1000&format=jpeg&auto=webp')";
        break;
    }
  },
  
  start: function(){
    let cityName= document.getElementById('input-text').value;
    this.fetchweather(cityName);
  }
}


//fetch data on search button press
document.getElementById('input-button').addEventListener('click', function(){
  weather.start();
  document.getElementById('input-text').value= '';
})

//fetch data on enter button press
document.getElementById('input-text').addEventListener('keyup', function(e){
  if(e.key == 'Enter'){
    weather.start();
    document.getElementById('input-text').value= '';
  }
})

