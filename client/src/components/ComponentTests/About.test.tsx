import { render, screen } from '@testing-library/react';
import { About } from '../About';
import { MemoryRouter } from 'react-router-dom';

describe('About Component', () => {

  test('should render the About title', () => {
    render(
      <MemoryRouter>
          <About />
      </MemoryRouter>
    );
        const title = screen.getByText(/About VibeTribe/i);
    expect(title).toBeInTheDocument();
  });

});


