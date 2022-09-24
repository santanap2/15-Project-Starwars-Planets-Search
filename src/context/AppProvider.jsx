import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import appContext from './AppContext';

function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filteredPlanets, setFilteredPlanets] = useState(planets);
  const [columnInput, setColumnInput] = useState('population');
  const [comparisonInput, setComparisonInput] = useState('maior que');
  const [valueInput, setValueInput] = useState('0');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    const newPlanets = planets
      .filter((item) => item.name.toLowerCase().includes(filterByName.name));
    setFilteredPlanets(newPlanets);
  }, [filterByName.name, planets]);

  useEffect(() => {
    if (filterByNumericValues.length > 0) {
      const {
        column, comparison, value,
      } = filterByNumericValues[filterByNumericValues.length - 1];
      const test = filteredPlanets.filter((item) => {
        switch (comparison) {
        case 'maior que':
          return Number(item[column]) > Number(value);
        case 'menor que':
          return Number(item[column]) < Number(value);
        case 'igual a':
          return Number(item[column]) === Number(value);

        default: return filteredPlanets;
        }
      });
      setFilteredPlanets(test);
    }
  }, [filterByNumericValues]);

  const globalState = {
    columnInput,
    comparisonInput,
    filterByName,
    filterByNumericValues,
    filteredPlanets,
    planets,
    valueInput,
    setColumnInput,
    setComparisonInput,
    setFilterByName,
    setFilterByNumericValues,
    setPlanets,
    setValueInput,
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
