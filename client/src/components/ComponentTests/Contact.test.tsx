import { render, screen } from '@testing-library/react';
import { Contact } from '../Contact';

describe('Contact Component', () => {

  test('should render the Contact us title', () => {
    render(<Contact />);
        const title = screen.getByText(/Contact us/i);
    expect(title).toBeInTheDocument();
  });

});


