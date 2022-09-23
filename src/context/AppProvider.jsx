import React, { useState } from 'react';
import propTypes from 'prop-types';
import appContext from './AppContext';
import planetsAPI from '../helpers/planetsAPI';

function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const requestingAPI = async () => {
    const data = await planetsAPI();
    const results = data.results.map((item) => {
      delete item.residents;
      return item;
    });
    setPlanets(results);
  };

  const globalState = {
    planets,
    requestingAPI,
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
