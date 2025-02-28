import { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
    display: flex;
    align-items: center;
    background-color: #333;
    padding: 10px 20px;
    border-radius: 50px;
    width: 100%;
    max-width: 600px;
`;

const Input = styled.input`
    background-color: #444;
    border: none;
    color: #fff;
    padding: 10px;
    border-radius: 30px;
    width: 100%;
    margin-right: 10px;
    font-size: 1rem;
    outline: none;

    &::placeholder {
        color: #aaa;
    }

    &:focus {
        background-color: #555;
    }
`;

const Button = styled.button`
    background-color: #1E90FF;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 30px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        background-color: #187bcd;
    }
`;

const SearchForm = ({ onSearch }: { onSearch: (city: string) => void }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city);
            setCity('');
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Digite a cidade"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <Button type="submit">Buscar</Button>
        </FormContainer>
    );
};

export default SearchForm;
