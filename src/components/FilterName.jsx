import React, { useContext } from 'react';
import appContext from '../context/AppContext';

function FilterName() {
  const { filterByName, setFilterByName } = useContext(appContext);
  const { name } = filterByName;

  const handleInput = ({ target }) => {
    setFilterByName((prevState) => ({ ...prevState, name: target.value }));
  };

  return (
    <div>
      <label htmlFor="name">
        <span>Name: </span>
        <input
          type="text"
          id="name"
          name="nameInput"
          data-testid="name-filter"
          onChange={ handleInput }
          value={ name }
        />
      </label>
    </div>
  );
}

export default FilterName;
