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
    await waitFor(() => {
      const columnInput = screen.getByTestId('column-filter');
      userEvent.selectOptions(columnInput, 'rotation_period');

      const comparisonInput = screen.getByTestId('comparison-filter');
      userEvent.selectOptions(comparisonInput, 'menor que');

      const valueInput = screen.getByTestId('value-filter');
      userEvent.clear(valueInput);
      userEvent.type(valueInput, '20');

      const button = screen.getByTestId('button-filter');
      userEvent.click(button);      

      let columns = screen.queryAllByRole('row');
      expect(columns).toHaveLength(3);
    })
  });
});
