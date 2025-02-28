import styled from 'styled-components';

export const AirConditionsCard = styled.div`
    background-color: #1f1f1f;
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
    text-align: center;
    width: 90%;
    max-width: 600px;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-8px);
    }

    h2 {
        margin-bottom: 15px;
        font-size: 22px;
        color: #EAEAEA;
    }
`;

export const ConditionsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
`;

export const ConditionItem = styled.div`
    background-color: #2a2a2a;
    padding: 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: flex-start;

    img {
        width: 32px;
        height: 32px;
    }

    p {
        margin: 0;
        font-size: 16px;
        color: #EAEAEA;
        text-align: left;

        strong {
            color: #f0c674;
        }
    }
`;
