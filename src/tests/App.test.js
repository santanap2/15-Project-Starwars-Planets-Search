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

  it('Testa o botão de remover um filtro individual', async () => {
    render(<App />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const button = screen.getByTestId('button-filter');
    userEvent.click(button);

    const removeFilterBtn = screen.getByRole('button', { name: 'X'});
    userEvent.click(removeFilterBtn);
  })

  it('Testa se o botão de remover todos os filtros é renderizado', async () => {
    render(<App />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const button = screen.getByTestId('button-remove-filters');
    userEvent.click(button);
  })

  it('Testa a tabela é renderizada corretamente ao excluir filtros individualmente', async () => {
    render(<App />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const columnInput = screen.getByTestId('column-filter');
    const comparisonInput = screen.getByTestId('comparison-filter');
    const valueInput = screen.getByTestId('value-filter');
    const button = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnInput, 'diameter');
    userEvent.type(valueInput, '8900');
    userEvent.click(button);

    userEvent.selectOptions(columnInput, 'population');
    userEvent.selectOptions(comparisonInput, 'menor que');
    userEvent.type(valueInput, '1000000');
    userEvent.click(button);

    userEvent.selectOptions(columnInput, 'orbital_period');
    userEvent.selectOptions(comparisonInput, 'igual a');
    userEvent.type(valueInput, '304')
    userEvent.click(button);

    const planetRows = screen.queryAllByRole('row');
    expect(planetRows).toHaveLength(2);

    const removeFilterBtn = screen.getAllByRole('button', { name: 'X'});
    userEvent.click(removeFilterBtn[1]);

    const secondPlanetRows = screen.getAllByRole('row');
    expect(secondPlanetRows).toHaveLength(2);
  })
});
