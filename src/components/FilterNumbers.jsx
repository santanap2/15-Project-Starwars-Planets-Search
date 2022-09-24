import React, { useContext } from 'react';
import appContext from '../context/AppContext';

function FilterNumbers() {
  const {
    setFilterByNumericValues,
    columnInput,
    setColumnInput,
    comparisonInput,
    setComparisonInput,
    valueInput,
    setValueInput,
  } = useContext(appContext);

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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
    </div>
  );
}

export default FilterNumbers;
