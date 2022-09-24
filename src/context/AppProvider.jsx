import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import appContext from './AppContext';
// import planetsAPI from '../helpers/planetsAPI';

function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filteredPlanets, setFilteredPlanets] = useState(planets);
  const [columnInput, setColumnInput] = useState('population');
  const [comparisonInput, setComparisonInput] = useState('maior que');
  const [valueInput, setValueInput] = useState('0');
  const [filterByNumericValues, setFilterByNumericValues] = useState({});

  useEffect(() => {
    const newPlanets = planets
      .filter((item) => item.name.toLowerCase().includes(filterByName.name));
    setFilteredPlanets(newPlanets);
  }, [filterByName.name, planets]);

  useEffect(() => {
    const { column, comparison, value } = filterByNumericValues;
    const maiorQue = filteredPlanets
      .filter((item) => Number(item[column]) > Number(value));
    const menorQue = filteredPlanets
      .filter((item) => Number(item[column]) < Number(value));
    const igualA = filteredPlanets
      .filter((item) => Number(item[column]) === Number(value));

    switch (comparison) {
    case 'maior que':
      setFilteredPlanets(maiorQue);
      break;
    case 'menor que':
      setFilteredPlanets(menorQue);
      break;
    case 'igual a':
      setFilteredPlanets(igualA);
      break;

    default: return filteredPlanets;
    }
  }, [filterByNumericValues]);

  const globalState = {
    planets,
    setPlanets,
    filterByName,
    setFilterByName,
    filteredPlanets,
    columnInput,
    setColumnInput,
    comparisonInput,
    setComparisonInput,
    valueInput,
    setValueInput,
    filterByNumericValues,
    setFilterByNumericValues,
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
