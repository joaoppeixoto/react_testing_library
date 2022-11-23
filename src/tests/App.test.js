import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  test('Testa se na a aplicação contém o conjunto de links esperado', () => {
    const { getByRole } = renderWithRouter(<App />);
    const linkHome = getByRole('link', { name: /home/i });
    const linkAbout = getByRole('link', { name: /about/i });
    const linkFavorites = getByRole('link', { name: /favorite pokémon/i });

    expect(linkAbout).toBeInTheDocument();
    expect(linkHome).toBeInTheDocument();
    expect(linkFavorites).toBeInTheDocument();
  });

  test('Testa se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });

    userEvent.click(linkHome);

    expect(history.location.pathname).toBe('/');
    expect(linkHome).toBeInTheDocument();
  });
  test('Testa se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });

    userEvent.click(linkAbout);

    expect(history.location.pathname).toBe('/about');

    expect(linkAbout).toBeInTheDocument();
  });
  test('Testa se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    renderWithRouter(<App />);
    const linkFavorites = screen.getByRole('link', { name: /favorite pokémon/i });

    userEvent.click(linkFavorites);

    expect(linkFavorites).toBeInTheDocument();
  });

  test('Testa se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/éhexa');
    });
    const notFoundText = screen.getByRole('heading', { name: /page requested not found/i });
    const pikachuCrying = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });

    expect(notFoundText).toBeInTheDocument();
    expect(pikachuCrying).toBeInTheDocument();
  });
});
