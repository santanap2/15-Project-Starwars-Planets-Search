import React, { useState } from 'react';
import propTypes from 'prop-types';
import appContext from './AppContext';
import planetsAPI from '../helpers/planetsAPI';

function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  // const [filteredPlanets, setFilteredPlanets] = useState([]);

  const requestingAPI = async () => {
    const data = await planetsAPI();
    const results = data.results.map((item) => {
      delete item.residents;
      return item;
    });
    setPlanets(results);
  };

  const filteredPlanets = filterByName.name.length > 0
    ? planets.filter((item) => item.name.toLowerCase().includes(filterByName.name))
    : [];

  // useEffect(() => {
  //   const newPlanets = planets
  //     .filter((item) => item.name.toLowerCase().includes(filterByName.name));
  //   setFilteredPlanets(newPlanets);
  // }, [filterByName.name]);

  const globalState = {
    requestingAPI,
    planets,
    filteredPlanets,
    filterByName,
    setFilterByName,
  };

  return (
    <appContext.Provider value={ globalState }>
      { children }
    </appContext.Provider>
  );
}

AppProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default AppProvider;
