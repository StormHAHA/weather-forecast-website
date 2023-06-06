const hashIcon = {
    "01d":"sunny",
    "02d":"partlyCloudy",
    "03d":"cloudy",
    "04d":"cloudy",
    "09d":"rain",
    "10d":"rain",
    "11d":"rainStorm",
    "13d":"blizzard",
    "50d":"fog",
    "01n":"clearNight",
    "02n":"partlyCloudyNight",
    "03n":"partlyCloudyNight",
    "04n":"partlyCloudyNight",
    "09n":"nightRain",
    "10n":"nightRain",
    "11n":"rainStorm",
    "13n":"blizzard",
    "50n":"fog"
};
const CloudElem = {
    "09d":"R",
    "10d":"R",
    "11n":"R",
    "09n":"R",
    "10n":"R",
    "11d":"R",
    "04d":"R"
}

const hashBG = {
    "01d":"linear-gradient(rgb(0, 146, 191),rgb(115, 218, 249))",
    "02d":"linear-gradient(rgb(0, 146, 191),rgb(115, 218, 249))",
    "03d":"linear-gradient(rgb(0, 146, 191),rgb(115, 218, 249))",
    "04d":"linear-gradient(180deg, #3A3A3A 0%, #B0B0B0 100%)",
    "09d":"linear-gradient(180deg, #3A3A3A 0%, #B0B0B0 100%)",
    "10d":"linear-gradient(180deg, #3A3A3A 0%, #B0B0B0 100%)",
    "11d":"linear-gradient(180deg, #3A3A3A 0%, #B0B0B0 100%)",
    "13d":"linear-gradient(rgb(0, 146, 191),rgb(115, 218, 249))",
    "50d":"linear-gradient(180deg, #3A3A3A 0%, #B0B0B0 100%)",
    "01n":"linear-gradient(180deg, #010009 0%, #050042 100%)",
    "02n":"linear-gradient(180deg, #010009 0%, #050042 100%)",
    "03n":"linear-gradient(180deg, #010009 0%, #050042 100%)",
    "04n":"linear-gradient(180deg, #010009 0%, #050042 100%)",
    "09n":"linear-gradient(180deg, #010009 0%, #050042 100%)",
    "10n":"linear-gradient(180deg, #010009 0%, #050042 100%)",
    "11n":"linear-gradient(180deg, #010009 0%, #050042 100%)",
    "13n":"linear-gradient(180deg, #010009 0%, #050042 100%)",
    "50n":"linear-gradient(180deg, #010009 0%, #050042 100%)",   
};

const form = document.getElementById("form");
form.addEventListener("submit", function(e){
    e.preventDefault();
}) 


async function checkWeather(){
    let text = document.querySelector('.text-input').value;
    let key = 'c3d9160a12b07bd49dbb0d97453dc8f3';
    let Api_url = 'https://api.openweathermap.org/data/2.5/weather?q=' + text + '&appid=' + key + '&lang=ru&units=metric';
    let Api_forecast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + text + '&appid=' + key + '&lang=ru&units=metric';
    const response = await fetch(Api_url);
    const ForecastResponce = await fetch(Api_forecast);
    var data = await response.json();
    var forecastData = await ForecastResponce.json();
    console.log(data);
    console.log(forecastData);
    var current_tempr = Math.round(data.main["temp"]);
    var current_humidity = data.main["humidity"];
    var current_pressure = data.main["pressure"];
    var temp_max = Math.round(data.main["temp_max"]);
    var temp_min = Math.round(data.main["temp_min"]);
    var weather_status = data.weather[0]["description"];
    weather_status = weather_status.charAt(0).toUpperCase() + weather_status.slice(1);
    var wind_speed = Math.round(data.wind["speed"]);
    var city_name = data.name;
    var icon_id = data.weather[0]["icon"];
    var visibitity = Math.floor(data.visibility / 100);
    document.querySelector('.degrees').innerHTML = current_tempr + "°";
    document.querySelector(".humidity").innerHTML = current_humidity + "%";
    document.querySelector(".status").innerHTML = weather_status;
    document.querySelector(".max_temp").innerHTML = temp_max;
    document.querySelector(".min_temp").innerHTML = temp_min;
    document.querySelector(".windspeed").innerHTML = wind_speed + " м/с";
    document.querySelector(".pressure").innerHTML = current_pressure + "Па";
    document.querySelector(".city").innerHTML = city_name;
    document.querySelector(".visibility").innerHTML = visibitity + "%";
    document.body.style.backgroundImage = hashBG[icon_id];
    document.getElementById("main-icon").src="./icons/" + hashIcon[icon_id] + ".svg";
    //cl = document.getElementsByClassName("cloud");
    // for(var i in CloudElem){
    //     if(i === icon_id){
    //     }
    // }
    //Определяю время заката / восхода 
    var unixTimeSunRise = data.sys["sunrise"];
    var unixTimeSunSet = data.sys["sunset"];
    var timezoneOffset = data.timezone;
    //Преобразую эти данные из юникс в привычный вид
    var dateSunRise = new Date(unixTimeSunRise*1000);
    var dateSunSet = new Date(unixTimeSunSet*1000);
    var timezoneOffset = new Date(timezoneOffset * 1000);
    var UtcDateSunRise = new Date(dateSunRise.getTime() + timezoneOffset.getTime());
    var UtcDateSunSet = new Date(dateSunSet.getTime() + timezoneOffset.getTime());
    var hoursSunrise = UtcDateSunRise.getUTCHours();
    var minutesSunrise = UtcDateSunRise.getUTCMinutes();
    var hoursSunSet = UtcDateSunSet.getUTCHours();
    var minutesSunSet = UtcDateSunSet.getMinutes();
    document.querySelector(".sunrise").innerHTML = hoursSunrise + "ч " + minutesSunrise + "мин";
    document.querySelector(".sunset").innerHTML = hoursSunSet + "ч " + minutesSunSet + "мин";
    var dailyTemp = document.getElementsByClassName("tempr");
    var dailyDate = document.getElementsByClassName("date");
    var api_data_pointer = 6;
    var elem_pointer = 0; //2
    for(var i=0; i<4; i++){
        for(var c=0; c<6; c++){
            dailyTemp[elem_pointer].innerHTML = Math.round(forecastData.list[api_data_pointer].main["temp"]) + "°";
            api_data_pointer ++; 
            elem_pointer ++; 
        }
        dailyDate[i].innerHTML = forecastData.list[api_data_pointer-1].dt_txt.slice(5, 10);
        api_data_pointer += 2;
    }
    document.getElementById("container").style.display = "block";
    document.getElementById("input-container").style.transform = "translateY(0%)"

}







