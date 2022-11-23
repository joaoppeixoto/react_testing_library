import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Testa o componente <NotFound.js />', () => {
  test('Testa se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const h2ElementTest = screen.getByRole('heading', { name: /page requested not found/i });
    expect(h2ElementTest).toBeInTheDocument();
  });
  test('Testa se a página mostra a imagem do pikachu', () => {
    renderWithRouter(<NotFound />);
    const pikachuTristola = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i });
    expect(pikachuTristola).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
