import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';

describe('Testa o componente <FavoritePokemon.js />', () => {
  test('Testa se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);
    const notFoundElement = screen.getByText(/no favorite pokémon found/i);
    expect(notFoundElement).toBeInTheDocument();
  });
});
