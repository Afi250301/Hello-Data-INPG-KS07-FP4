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
const weatherIcon = document.getElementById("weatherIcon");
const cityLabel = document.getElementById("cityLabel"); //label nama city yang terpilih
const inputCity = document.getElementById("inputCity");
const inputDate = document.getElementById("date");
const inputButton = document.getElementById("inputButton");
const btnText = document.querySelector("#btn-text");

let chosenCity;
let chosenDate;


// const spinIcon = document.querySelector("#spinner");


async function getData () {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e5ab1f03afmshd88df2d477f5c04p1b8fe5jsnf39836997ae2',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try{
        // isLoading();
        const resp = await fetch(`https://weatherapi-com.p.rapidapi.com/history.json?q=${chosenCity}&dt=${chosenDate}&lang=en`, options)
        const data = await resp.json();
        console.log(data); // REMOVE 
        console.log('feels like',data.forecast.forecastday[0].hour[5].feelslike_c);//REMOVE
        return displayStats(data), isDone();
    } catch (err) {
        console.log("failed to fetch : ", err); //REMOVE when submit
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
    cityLabel.firstChild.nodeValue = `${name}, ${country}`;

    console.log(icon.replace("/", '').replace("/", ''));
    weatherIcon.src = 'https://' + icon;
}

const onType = () => {
    inputCity.classList.remove('error');
    inputDate.classList.remove('error');
}

const onSubmit = () => {
    isLoading()

    chosenCity = inputCity.value;
    chosenDate = inputDate.value;
    console.log('city = ', chosenCity); //REMOVE
    console.log('date = ', chosenDate); //REMOVE

    chosenCity = chosenCity.replace(/\s/g, '%20')
    console.log('chosenCity =', chosenCity); //REMOVE
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
