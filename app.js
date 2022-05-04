import {months, weekdays} from './assets.js'
const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const currentDay = currentDate.getDate();

const futurDate = new Date(currentYear, currentMonth, currentDay + 10, 11, 30, 0);

const year = futurDate.getFullYear();
const month = futurDate.getMonth() ;
const weekday = futurDate.getDay();
const date = futurDate.getDate();
const hour = futurDate.getHours();
const minutes = futurDate.getMinutes();
const time = (hour >= 12) ? "PM" : "AM";

giveaway.textContent = `Giveaway ends on ${weekdays[weekday]}, ${date} ${months[month]} ${year}, ${hour}:${minutes} ${time}`

const getRemainigTime = ()=> {

    const present = new Date().getTime();
    const future = futurDate.getTime();
    const t = future - present;

    // 1s - 1000ms
    // 1m = 60s
    // 1h = 60m
    // 1d = 24h

    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    let days = Math.floor(t / oneDay);
    let hours = Math.floor(t % oneDay / oneHour );
    let mins = Math.floor(t % oneHour/oneMinute);
    let seconds = Math.floor(t % oneMinute / 1000);

    const values = [days, hours, mins, seconds]

    const format = e =>{
        if(e < 10) {
            return e = `0${e}`;
        }
        return e;
    }

    items.forEach((item, index )=> {
        item.textContent = format(values[index]);

        if(t <= 0 ){
            clearInterval(countdown);
            deadline.innerHTML = `<h4 class ="expired">Sorry, This giveaway has expired</h4>`;
        }
    })

}

let countdown = setInterval(getRemainigTime, 1000);

getRemainigTime();