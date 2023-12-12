export const fetchCityData = async (selectedCity) => {
  try {
    const response = await fetch('/src/assets/cities500.json'); // Update the path accordingly
    const citiesData = await response.json();

    // Find the selected city in the array
    const selectedCityData = citiesData.find((city) => city.name === selectedCity);

    return selectedCityData || null;
  } catch (error) {
    return null;
  }
};

export default fetchCityData;
