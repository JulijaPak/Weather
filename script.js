async function weather() {


    
    navigator.geolocation.getCurrentPosition(showPosition);

    async function showPosition(position) {
        const linkTemp = `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&current_weather=true`;
        const linkLoc = `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`;

        const response = await fetch(linkTemp);
        const weatherData = await response.json();

        const response2 = await fetch(linkLoc, {
            headers: {
                "Accept-Language": "en-US"
            }
        });
        const location = await response2.json();

        const locationText = document.getElementById('loc');
        locationText.innerHTML = `${location.address.city}, ${location.address.country}` ;

        const temp = document.getElementById('temp');
        temp.innerHTML = weatherData.current_weather.temperature + '&#8451';

        const text = document.getElementById('weatherText');
        const icon = document.getElementById('weatherIcon');

        switch(weatherData.current_weather.weathercode) {
            case 0:
                text.innerHTML = "Clear sky";
                icon.innerHTML = '<i class="fa-regular fa-sun"></i>';
            case 1:
            case 2:
            case 3:
                text.innerHTML = "Mainly clear, partly cloudy";
                icon.innerHTML = '<i class="fa-solid fa-cloud-sun"></i>';
                break;
            case 45:
            case 48: 
                text.innerHTML = "Fog";
                icon.innerHTML = '<i class="fa-solid fa-smog"></i>'
                break;
            case 51:
            case 53:
            case 55:
            case 56:
            case 57:
                text.innerHTML = "Drizzle";
                icon.innerHTML = '<i class="fa-solid fa-cloud-rain"></i>';
                break;
            case 61:
            case 63:
            case 65:
            case 66:
            case 67:
                text.innerHTML = "Rain";
                icon.innerHTML = '<i class="fa-solid fa-cloud-showers-heavy"></i>';
                break;
            case 71:
            case 73:
            case 75:
            case 77:
                text.innerHTML = "Snow";
                icon.innerHTML = '<i class="fa-solid fa-snowflake"></i>';
                break;
            case 80:
            case 81:
            case 82:
                text.innerHTML = "Rain showers";
                icon.innerHTML = '<i class="fa-solid fa-cloud-showers-heavy"></i>';
                break;
            case 85:
            case 86:
                text.innerHTML = "Snow showers";
                icon.innerHTML = '<i class="fa-solid fa-snowflake"></i>';
                break;
            case 95:
            case 96:
            case 99:
                text.innerHTML = "Thunderstorm";
                icon.innerHTML = '<i class="fa-solid fa-cloud-bolt"></i>';
                break;
        }

        const fullDate = new Date();
        const time = fullDate.getHours();

        const bg = document.getElementById('weatherWindow');
        
        if (time > 5 && time <= 12) {
            bg.className = 'morning';
        } else if (time > 12 && time < 18) {
            bg.className = 'day';
        } else {
            bg.className = 'night'
        }
    }

}



