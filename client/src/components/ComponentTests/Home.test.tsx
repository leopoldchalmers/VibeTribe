import { render, screen } from '@testing-library/react';
import Home from '../Home';
import { MemoryRouter } from 'react-router-dom';

describe('Home', () => {


  test('should have a Home title', () => {
    render(
    <MemoryRouter>
        <Home />
    </MemoryRouter>)

    const title = screen.getByRole('heading', { name: /Tribes/i });
    expect(title).toBeInTheDocument();
  });


  test('should have a Create Tribe button', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  
    const button = screen.getByRole('button', { name: /Create Tribe/i });
    expect(button).toBeInTheDocument();
  });

});


