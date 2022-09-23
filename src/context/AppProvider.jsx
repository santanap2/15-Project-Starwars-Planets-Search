import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import appContext from './AppContext';
// import planetsAPI from '../helpers/planetsAPI';

function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filteredPlanets, setFilteredPlanets] = useState(planets);

  // const filteredPlanets = filterByName.name.length > 0
  //   ? planets.filter((item) => item.name.toLowerCase().includes(filterByName.name))
  //   : planets;

  useEffect(() => {
    const newPlanets = planets
      .filter((item) => item.name.toLowerCase().includes(filterByName.name));
    setFilteredPlanets(newPlanets);
  }, [filterByName.name, planets]);

  const globalState = {
    planets,
    setPlanets,
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
