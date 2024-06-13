'use strict'

import { apiKey } from './config/config.js';

const weather = document.querySelector('.weather');
const town = document.querySelector('.town');
const nowTemp = document.querySelector('.tempreture');
const feelTemp = document.querySelector('.tempreture1');
const rain = document.querySelector('.rain');
const date = document.querySelector('.date');
const putIcon = document.querySelector('.icon');
const humid = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const clouds = document.querySelector('.clouds');

getCurrentDate();
function getCurrentDate() {
  const months = ['Декабря', 'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября'];
  let newData = new Date();
  let month = newData.getMonth() + 1;
  let day = newData.getDate();
  let year = newData.getFullYear();
  date.textContent = `${day.toString()} ${months[month].toString()} ${year.toString()} г.`;
}

getCurrentWeather();
function getCurrentWeather() {
  getLocation();
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        let longitude = position.coords.longitude;
        let latitude = position.coords.latitude;
        let base = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=ru&appid=${apiKey}&units=metric`;
        console.log(base);

        await getWeather();
        async function getWeather() {
          const response = await fetch(base);
          const data = await response.json();
          console.log(data);

          town.innerHTML = data.name;
          nowTemp.innerHTML = `${Math.round(data.main.temp)}&#8451`;
          rain.innerHTML = data.weather[0].description;
          feelTemp.innerHTML = `Ощущается как ${Math.floor(data.main.feels_like)}&#8451`;
          humid.innerHTML = `&#128167 Влажность ${data.main.humidity}&#37`;
          wind.innerHTML = `Cкорость ветра ${Math.round(data.wind.speed)} м/с <br>Порыв ветра ${Math.round(data.wind.gust)} м/с`;
          clouds.innerHTML = `Облачность ${data.clouds.all}&#37`;

          const iconka = data.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconka}@2x.png`;
          putIcon.innerHTML = `<img src=${iconUrl} referrerpolicy="origin" alt="Иконка" width="170px" height="170px">`;

          getCurrentImg()
          function getCurrentImg() {
            let month1 = (new Date()).getMonth()+1;
            const seasons = ["Зима", "Весна", "Лето", "Осень", "Зима"];
            let currentSeason = (month1 > 0 && month1 <= 12) ? seasons[Math.trunc(month1 / 3)] : "Ошибка";
            let temp = +data.main.temp;
            let descr = String(data.weather[0].description);
            let gradient = `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4))`;
            console.log(month1, temp, descr, gradient);
            if ((descr == 'cнег') || (descr == 'небольшой cнег')) {
              weather.style.backgroundImage = `${gradient}, url('Фото/Снег.jpg')`;
            } else if ((descr == 'дождь') || (descr == 'небольшой дождь')) {
              weather.style.backgroundImage = `${gradient}, url('Фото/Дождь.jpg')`;
            } else if ((temp <= 0) && (currentSeason === 'Зима')) {
              weather.style.backgroundImage = `${gradient}, url('Фото/Зима.jpg')`;
            } else if ((temp >= 5) && (currentSeason === 'Весна')) {
              weather.style.backgroundImage = `${gradient}, url('Фото/Весна.jpg')`;
            } else if ((temp >= 10) && (currentSeason === 'Лето')) {
              weather.style.backgroundImage = `${gradient}, url('Фото/Лето.jpg')`;
            } else if ((temp <= 0) && (currentSeason === 'Осень')) {
              weather.style.backgroundImage = `${gradient}, url('Фото/Осень.jpg')`;
            }
          }
        }
      })
    }
  }
}



