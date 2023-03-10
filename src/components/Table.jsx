import React, { useContext, useEffect } from 'react';
import appContext from '../context/AppContext';
import planetsAPI from '../helpers/planetsAPI';

function Table() {
  const {
    filteredPlanets,
    setPlanets,
  } = useContext(appContext);

  useEffect(() => {
    const requestingAPI = async () => {
      const data = await planetsAPI();
      const results = data.results.map((item) => {
        delete item.residents;
        return item;
      });
      setPlanets(results);
    };
    requestingAPI();
  }, [setPlanets]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>

        <tbody>
          {
            filteredPlanets.map((item) => {
              const {
                name,
                rotation_period: rotationPeriod,
                orbital_period: orbitalPeriod,
                diameter,
                climate,
                gravity,
                terrain,
                surface_water: surfaceWater,
                population,
                films,
                created,
                edited,
                url,
              } = item;
              return (
                <tr key={ item.name } data-testid="planet-row">
                  <td>{ name }</td>
                  <td>{ rotationPeriod }</td>
                  <td>{ orbitalPeriod }</td>
                  <td>{ diameter }</td>
                  <td>{ climate }</td>
                  <td>{ gravity }</td>
                  <td>{ terrain }</td>
                  <td>{ surfaceWater }</td>
                  <td>{ population }</td>
                  <td>{ films }</td>
                  <td>{ created }</td>
                  <td>{ edited }</td>
                  <td>{ url }</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
