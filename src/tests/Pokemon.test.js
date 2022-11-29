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
    const { averageWeight: { value, measurementUnit } } = pikachu;

    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const img = screen.getByAltText(`${pikachu.name} sprite`).src;

    expect(name.innerHTML).toBe(pikachu.name);
    expect(type.innerHTML).toBe(pikachu.type);
    expect(weight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(img).toBe(pikachu.image);
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
  // test('Testa se a imagem de favorito possui o alt e src corretos', () => {
  //   renderWithRouter(<App pokemonList={ pikachu } />);
  //   const faviconAlt = screen.getByRole('img', { name: `${pikachu.name}/pikachu is marked as favorite/i` });
  //   expect(faviconAlt).toContain('/star-icon.svg');
  // });
});
