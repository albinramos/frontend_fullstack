import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import citiesData from '../assets/cities500.json'

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

  const renderSuggestion = (suggestion) => 
  <div>
    <div>{suggestion.name}</div>
    <div>Country: {suggestion.country}</div>
  </div>;

  const onChange = (_, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionSelected = (_, { suggestion }) => {
    //console.log('Selected City:', suggestion.name);
    //console.log('Selected Country:', suggestion.country);
    onSelectCity(suggestion.name, suggestion.country);
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