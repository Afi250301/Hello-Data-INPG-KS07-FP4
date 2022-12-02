// script button pd input
let btn = document.querySelector(".mb-3"),
    spinIcon = document.querySelector(".spinner"),
    btnText = document.querySelector(".btn-text");

    btn.addEventListener("click", () => {
    btn.style.cursor = "wait";
    btn.classList.add("checked");
    spinIcon.classList.add("spin");
    btnText.textContent = "Loading";
setTimeout(() => {
    btn.style.pointer = "wait";
    spinIcon.classList.replace("spinner","check");
    spinIcon.classList.replace("bi-arrow-clockwise","bi-check-lg");
    btnText.textContent = "Done";
}, 5000)
});

const weatherPic = document.getElementById("weatherPic"); //gambar cuaca
const temp = document.getElementById("temp"); //label suhu di kiri
const time = documet.getElementById("time"); //label waktu update di kiri
const weatherText = document.getElementById("weatherText"); //label tulisan weather
const rainChance = document.getElementById("rainChance"); //label logo hujan disebelah kiri
const cityLabel = document.getElementById("cityLabel"); //label nama city yang terpilih
const inputCity = document.getElementById("inputCity");
const inputDate = document.getElementById("inputDate");
const inputButton = document.getElementById("inputButton");

let chosenCity;
let chosenDate;

async function getData () {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'INPUT KEY',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try{
        const resp = await fetch('https://weatherapi-com.p.rapidapi.com/history.json?q=London&dt=2022-11-30&lang=en', options)
        const data = await resp.json();
        console.log(data);
        console.log("data 2 : ", data.forecast.forecastday[0].day)
        // return displayStats(data);
    } catch (err) {
        console.log("failed to fetch : ", err); //REMOVE when submit
    }
}

const accessTime = () => {

}

// const displayStats = (data) => { //kurang peluang hujan, waktu akses
//     let {avgtemp_c:temperature, maxwind_kph:windSpeed, avghumidity, avgvis_km: pressure} = data.forecast.forecastday[0].day;
//     let {text:condition} = data.forecast.forecastday[0].day.condition;
// }