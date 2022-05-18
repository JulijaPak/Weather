async function weather() {


    let link = '';
    
    navigator.geolocation.getCurrentPosition(showPosition);

    async function showPosition(position) {
        //posit.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
        linkTemp = "https://api.open-meteo.com/v1/forecast?latitude=" + position.coords.latitude + "&longitude=" + position.coords.longitude + "&current_weather=true";
        linkLoc = "https://nominatim.openstreetmap.org/reverse?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&format=json";

        const response = await fetch(linkTemp);
        const data = await response.json();

        const response2 = await fetch(linkLoc);
        const location = await response2.json();
        console.log(location);

        let temp = document.getElementById('temp');
        temp.innerHTML = data.current_weather.temperature + '&#8451';

        let code = document.getElementById('weatherCode');
        let icon = document.getElementById('weatherIcon');

        switch(data.current_weather.weathercode) {
            case 0:
                code.innerHTML = "Clear sky";
                icon.innerHTML = '<i class="fa-regular fa-sun"></i>';
            case 1:
            case 2:
            case 3:
                code.innerHTML = "Mainly clear, partly cloudy";
                icon.innerHTML = '<i class="fa-solid fa-cloud-sun"></i>';
                break;
            case 45:
            case 48: 
                code.innerHTML = "Fog";
                icon.innerHTML = '<i class="fa-solid fa-smog"></i>'
                break;
            case 51:
            case 53:
            case 55:
            case 56:
            case 57:
                code.innerHTML = "Drizzle";
                icon.innerHTML = '<i class="fa-solid fa-cloud-rain"></i>';
                break;
            case 61:
            case 63:
            case 65:
            case 66:
            case 67:
                code.innerHTML = "Rain";
                icon.innerHTML = '<i class="fa-solid fa-cloud-showers-heavy"></i>';
                break;
            case 71:
            case 73:
            case 75:
            case 77:
                code.innerHTML = "Snow";
                icon.innerHTML = '<i class="fa-solid fa-snowflake"></i>';
                break;
            case 80:
            case 81:
            case 82:
                code.innerHTML = "Rain showers";
                icon.innerHTML = '<i class="fa-solid fa-cloud-showers-heavy"></i>';
                break;
            case 85:
            case 86:
                code.innerHTML = "Snow showers";
                icon.innerHTML = '<i class="fa-solid fa-snowflake"></i>';
                break;
            case 95:
            case 96:
            case 99:
                code.innerHTML = "Thunderstorm";
                icon.innerHTML = '<i class="fa-solid fa-cloud-bolt"></i>';
                break;
        }

        const fullDate = new Date();
        const time = fullDate.getHours();

        const back = document.getElementById('weatherWindow');
        
        if (time > 5 && time < 12) {
            back.className = 'morning';
        } else if (time > 12 && time < 18) {
            back.className = 'day';
        } else {
            back.className = 'night'
        }
    }

}



