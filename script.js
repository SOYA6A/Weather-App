function getWeather() { // declare a foncton to get the weather 
    const apiKey = '25cfde122883d2e136934b3a02c5ca89'; // clé API (application programming interface) pour accéder aux données météo
    const city = document.getElementById('city').value; // récupère la valeur saisie dans le champ texte pour la ville

    if (!city) { //vérifie si le champ de saisie est vide 
        alert('Please enter a city'); //affiche une alerte si aucune ville n'est saisie 
        return; // quitte la fonction si aucune ville n'est saisie
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; // URL pour obtenir les données météo actuelles
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;// URL popur obtenir les prévisions météo

    fetch(currentWeatherUrl) // effectue une requête pour obtenir les données météo actuelles
        .then(response => response.json()) // convertit la réponse en JSON (JavaScript Object Notation)paires clé-valeur 
        .then(data => { //traite les données reçues
            displayWeather(data);// appelle la fonction pour afficher les données météo
        })
        .catch(error => { // gère les erreurs lors de la requête 
            console.error('Error fetching current weather data:', error); // affiche l'erreur dans lma console
            alert('Error fetching current weather data. Please try again.');// affiche une alerte en cas d'erreur
        });

    fetch(forecastUrl) //effectue une requête pour obtenir les prévisions météo
        .then(response => response.json()) // convertit la réponse en JSON (javaScript objet notation)
        .then(data => { // traite les données reçues
            displayHourlyForecast(data.list);// appelle la fonction pour afficher les previsions horaires
        })
        .catch(error => { // gère les erreurs lors de la requête 
            console.error('Error fetching hourly forecast data:', error); // affiche l'erreur dans la console
            alert('Error fetching hourly forecast data. Please try again.'); // affiche une alerte en cas d'erreurs
        });
}

function displayWeather(data) { // déclare une fonction pour afficher les données météo 
   const tempDivInfo = document.getElementById('temp-div'); // récupère l'élément pour afficher la température 
    const weatherInfoDiv = document.getElementById('weather-info'); // récupère l'élément pour afficher les information météo
    const weatherIcon = document.getElementById('weather-icon'); // récupère l'élément pour afficher l'icon météo
    const hourlyForecastDiv = document.getElementById('hourly-forecast'); // récupère l'élément pour afficher les prévisions horaires 

    // efface le contenu précédent
    weatherInfoDiv.innerHTML = ''; // vide l'élément d'information météo
    hourlyForecastDiv.innerHTML = ''; // vide l'élément de prévisions horaires
    tempDivInfo.innerHTML = ''; // vide l'élément de température 

    if (data.cod === '404') { // vérifie si la réponse contient une erreur 404 (ville non trouvée)
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`; // affiche le message d'erreur
    } else { // si la ville est trouvé le code normal s'execute 
        const cityName = data.name; // récupère le nom de la ville
        const temperature = Math.round(data.main.temp - 273.15); // convertit la température de kelvin a celsius
        const description = data.weather[0].description; // récupère la déscription de la météo
        const iconCode = data.weather[0].icon;// récupère le code de l'icône météo
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`; // crée l'URL de l'icône météo

        const temperatureHTML = `
            <p>${temperature}°C</p>  
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p> 
        `;

        tempDivInfo.innerHTML = temperatureHTML; // insère le HTML de la température dans l'élément 
        weatherInfoDiv.innerHTML = weatherHtml; // insère le HTML contenant le nom de la ville et la description dans l'élément d'information météo
        weatherIcon.src = iconUrl; // définit la source de l'image de l'icône météo à l'URL de l'icône correspondante
        weatherIcon.alt = description; // définit le texte alternatif de l'image à la description de la météo

        showImage(); //appelle la fonction pour afficher l'icône météo
    }
}

function displayHourlyForecast(hourlyData) { // déclare une fonction pour afficher les prévisions horaires
    const hourlyForecastDiv = document.getElementById('hourly-forecast'); // récupère l'élément pour afficher les pévisions horaires

    const next24Hours = hourlyData.slice(0, 8); // récupère les données des 8 prochaines heures (24 heures / 3 heures par prévision )

    next24Hours.forEach(item => { //parcourt chaque élément des prévisions horaires
        const dateTime = new Date(item.dt * 1000); // convertit le timestamp en objet date 
        const hour = dateTime.getHours(); // récupère l'heure a partir de l'objet date 
        const temperature = Math.round(item.main.temp - 273.15); // convertit la température de Kelvin à Celsius
        const iconCode = item.weather[0].icon; // récupère le code de l'icône météo 
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`; // Crée l'URL de l'icône météo

        const hourlyItemHtml = ` 
            <div class="hourly-item">
                <span>${hour}:00</span>  
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() { // déclare une fonction pour afficher l'icône météo
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // change le style de l'icône pour qu'elle soit visible
}