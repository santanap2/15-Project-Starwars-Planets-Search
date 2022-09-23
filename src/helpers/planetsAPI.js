const URL = 'https://swapi.dev/api/planets';

const planetsAPI = async () => {
  try {
    const data = await fetch(URL);
    const planets = await data.json();
    return planets;
  } catch (error) {
    return error;
  }
};

export default planetsAPI;
