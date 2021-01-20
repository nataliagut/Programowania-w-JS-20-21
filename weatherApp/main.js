const api = {
    myKey: '9c034d38b4b5bf449789fa1a4c212ce0',
    url: 'https://api.openweathermap.org/data/2.5/'

}
const keyLS = 'cityLS';
let citiesSearched = [];
window.onload = loadLastInfoFromLS();
//referencje
let locationArea = document.querySelector('.city');
let temperatureArea = document.querySelector('.degree');
let descArea = document.querySelector('.description');
let dateArea = document.querySelector('.date');
let updateArea = document.querySelector('.lastUpdate');
let IconArea = document.querySelector('.iconWeather');
let humidityArea = document.querySelector('.humidity');
let sunriseArea = document.querySelector('.sunrise');
let sunsetArea = document.querySelector('.sunset');


const searchInput = document.getElementById('search');
//console.log(searchInput);
searchInput.addEventListener('keypress', catchInput);

//enter keycode 13
function catchInput(ev)
{  
if(ev.keyCode === 13){
    cityName = searchInput.value;
    //console.log(cityName);
    citiesSearched.push(cityName);
    //console.log(citiesSearched);
    localStorage.setItem(keyLS, JSON.stringify(citiesSearched)); 
    sendQueryGetInfo(cityName);
}

} 
function sendQueryGetInfo(cityName){
    fetch(`${api.url}weather?q=${cityName}&appid=${api.myKey}`)
    .then(weather => {
        return weather.json();
        
    })
    .then(displayInfo);
    //pushToList();
}
function displayInfo (weather){
    
    locationArea.innerText = `${weather.name}, ${weather.sys.country}`;
    let temp = Math.round(weather.main.temp - 272.15);
    temperatureArea.innerText = temp + '°C';
    temperatureArea.setAttribute('style', 'font-size: 4em;')
    descArea.innerText = weather.weather[0].main;
    dateArea.innerText = new Date().toLocaleDateString();
    updateArea.innerText =  'Last update: ' + new Date().toLocaleTimeString();
    let sunriseUnix = weather.sys.sunrise;
    let sunriseTime = new Date(sunriseUnix * 1000);
    let sunsetUnix = weather.sys.sunset;
    let sunsetTime = new Date(sunsetUnix * 1000);
    humidityArea.innerText = 'Humidity: ' + weather.main.humidity + '%';
    sunriseArea.innerText = 'Sunrise: ' + sunriseTime.toLocaleTimeString();
    sunsetArea.innerText = 'Sunset: ' + sunsetTime.toLocaleTimeString();
    console.log(locationArea.innerText);
    console.log(descArea.innerText);
    iconId = weather.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
   // console.log(iconUrl);
    IconArea.src = iconUrl;
    
    
}

function loadLastInfoFromLS(){
    
    const citiesFromLocalStorage = JSON.parse(localStorage.getItem(keyLS));

        if (citiesFromLocalStorage != null ) {
            citiesFromLocalStorage.forEach((cityName) => {
                
            var lastItem = citiesFromLocalStorage.pop();
            //console.log(lastItem);
            sendQueryGetInfo(lastItem);
            
        })
        
    }
}
function UpdateInfo(){
    loadLastInfoFromLS();
}
setInterval(() => {
    UpdateInfo();
}, 120000);