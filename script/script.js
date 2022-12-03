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

async function getData() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fb05d6454dmshcb938662e457cadp113e7djsnec78cbf5fb08',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try{
        isLoading()
        const resp = await fetch(`https://weatherapi-com.p.rapidapi.com/history.json?q=${chosenCity}&dt=${chosenDate}&lang=en`, options)
        const data = await resp.json();
        console.log(data)
        return displayStats(data), isDone();
    } catch (err) {
        console.log(err)
        failNotice();
        isDone();
    }
}

const displayStats = (data) => {
    let currentHour = moment().format("h");
    let currentTime = moment().format("dddd, h:mm a")
    let lastUpdate = moment().format("h.00 a")
    let {humidity, temp_c, feelslike_c, gust_kph:wind, pressure_mb:pressure, chance_of_rain:rain} = data.forecast.forecastday[0].hour[currentHour];
    let {text:condition, icon} = data.forecast.forecastday[0].hour[currentHour].condition;
    let {country, name} = data.location;
    let tempHour = []
    let humidHour = []
    let windHour = []
    let pressureHour = []
    for (let i = 0; i < data.forecast.forecastday[0].hour.length; i++) {
        tempHour.push(data.forecast.forecastday[0].hour[i].temp_c)
        humidHour.push(data.forecast.forecastday[0].hour[i].humidity)
        windHour.push(data.forecast.forecastday[0].hour[i].wind_kph)
        pressureHour.push(data.forecast.forecastday[0].hour[i].pressure_mb)
    }
    

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
    
    $("canvas#tempGraph").remove();
    $("div#tempDiv").append('<canvas id="tempGraph"></canvas>');
    $("canvas#tempGraph2").remove();
    $("div#tempDiv2").append('<canvas class="ms-5" id="tempGraph2"></canvas>');
    $("canvas#humidGraph").remove();
    $("div#humidDiv").append('<canvas id="humidGraph"></canvas>');
    $("canvas#windGraph").remove();
    $("div#windDiv").append('<canvas id="windGraph"></canvas>');
    $("canvas#pressureGraph").remove();
    $("div#pressureDiv").append('<canvas id="pressureGraph"></canvas>');
    const tempGraph = document.getElementById('tempGraph');
    const tempGraph2 = document.getElementById('tempGraph2');
    const humidGraph = document.getElementById('humidGraph');
    const windGraph = document.getElementById('windGraph');
    const pressureGraph = document.getElementById('pressureGraph');

    new Chart(tempGraph, {
      type: 'line',
      data: {
        labels: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'],
        datasets: [{
          label: 'Temperature in Celcius',
          data: tempHour,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart(tempGraph2, {
      type: 'line',
      data: {
        labels: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'],
        datasets: [{
          label: 'Temperature in Celcius',
          data: tempHour,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 12
                    }
                }
            }
        }
      }
    });

    new Chart(humidGraph, {
      type: 'line',
      data: {
        labels: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'],
        datasets: [{
          label: 'Humidity',
          data: humidHour,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart(windGraph, {
      type: 'line',
      data: {
        labels: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'],
        datasets: [{
          label: 'Wind in KpH',
          data: windHour,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart(pressureGraph, {
      type: 'line',
      data: {
        labels: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'],
        datasets: [{
          label: 'Pressure in milibar',
          data: pressureHour,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

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