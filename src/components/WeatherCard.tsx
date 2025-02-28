import styled from 'styled-components';

const ForecastContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    padding: 20px;
    margin-top: 30px;
    width: 100%;
    max-width: 1200px;
`;

const ForecastCard = styled.div`
    background: linear-gradient(145deg, #2a2a2a, #1f1f1f);
    border-radius: 12px;
    padding: 18px;
    text-align: center;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 180px;
    transition: transform 0.3s ease;
    color: #EAEAEA;
    border: 1px solid #333;

    &:hover {
        transform: translateY(-8px);
    }
`;

const Date = styled.p`
    font-size: 0.875rem;
    font-weight: bold;
    color: #EAEAEA;
    margin-bottom: 8px;
    opacity: 0.8;
`;

const Temperature = styled.h3`
    font-size: 2.5rem;
    margin: 10px 0;
    color: #1E90FF;
    font-weight: bold;
`;

const Description = styled.p`
    font-size: 0.875rem;
    color: #ccc;
    margin: 4px 0;
`;

const Humidity = styled.p`
    font-size: 0.875rem;
    color: #aaa;
    margin: 4px 0;
`;

const Divider = styled.div`
    height: 1px;
    background-color: #444;
    margin: 8px 0;
    width: 100%;
`;

const Icon = styled.img`
    width: 60px;
    height: 60px;
    margin: 8px 0;
`;

const WeatherCard = ({ forecast }: { forecast: any[] }) => {
    return (
        <ForecastContainer>
            {forecast.map((day, index) => (
                <ForecastCard key={index}>
                    <Date>{day.date}</Date>
                    <Icon src={day.icon} alt={day.description} />
                    <Temperature>{day.temperature}°C</Temperature>
                    <Divider />
                    <Description>{day.description}</Description>
                    <Humidity>Umidade: {day.humidity}%</Humidity>
                </ForecastCard>
            ))}
        </ForecastContainer>
    );
};

export default WeatherCard;
