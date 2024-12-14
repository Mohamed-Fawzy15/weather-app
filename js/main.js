// variable
const rowData = document.querySelector("#rowData");
const findInput = document.querySelector("#find");
const findBtn = document.querySelector("#findBtn");

findInput.addEventListener("input", function () {
  getData(findInput.value);
});

findBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getData(findInput.value);
});

window.addEventListener("load", function () {
  getData("cairo");
});

// fetch method from the weather api of the current day
async function getData(city) {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=729fca7793db43feb7b82241240812&q=${city}&days=3`
    );
    const data = await res.json();

    // Get current day details
    const currentDateDetails = getDate(data.location.localtime);

    // Get the next day details
    const nextDayDate = new Date(data.location.localtime);
    nextDayDate.setDate(nextDayDate.getDate() + 1); // Add 1 day
    const nextDayDetails = getDate(nextDayDate.toISOString());

    // get the third day details
    const thirdDayDate = new Date(data.location.localtime);
    thirdDayDate.setDate(thirdDayDate.getDate() + 2); // Add 2 day
    const thirdDayDetails = getDate(thirdDayDate.toISOString());

    // getUserLocation(data);
    displayTodayData(data, currentDateDetails);
    displayNextWeather(data, nextDayDetails, 1);
    displayThirdDay(data, thirdDayDetails, 2);
  } catch (err) {
    console.error("Error fetching weather data:", err);
  }
}

// a function that return the day, month and dayName
function getDate(dateString) {
  const date = new Date(dateString);

  // Days of the week
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Months of the year
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //  get the day that the user open the site
  const dayName = days[date.getDay()];
  // get what day number in the month
  const day = date.getDate();
  // get what month the user open the site
  const month = months[date.getMonth()];

  return { dayName, day, month };
}

// function to display the weather data of the current day
function displayTodayData(data, time) {
  const weather = data.current; // Current weather details
  const location = data.location; // Location details

  rowData.innerHTML = "";

  const box = `
         <div class="today-weather col-12 col-lg-4">
              <header
                class="weather-header p-2 normal-header d-flex justify-content-between"
              >
                <p class="day m-0">${time.dayName}</p>
                <p class="date m-0">${time.day} ${time.month}</p>
              </header>
              <div id="weatherData" class="weather-content normal-bg">
                <div class="weather-inner d-flex flex-column">
                  <p class="city">${location.name}</p>
                  <span class="temp">${weather.temp_c}<sup>o</sup>C</span>
                  <img
                    src="https:${weather.condition.icon}"
                    class="weather-img w-25"
                    alt="${weather.condition.text}"
                  />
                  <p class="weather-statue">${weather.condition.text}</p>
                  <div class="weather-info d-flex gap-3">
                    <div class="d-flex gap-2">
                      <i class="fa-solid fa-umbrella"></i>
                      <p>${weather.precip_mm} mm</p>
                    </div>
                    <div class="d-flex gap-2">
                      <i class="fa-solid fa-wind"></i>
                      <p>${weather.wind_kph} km/h</p>
                    </div>
                    <div class="d-flex gap-2">
                      <i class="fa-solid fa-podcast"></i>
                      <p>${weather.wind_dir}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  `;
  rowData.innerHTML += box;
}

// function to display the second day weather
function displayNextWeather(data, time, index) {
  const nextDay = data.forecast.forecastday[index];
  const maxTemp = nextDay.day.maxtemp_c;
  const minTemp = nextDay.day.mintemp_c;
  const condition = nextDay.day.condition.text;
  const icon = nextDay.day.condition.icon;

  let box = `
        <div class="forcast col-12 col-lg-4">
          <header class="forcast-header p-2 dark-header d-flex justify-content-center">
            <p class="day m-0">${time.dayName}</p>
          </header>
          <div class="forcast-content dark-bg">
            <div class="forcast-inner d-flex flex-column text-center align-items-center">
              <img src="${icon}" " alt="" />
              <span>${maxTemp}<sup>o</sup>c</span>
              <p class="min-temp">${minTemp}<sup>o</sup></p>
              <p class="weather-statue">${condition}</p>
            </div>
          </div>
        </div>
  `;

  rowData.innerHTML += box;
}

// function to display the third day weather
function displayThirdDay(data, time, index) {
  const nextDay = data.forecast.forecastday[index];
  const maxTemp = nextDay.day.maxtemp_c;
  const minTemp = nextDay.day.mintemp_c;
  const condition = nextDay.day.condition.text;
  const icon = nextDay.day.condition.icon;

  let box = `
        <div class="forcast col-12 col-lg-4">
          <header class="forcast-header p-2 normal-header d-flex justify-content-center">
            <p class="day m-0">${time.dayName}</p>
          </header>
          <div class="forcast-content normal-bg">
            <div class="forcast-inner d-flex flex-column text-center align-items-center">
              <img src="${icon}" " alt="" />
              <span>${maxTemp}<sup>o</sup>c</span>
              <p class="min-temp">${minTemp}<sup>o</sup></p>
              <p class="weather-statue">${condition}</p>
            </div>
          </div>
        </div>
  `;

  rowData.innerHTML += box;
}
