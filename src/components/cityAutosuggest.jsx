import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import citiesData from '../assets/cities500.json' // Ajusta la ruta según tu estructura de archivos

const CityAutosuggest = ({ onSelectCity }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onSuggestionsFetchRequested = ({ value }) => {
    const inputValueLowerCase = value.trim().toLowerCase();
    const filteredSuggestions = citiesData.filter(city =>
      city.name.toLowerCase().includes(inputValueLowerCase)
    );
    setSuggestions(filteredSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  const onChange = (_, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionSelected = (_, { suggestion }) => {
    onSelectCity(suggestion.name);
  };

  const inputProps = {
    placeholder: 'Type a city name',
    value,
    onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      onSuggestionSelected={onSuggestionSelected}
    />
  );
};

export default CityAutosuggest;