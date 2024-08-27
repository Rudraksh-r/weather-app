const openWeatherApiKey = ('b17cf60bc918f97799256071df5f9c54') // API key for OpenWeatherMap
function getWeatherInfo() {
 // Function to get weather information based on the user's input (city name)
    const textBox = document.getElementById('text-box').value;
    let geoData, weatherData;
     // Fetch geographical coordinates (latitude and longitude) based on the city name
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${textBox}&limit=${1}&appid=${openWeatherApiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            geoData = data[0];  // Store the geographical data
             // Fetch current weather data using the retrieved geographical coordinates
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoData.lat}&lon=${geoData.lon}&appid=${openWeatherApiKey}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(async data => {
                    console.log(data);
                    weatherData = data; // Store the weather data
                     // Update the HTML elements with the fetched weather data
                    document.getElementById('weather-info').innerText = Math.round(weatherData.main.temp - 273.15);
                    document.getElementById('weather-feel-info').innerText = Math.round(weatherData.main.feels_like - 273.15);
                    document.getElementById('temp-desc').innerText = weatherData.weather[0].description;
                    document.getElementById('min-temp-info').innerText = Math.round(weatherData.main.temp_min - 273.15);
                    document.getElementById('max-temp-info').innerText = Math.round(weatherData.main.temp_max - 273.15);
                    document.getElementById('humidity-info').innerText = weatherData.main.humidity + ' %';
                    document.getElementById('pressure-info').innerText = weatherData.main.pressure + ' hPa';
                    document.getElementById('visibility-info').innerText = Math.round(weatherData.visibility / 1000) + ' Km';
                    document.getElementById('wind-speed-info').innerText = (weatherData.wind.speed) + ' mi/h';
                    document.getElementById('sunset-info').innerText = new Date(weatherData.sys.sunset * 1000).getHours() + ':' + new Date(weatherData.sys.sunset * 1000).getMinutes();
                    document.getElementById('sunrise-info').innerText = new Date(weatherData.sys.sunrise * 1000).getHours() + ':' + new Date(weatherData.sys.sunrise * 1000).getMinutes();

                     // Fetch current time based on geographical coordinates and city name
                    const url = `https://world-time-by-api-ninjas.p.rapidapi.com/v1/worldtime?lat=${geoData.lat}&lon=${geoData.lon}&city=${textBox}`;
                    const options = {
                        method: 'GET',
                        headers: {
                            'x-rapidapi-key': 'd2cd117050mshfacebf16375cb43p1ad339jsn5800f2d55236',
                            'x-rapidapi-host': 'world-time-by-api-ninjas.p.rapidapi.com'
                        }
                    };

                    let timeData
                    try {
                        const response = await fetch(url, options);
                        const result = await response.text();
                        console.log(result); timeData = JSON.parse(result);

                    } catch (error) {
                        console.error(error);
                    }

                     // Determine the background image based on weather conditions and time of day
                    let bgImage = '';
                    if (weatherData.weather[0].main == 'Clouds') {
                        if (timeData.hour >= 19 || timeData.hour <= 5) bgImage = 'cloudy-night-sky.jpg';
                        else bgImage = 'cloudy.webp';
                    }


                    else if (weatherData.weather[0].main == 'Clear') {
                        if (timeData.hour >= 19 || timeData.hour <= 5) bgImage = 'night-sky.jpg';
                        else bgImage = 'sunny.jpg';
                    }

                   else if (weatherData.weather[0].main == 'Rain') {
                        if (timeData.hour >= 19 || timeData.hour <= 5) bgImage = 'rainy-night-.jpg';
                        else bgImage = 'rainy.jpg';
                    }

                   else if (weatherData.weather[0].main == 'Mist') {
                        if (timeData.hour >= 19 || timeData.hour <= 5) bgImage = 'mist-night.jpg';
                        else bgImage = 'mist.jpg';
                    }

                   else if (weatherData.weather[0].main == 'Haze') {
                        if (timeData.hour >= 19 || timeData.hour <= 5) bgImage = 'haze-night.jpg';
                        else bgImage = 'haze.jpg';
                    }

                   else if (weatherData.weather[0].main == 'Thunderstorm') {
                        if (timeData.hour >= 19 || timeData.hour <= 5) bgImage = 'thunder-night.jpg';
                        else bgImage = 'thunder.jpg';
                    }

                   else if (weatherData.weather[0].main == 'Thunderstorm') {
                        if (timeData.hour >= 19 || timeData.hour <= 5) bgImage = 'thunder-night.jpg';
                        else bgImage = 'thunder.jpg';
                    }
                  else  bgImage = 'mist.jpg' 
 // Update the date-time and background image in the HTML
                    document.getElementById('date-time').innerText = timeData.day_of_week;
                    document.getElementById('bg').style.backgroundImage = `url(assets/${bgImage})`;


                })
                .catch(error => {
                    console.error('Error:', error);
                });

             // Fetch air quality information
                let airInfo

            fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${geoData.lat}&lon=${geoData.lon}&appid=${openWeatherApiKey}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                }).then(data => {
                    airInfo = data;
                    console.log(airInfo);

                     // Update the air quality card's color and text based on AQI value
                    let airQualityBarBgColor = '';
                    if(airInfo.list[0].main.aqi == '1'){
                       document.getElementById('air-info-card').style.backgroundColor = '#27d93c';
                       document.getElementById('air-info-card').innerText = 'Good';
                    }
                    
                    if(airInfo.list[0].main.aqi == '2'){
                        document.getElementById('air-info-card').style.backgroundColor = '#c9f030';
                        document.getElementById('air-info-card').innerText = 'Fair';
                     }
                     
                    if(airInfo.list[0].main.aqi == '3'){
                        document.getElementById('air-info-card').style.backgroundColor = '#ebe838';
                        document.getElementById('air-info-card').innerText = 'Moderate';
                     }
                     
                    if(airInfo.list[0].main.aqi == '4'){
                        document.getElementById('air-info-card').style.backgroundColor = '#f5971d';
                        document.getElementById('air-info-card').innerText = 'Poor';
                     }
                     
                    if(airInfo.list[0].main.aqi == '5'){
                        document.getElementById('air-info-card').style.backgroundColor = '#de3b12';
                        document.getElementById('air-info-card').innerText = 'Very Poor';
                     }
                    // document.getElementById('air-info-card').innerText = airInfo.list[0].main.aqi;
 
                })
            //     let hourlyInfo

            // fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${geoData.lat}&lon=${geoData.lon}&appid=${openWeatherApiKey}`).then(response => {
            //         if (!response.ok) {
            //             throw new Error('Network response was not ok');
            //         }
            //         return response.json();
            //     }).then(data => {
            //         hourlyInfo = data;
            //         console.log(hourlyInfo);

            //         for (let i = 0; i < hourlyInfo.list.length; i++) {
            //             let divElem = document.createElement('div')
            //             divElem.classList.add('humidity-card');

            //             let pElem = document.createElement('p')
            //             pElem.classList.add('humidity-title');
            //             pElem.innerText = hourlyInfo.list[i].dt_txt.substring(11, 16);
            //             divElem.appendChild(pElem);

            //             let spanElem = document.createElement('span');
            //             spanElem.classList.add('humidity-info');
            //             spanElem.innerText = Math.round(hourlyInfo.list[i].main.temp - 273.15) + '°C';
            //             divElem.appendChild(spanElem);
            
            //             const parent = document.getElementById('hourly-info-card');
            //             parent.appendChild(divElem);
                        
            //         }
            //     })
        })
        .catch(error => {
            console.error('Error:', error);
        });


}
