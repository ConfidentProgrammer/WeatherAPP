//taking all the queries
var city = document.getElementById('city');
var btn = document.getElementById('go');
var apiKey = "6a8b6d82f8e40bd171d9de573590e9c7";
var temp = document.getElementById('temp');
var desc = document.getElementById('description');
var time = document.getElementById('time');
var wallpaper = document.getElementById('wallpaper');
var long = 0;
var lat = 0;
var displayCity = document.getElementById('Displaycity');
//showing the timeout

 //making the fuctions time function
function showTime(){
  var datetime = new Date();
  var hr = datetime.getHours();
  var min = datetime.getMinutes();
  //var sec = datetime.getSeconds();

  //setting the wallapers
  if(hr>7 && hr <= 19){
    wallpaper.style.background = "url('https://media.giphy.com/media/mW03sTZVT9IY0/giphy.gif')";
    document.body.style.background = "url('bckblur1.JPG')";
    document.body.style.backgroundSize = 'cover';
  }else {
    wallpaper.style.background = "url('https://media.giphy.com/media/aaTz9fnXkzoQ/giphy.gif')";
    document.body.style.background = "url('bckblur2.JPG')";
    document.body.style.backgroundSize = 'cover';
  }
  if(min<10 && hr>12){
    time.innerHTML = hr-12+ ":" +"0"+min;
    //adding the new wallpaper


  }else if(min<10 && hr<12){
    time.innerHTML = hr+ ":" +"0"+min;

  }else if(hr<12){
    time.innerHTML = hr+ ":" +min;
  //  wallpaper.style.background = "url('https://media.giphy.com/media/3o7aCRZYNerX4ovPwI/giphy.gif')";

  }else{
    time.innerHTML = hr-12+ ":" +min;
  //  wallpaper.style.background = "url('https://media.giphy.com/media/aaTz9fnXkzoQ/giphy.gif')";

  }

}
setInterval(showTime,1000);


//fetching the api
btn.addEventListener("click",function(){
  fetch("http://api.openweathermap.org/data/2.5/weather?q="+city.value+"&appid="+apiKey+"&units=metric")
  .then(response => response.json())
  .then(data => {
  //   var get = "Temperature: "+data['main']['temp']+'<br>'+" Description: "+data['weather'][0]['main'];
  // info.innerHTML =get;

  //printing the degrees
  temp.innerHTML = data['main']['temp']+"&#176;";
  desc.innerHTML = data['weather'][0]['main'];
  displayCity.innerHTML = data['name'];


  })

})

//geting the current locations of the data

//API api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}

window.addEventListener('load',function(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
       long = position.coords.longitude;
       lat = position.coords.latitude;
    //  console.log(long+" "+lat);
    var currentAPI = 'api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid='+apiKey;
    fetch('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid='+apiKey+'&units=metric')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      temp.innerHTML = data['main']['temp']+"&#176;";
      desc.innerHTML = data['weather'][0]['main'];
      displayCity.innerHTML = data['name'];
    })
    })
  }else{
    alert("Location Access BLocked!");
  }
  //fetching the api


})
