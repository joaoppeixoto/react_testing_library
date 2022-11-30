import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testa se é renderizado um card', () => {
  const pikachu = pokemonList[0];
  test('Testa as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const namePokemon = screen.getByTestId('pokemon-type');
    const typePokemon = screen.getByTestId('pokemon-type');
    const weightPokemon = screen.getByText('Average weight: 6.0 kg');
    const imagePokemon = screen.getByAltText('Pikachu sprite');
    const linkPokemon = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';


    expect(namePokemon).toBeInTheDocument();
    expect(typePokemon.textContent).toBe('Electric');
    expect(weightPokemon).toBeInTheDocument();
    expect(imagePokemon.src).toBe(linkPokemon);
  });
  test('Testa se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
  });
  test('Testa se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App { ...pokemonList } />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe('/pokemon/25');
  });
  test('Teste também se a URL exibida no navegador muda', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe(`/pokemon/${pikachu.id}`);
  });
  test('Testa se a imagem de favorito possui o alt e src corretos', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const favIcon = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favIcon);
    const img = screen.getAllByRole('img')[1];
    expect(img.src).toBe('http://localhost/star-icon.svg');
    expect(img.alt).toBe('Pikachu is marked as favorite');
  });
});
