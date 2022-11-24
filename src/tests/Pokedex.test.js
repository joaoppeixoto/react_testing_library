import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import App from '../App';

describe('Testa se botões de filtragem por tipo possuem o nome correto', () => {
  test('Testa se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const h2Element = screen.getByRole('heading', { level: 2, name: /encountered pokémon/i });
    expect(h2Element).toBeInTheDocument();
  });
  test('Testa se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado:', () => {
    renderWithRouter(<App { ...pokemonList } />);
    const nextPokemon = screen.getByTestId('pokemon-name');
    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(buttonNext);
    expect(nextPokemon.innerHTML).toBe('Charmander');
    userEvent.click(buttonNext);
  });
  test('Testa se existe um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
    renderWithRouter(<App />);
    const AllButtons = screen.getAllByTestId('pokemon-type-button');
    const pokemonTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    AllButtons.forEach((types, index) => expect(types.innerHTML)
      .toBe(pokemonTypes[index]));
  });
  test('Testa se o texto do botão deve corresponder ao nome do tipo', () => {
    renderWithRouter(<App { ...pokemonList } />);
    pokemonList.forEach(({ type }) => expect(screen.getByRole('button', { name: type })).toBeInTheDocument());
  });
  test('Testa se o botão All  está sempre visível', () => {
    renderWithRouter(<App />);
    const buttonAllPokemons = screen.getByRole('button', { name: /all/i });
    expect(buttonAllPokemons).toBeDefined();
  });
  test('Testa se  é possível clicar no botão de filtragem All', () => {
    renderWithRouter(<App />);
    const buttonAllPokemons = screen.getByRole('button', { name: /all/i });
    userEvent.click(buttonAllPokemons);
    expect(buttonAllPokemons).toBeInTheDocument();
  });
});
