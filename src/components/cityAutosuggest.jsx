import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

const CityAutosuggest = ({ onSelectCity }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onSuggestionsFetchRequested = async ({ value }) => {
    const endpoint = `http://localhost:3666/landing/cities?value=${value}`;
    const response = await fetch(endpoint);
    const data =  await response.json();
    setSuggestions(data.cities);
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
    onSelectCity(suggestion);
  };

  const inputProps = {
    placeholder: 'Type a city name',
    value,
    onChange,
  };

  console.log(suggestions)

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