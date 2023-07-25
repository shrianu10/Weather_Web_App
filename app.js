const weatherApi ={
    key:"b5d210d244a43689256915d6e3ae5014",
    baseUrl:"https://api.openweathermap.org/data/2.5/weather",
}
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const searchInputBox = document.getElementById('input-box');
//Event listener function on key press
searchInputBox.addEventListener('keypress', (event) => {
    
    if(event.keyCode == 13){
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display="block";
    }
});
//Get weather report and current location

function locationaccess(){
navigator.geolocation.getCurrentPosition(onSuccess);
}
function onSuccess(position){
    document.querySelector('.weather-body').style.display="block";
     console.log(position);
    const{latitude,longitude,langitude}=position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApi.key}&lang=${langitude}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}
function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}
//Show weather report
function showWeatherReport(weather){
    console.log(weather);
   
    let city = document.getElementById('city');
    city.innerText=`${weather.name}, ${weather.sys.country}`;

    let temp =document.getElementById('temp');
    temp.innerHTML=`${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML= `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weatherType=document.getElementById('weather');
    weatherType.innerText= `${weather.weather[0].main}`;

    let date= document.getElementById('date');
    let todayDate= new Date();
    date.innerText =  dateManage(todayDate);
    
    let dn=document.getElementById('icons');
    dn=String(`${weather.weather[0].icon}`);

     let icon=document.getElementById('icons');
    icon.innerHTML=`<img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png">`;
    if(dn.includes("d")){
    if(weatherType.textContent == 'Clouds'||weatherType.textContent == 'Mostly Cloudy'||weatherType.textContent == 'Intermittent Clouds'){
        document.body.style.backgroundImage="url('icon/cloudy.jpg')";
       
    }
    else  if(weatherType.textContent == 'Clear' || weatherType.textContent=='Mostly Clear'){
        document.body.style.backgroundImage="url('icon/clear.jpg')";
    }
    else  if(weatherType.textContent == 'Rain' || weatherType.textContent == 'Showers'){
        document.body.style.backgroundImage="url('icon/rain.jpg')";
    }
    else  if(weatherType.textContent == 'Snow'){
        document.body.style.backgroundImage="url('icon/snow.jpg')";
    }
    else  if(weatherType.textContent == 'Thunderstorm'){
        document.body.style.backgroundImage="url('icon/thunderstorm.jpg')";
    }
    else  if(weatherType.textContent == 'Haze'){
        document.body.style.backgroundImage="url('icon/haze.jpg')";
    }
    else if(weatherType.textContent == 'Mist'|| weatherType.textContent == 'Fog'){
        document.body.style.backgroundImage="url('icon/mist.jpg')";
    } 
    else if(weatherType.textContent == 'Smoke'){
        document.body.style.backgroundImage="url('icon/smoke.jpg')";
    }
    else if(weatherType.textContent == 'Sunny'||weatherType.textContent == 'Mostly Sunny'){
        document.body.style.backgroundImage="url('icon/sunny.jpg')";
    }
    else if(weatherType.textContent == 'Partly Sunny'||weatherType.textContent == 'Hazy Sunshine'){
        document.body.style.backgroundImage="url('icon/partlysunny.jpg')";
    }
    else  if(weatherType.textContent == 'Windy'){
        document.body.style.backgroundImage="url('icon/windy.jpg')";
    }}
    else
    {
        if(weatherType.textContent == 'Clouds'||weatherType.textContent == 'Mostly Cloudy'||weatherType.textContent == 'Intermittent Clouds'){
            document.body.style.backgroundImage="url('icon/cloudyn.jpg')";
           
        }
        else  if(weatherType.textContent == 'Clear' || weatherType.textContent=='Mostly Clear'){
            document.body.style.backgroundImage="url('icon/clearn.jpg')";
        }
        else  if(weatherType.textContent == 'Rain' || weatherType.textContent == 'Showers'){
            document.body.style.backgroundImage="url('icon/rainn.jpg')";
        }
        else  if(weatherType.textContent == 'Snow'){
            document.body.style.backgroundImage="url('icon/snown.jpg')";
        }
        else  if(weatherType.textContent == 'Thunderstorm'){
            document.body.style.backgroundImage="url('icon/thunden.jpg')";
        }
        else  if(weatherType.textContent == 'Fog'||weatherType.textContent == 'Haze'||weatherType.textContent == 'Mist'||weatherType.textContent == 'Smoke'){
            document.body.style.backgroundImage="url('icon/fogn.jpeg')";
        }
        else  if(weatherType.textContent == 'Windy'){
            document.body.style.backgroundImage="url('icon/windn.jpg')";
        }
    }
    
}
//date manage
function dateManage(dateArg){
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months=["January","Feburary","March","April","May","June","July","August","September","October","November","December"];
    let year = dateArg.getFullYear();
    let month=months[dateArg.getMonth()];
    let date=dateArg.getDate();
    let day=days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}