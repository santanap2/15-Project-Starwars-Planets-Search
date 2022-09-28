import React, { useContext, useState, useEffect } from 'react';
import appContext from '../context/AppContext';

function FilterNumbers() {
  const {
    columnInput,
    comparisonInput,
    filterByNumericValues,
    planets,
    valueInput,
    setColumnInput,
    setComparisonInput,
    setFilterByNumericValues,
    setFilteredPlanets,
    setValueInput,
  } = useContext(appContext);

  const array = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [selectInput, setSelectInput] = useState(array);

  const handleInput = ({ target }) => {
    switch (target.name) {
    case 'column':
      setColumnInput(target.value);
      break;

    case 'comparison':
      setComparisonInput(target.value);
      break;

    case 'value':
      setValueInput(target.value);
      break;

    default: return true;
    }
  };

  const onClickFilterButton = () => {
    setFilterByNumericValues((prevState) => ([...prevState, {
      column: columnInput, comparison: comparisonInput, value: valueInput,
    }]));
  };

  const resetAllFilters = () => {
    setFilterByNumericValues([]);
    setFilteredPlanets(planets);
  };

  const removeFilter = (filterColumn) => {
    const newFilters = filterByNumericValues
      .filter((item) => item.column !== filterColumn);
    setFilterByNumericValues(newFilters);
  };

  useEffect(() => {
    const usedFilters = [];
    filterByNumericValues.forEach((one) => usedFilters.push(one.column));
    const notUsedFilters = array.filter((item) => !usedFilters.includes(item));
    setSelectInput(notUsedFilters);
    setColumnInput(notUsedFilters[0]);
    setValueInput(0);
  }, [filterByNumericValues]);

  return (
    <div>
      <label htmlFor="column-filter">
        <span>Tipo: </span>
        <select
          name="column"
          id="column-filter"
          data-testid="column-filter"
          value={ columnInput }
          onChange={ handleInput }
        >

          {
            selectInput.map((item, index) => (
              <option value={ item } key={ index }>{item}</option>
            ))
          }

        </select>
      </label>

      <label htmlFor="comparison-filter">
        <span>Size: </span>
        <select
          name="comparison"
          id="comparison-filter"
          data-testid="comparison-filter"
          value={ comparisonInput }
          onChange={ handleInput }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <label htmlFor="value-filter">
        <input
          type="number"
          name="value"
          id="value-filter"
          data-testid="value-filter"
          value={ valueInput }
          onChange={ handleInput }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        onClick={ onClickFilterButton }
      >
        Filtrar
      </button>

      <br />

      {
        filterByNumericValues && (
          filterByNumericValues.map((item, index) => {
            const { column, comparison, value } = item;
            return (
              <div
                key={ index }
                data-testid="filter"
              >
                <span>{ `${column} ${comparison} ${value} ` }</span>
                <button
                  type="button"
                  onClick={ () => removeFilter(column) }
                  data-testid="filter"
                >
                  X
                </button>
              </div>
            );
          })
        )
      }

      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ resetAllFilters }
      >
        Reset Filters
      </button>
    </div>
  );
}

export default FilterNumbers;
