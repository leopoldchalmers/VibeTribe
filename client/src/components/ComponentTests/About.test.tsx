import { render, screen } from '@testing-library/react';
import { About } from '../About';

describe('About Component', () => {

  test('should render the About title', () => {
    render(<About />);
        const title = screen.getByText(/About VibeTribe/i);
    expect(title).toBeInTheDocument();
  });

});


