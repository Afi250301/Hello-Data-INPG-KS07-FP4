const weatherPic = document.getElementById("weatherPic"); 
const temp = document.getElementById("temp"); 
const temp2 = document.getElementById("temp2");
const time = document.getElementById("time"); 
const weatherText = document.getElementById("weatherText"); 
const humidityLabel = document.getElementById("humidityLabel");
const windSpeed = document.getElementById("windSpeed");
const windPressure = document.getElementById("windPressure")
const rainChance = document.getElementById("rainChance"); 
const update = document.getElementById("update");
const weatherIcon = document.getElementById("weatherIcon");
const cityLabel = document.getElementById("cityLabel");
const inputCity = document.getElementById("inputCity");
const inputDate = document.getElementById("date");
const inputButton = document.getElementById("inputButton");
const btnText = document.querySelector("#btn-text");

let chosenCity;
let chosenDate;

inputCity.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      onSubmit();
    }
});

async function getData () {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'API KEY', //INPUT API KEY
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try{
        isLoading()
        const resp = await fetch(`https://weatherapi-com.p.rapidapi.com/history.json?q=${chosenCity}&dt=${chosenDate}&lang=en`, options)
        const data = await resp.json();
        return displayStats(data), isDone();
    } catch (err) {
        failNotice();
        isDone();
    }
}

const displayStats = (data) => { //kurang peluang hujan, waktu akses
    let currentHour = moment().format("h");
    let currentTime = moment().format("dddd, h:mm a")
    let lastUpdate = moment().format("h.00 a")
    let {humidity, temp_c, feelslike_c, gust_kph:wind, pressure_mb:pressure, chance_of_rain:rain} = data.forecast.forecastday[0].hour[currentHour];
    let {text:condition, icon} = data.forecast.forecastday[0].hour[currentHour].condition;
    let {country, name} = data.location;
    

    temp.firstChild.nodeValue = temp_c + '\u00B0C';
    time.firstChild.nodeValue = currentTime;
    weatherText.firstChild.nodeValue = condition;
    temp2.firstChild.nodeValue = feelslike_c + '\u00B0C';
    humidityLabel.firstChild.nodeValue = humidity + '%';
    windSpeed.firstChild.nodeValue = wind + ' km/h';
    windPressure.firstChild.nodeValue = pressure + ' mb';
    rainChance.firstChild.nodeValue = rain + '%';
    update.firstChild.nodeValue = lastUpdate;
    cityLabel.firstChild.nodeValue = `${name}, ${country}`;

    weatherIcon.src = 'https://' + icon;
}

const onType = () => {
    inputCity.classList.remove('error');
    inputDate.classList.remove('error');
}

const onSubmit = () => {
    chosenCity = inputCity.value;
    chosenDate = inputDate.value;

    chosenCity = chosenCity.replace(/\s/g, '%20')
    getData();
} 

const failNotice = () => {
    inputCity.classList.add('error');
    inputDate.classList.add('error');
    $("#inputCity").notify("City Not Found");
}

const isLoading = () => {
    inputButton.textContent = "Loading";
    inputButton.style.cursor = "wait";
}

const isDone = () => {
    inputButton.style.cursor = "pointer";
    inputButton.textContent = "Done";
    setTimeout(()=> {
        inputButton.textContent = "Search";
    },1500)
}
