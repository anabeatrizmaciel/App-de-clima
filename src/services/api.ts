import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
});

const API_KEY = '95c30929db5a605735e20a1760841e31';

export async function getWeather(city: string) {
    try {
        const geoResponse = await api.get('/weather', {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
                lang: 'pt',
            },
        });

        const { coord } = geoResponse.data;

        const forecastResponse = await api.get('/forecast', {
            params: {
                lat: coord.lat,
                lon: coord.lon,
                appid: API_KEY,
                units: 'metric',
                lang: 'pt',
            },
        });

        const airResponse = await api.get('/air_pollution', {
            params: {
                lat: coord.lat,
                lon: coord.lon,
                appid: API_KEY,
            },
        });

        const forecast = forecastResponse.data.list;
        const dailyForecast = [];

        for (let i = 0; i < forecast.length; i += 8) {
            const day = forecast[i];
            const date = new Date(day.dt * 1000);
            const formattedDate = date.toLocaleDateString('pt-BR');

            dailyForecast.push({
                date: formattedDate,
                temperature: day.main.temp,
                description: day.weather[0].description,
                humidity: day.main.humidity,
                icon: `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`,
            });
        }

        const airData = airResponse.data.list[0];
        const airQualityIndex = airData.main.aqi; 

        return {
            forecast: dailyForecast,
            airConditions: {
                realFeel: geoResponse.data.main.feels_like,
                wind: geoResponse.data.wind.speed,
                uvIndex: airData.components.pm10, 
                airQuality: airQualityIndex,
            },
        };
    } catch (error) {
        console.error('Erro ao buscar clima:', error);
        throw new Error('Erro ao buscar dados de clima.');
    }
}

export default api;
