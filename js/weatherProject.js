const APP_KEY="f492bdbd6d8e67afceeb4d2fac98ae9b";
let input=document.querySelector("#input");
let temp=document.querySelector("#temp");
let cityName=document.querySelector("#cityName");
let template=document.querySelector("#template");
input.addEventListener("keyup",e=>{
    let value=e.target.value;
    if(e.key==="Enter")
    {
        getWeatherReport(value);
    }
});
// async function getWeatherReport(city){
//     let BASE_URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_KEY}`;
//     let data=await fetch(BASE_URL);
//     let res=await data.json();
//     console.log(res);
//     // cityName.innerHTML=`<span> ${city} </span>`;
//     // temp.innerText=res.main.temp;
//     let weatherData=res.weather;
//     let output="";
//     for(let weather of weatherData)
//     {
// output+=`<h1>Weather Forecast Here</h1>
// <h1 id="cityName">${res.name}</h1>
// <h2 id="temp">${Math.round(res.main.temp-273.15)}&deg;</h2>`
//     }
// template.innerHTML=output;
// }
async function getWeatherReport(city){
    let BASE_URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_KEY}`;
    let data=await fetch(BASE_URL);
    let res=await data.json();
    console.log(res);
    let weatherData=res.weather;
    let output="";
    for(let weather of weatherData)
    {
output+=`<h1>Weather Forecast Here</h1>
<h1 id="cityName">${res.name}</h1>
<h2 id="temp">${Math.round(res.main.temp-273.15)}&deg;c</h2>
<footer>
<div class="icon">
<img src=http://openweathermap.org/img/w/${weather.icon}.png />
${weather.description}</div>
<div class="main">${weather.main}</div>
<div class="desc">${weather.main}</div>
<div class="desc">${weather.description}</div>
</footer>`
    }
template.innerHTML=output;
}

async function getCurrentPosition()
{
    window.navigator.geolocation.getCurrentPosition(async({coords})=>{
console.log(coords);
let lat=coords.latitude;
let long=coords.longitude;
let url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APP_KEY}`;
let data=await window.fetch(url);
let res=await data.json();
console.log(res);
template.innerHTML=`<div><h1>Weather Forecast Here</h1>
<h1 id="cityName">${res.name}</h1>
<h2 id="temp">${Math.round(res.main.temp-273.15)}&deg;c</h2></div>`

    })
}
window.addEventListener("DOMContentLoaded",getCurrentPosition)