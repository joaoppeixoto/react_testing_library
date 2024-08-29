import { queryByText, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  test('Testa se página contem um texto <name> Details, onde <name> é o nome do Pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = 'More details';
    const pikachu = pokemonList[0];
    userEvent.click(queryByText(moreDetails));
    const details = screen.getByText(`${pikachu.name} Details`);
    expect(details).toBeInTheDocument();
  });
});
