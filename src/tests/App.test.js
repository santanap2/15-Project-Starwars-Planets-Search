import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockAPI from './mock/mockAPI';

describe('Testa a aplicação Starwars Planet Search', () => {
  afterEach(() => {
    global.fetch.mockClear();
  });

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockAPI),
  });
  });

  it('Testa se os elementos de filtro são renderizados', () => {
    render(<App />)
    const nameInput = screen.getByTestId('name-filter');
    userEvent.type(nameInput, 'teste');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueInput = screen.getByTestId('value-filter'); 
    
    expect(nameInput).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
  })

  it('Testa se a API é chamada', async () => {
    render(<App />)
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  })

  it('Testa se os filtros funcionam corretamente', async () => {
    render(<App />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const columnInput = screen.getByTestId('column-filter');
    const comparisonInput = screen.getByTestId('comparison-filter');
    const valueInput = screen.getByTestId('value-filter');
    const button = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnInput, 'rotation_period');
    userEvent.selectOptions(comparisonInput, 'menor que');
    userEvent.type(valueInput, '20');
    userEvent.click(button);

    const planetRows = screen.queryAllByRole('row');
    expect(planetRows).toHaveLength(3);

    userEvent.selectOptions(columnInput, 'orbital_period');
    userEvent.selectOptions(comparisonInput, 'maior que');
    userEvent.type(valueInput, '1000');
    userEvent.click(button);

    const secondPlanetRows = screen.queryAllByRole('row');
    expect(secondPlanetRows).toHaveLength(2);

    userEvent.selectOptions(columnInput, 'surface_water');
    userEvent.selectOptions(comparisonInput, 'igual a');
    userEvent.type(valueInput, '0');
    userEvent.click(button);

    const thirdPlanetRows = screen.queryAllByRole('row');
    expect(thirdPlanetRows).toHaveLength(2);

  });
});
