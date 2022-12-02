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
const temp2 = document.getElementById("temp2");
const time = document.getElementById("time"); //label waktu update di kiri
const weatherText = document.getElementById("weatherText"); //label tulisan weather
const humidityLabel = document.getElementById("humidityLabel");
const windSpeed = document.getElementById("windSpeed");
const windPressure = document.getElementById("windPressure")
const rainChance = document.getElementById("rainChance"); //label logo hujan disebelah kiri
const update = document.getElementById("update");
const cityLabel = document.getElementById("cityLabel"); //label nama city yang terpilih
const inputCity = document.getElementById("inputCity");
const inputDate = document.getElementById("date");
const inputButton = document.getElementById("inputButton");

let chosenCity;
let chosenDate;

// const getInput = () => {

// } 

async function getData () {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e5ab1f03afmshd88df2d477f5c04p1b8fe5jsnf39836997ae2',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try{
        const resp = await fetch('https://weatherapi-com.p.rapidapi.com/history.json?q=London&dt=2022-11-30&lang=en', options)
        const data = await resp.json();
        console.log(data); // REMOVE 
        console.log('feels like',data.forecast.forecastday[0].hour[5].feelslike_c);//REMOVE
        return displayStats(data);
    } catch (err) {
        console.log("failed to fetch : ", err); //REMOVE when submit
    }
}

const displayStats = (data) => { //kurang peluang hujan, waktu akses
    let currentHour = moment().format("h");
    let currentTime = moment().format("dddd, h:mm a")
    let lastUpdate = moment().format("h.00 a")
    let {humidity, temp_c, feelslike_c, gust_kph:wind, pressure_mb:pressure, chance_of_rain:rain} = data.forecast.forecastday[0].hour[currentHour];
    let {text:condition} = data.forecast.forecastday[0].hour[currentHour].condition;
    console.log('humidity ', humidity);
    console.log('condition', condition);

    temp.firstChild.nodeValue = temp_c + '\u00B0C';
    time.firstChild.nodeValue = currentTime;
    weatherText.firstChild.nodeValue = condition;
    temp2.firstChild.nodeValue = feelslike_c + '\u00B0C';
    humidityLabel.firstChild.nodeValue = humidity + '%';
    windSpeed.firstChild.nodeValue = wind + ' km/h';
    windPressure.firstChild.nodeValue = pressure + ' mb';
    rainChance.firstChild.nodeValue = rain + '%';
    update.firstChild.nodeValue = lastUpdate;

}

getData();