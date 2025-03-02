import { useState } from 'react';
import SearchForm from './components/SearchForm';
import WeatherCard from './components/WeatherCard';
import { getWeather } from './services/api';
import { AirConditionsCard, ConditionsGrid, ConditionItem } from './StyledComponents';

function App() {
    const [forecast, setForecast] = useState<any[]>([]);
    const [airConditions, setAirConditions] = useState<any>(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [cityName, setCityName] = useState<string>(''); 

    async function handleSearch(city: string) {
        try {
            const formattedCity = city
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            const data = await getWeather(formattedCity);
            setForecast(data.forecast);
            setAirConditions(data.airConditions);
            setHasSearched(true);
            setCityName(formattedCity);
        } catch (error) {
            alert('Erro ao buscar clima. Verifique a cidade.');
        }
    }

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#121212',
            color: '#EAEAEA',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0',
            margin: '0',
            width: '100vw',
        }}>
            <div style={{
                width: '100%',
                padding: '20px 0',
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#1f1f1f',
                borderBottom: '1px solid #333',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1000,
            }}>
                <SearchForm onSearch={handleSearch} />
            </div>

            {!hasSearched && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginTop: '10px',
                }}>
                    <img 
                        src="https://cdn-icons-png.flaticon.com/512/1163/1163657.png" 
                        alt="Ícone de clima" 
                        style={{ width: '200px', height: '200px' }} 
                    />
                    <h1>Bem-vindo ao SkyCast! </h1>
                    <p>Digite o nome de uma cidade para ver a previsão do tempo!</p>
                </div>
            )}

            {hasSearched && forecast.length > 0 && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    padding: '100px 20px 20px',
                    boxSizing: 'border-box',
                    overflowY: 'auto',
                }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>{cityName}</h2>

                    <WeatherCard forecast={forecast} />

                    {airConditions && (
                        <AirConditionsCard>
                        <h2>Condições do Ar</h2>
                        <ConditionsGrid>
                            <ConditionItem>
                                <img src="https://cdn-icons-png.flaticon.com/512/869/869869.png" alt="Sensação térmica" />
                                <p><strong>Sensação Térmica:</strong> {airConditions.realFeel}°C</p>
                            </ConditionItem>
                    
                            <ConditionItem>
                                <img src="https://cdn-icons-png.flaticon.com/512/1146/1146869.png" alt="Vento" />
                                <p><strong>Vento:</strong> {airConditions.wind} km/h</p>
                            </ConditionItem>
                    
                            <ConditionItem>
                                <img src="https://cdn-icons-png.flaticon.com/512/414/414927.png" alt="Índice UV" />
                                <p><strong>Índice UV:</strong> {airConditions.uvIndex}</p>
                            </ConditionItem>
                    
                            <ConditionItem>
                                <img src="https://cdn-icons-png.flaticon.com/512/4005/4005901.png" alt="Qualidade do Ar" />
                                <p><strong>Qualidade do Ar:</strong> {['Boa', 'Moderada', 'Ruim', 'Muito Ruim', 'Perigosa'][airConditions.airQuality - 1]}</p>
                            </ConditionItem>
                        </ConditionsGrid>
                    </AirConditionsCard>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
