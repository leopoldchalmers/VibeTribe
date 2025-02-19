import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import Footer from '../Footer';


describe('Footer Component', () => {

    test('renders the footer', () => {
        render(<Footer />);
        const footerElement = screen.getByText(/VibeTribe/i);
        expect(footerElement).toBeInTheDocument();
    });

    test('footer has a about link', () => {
        render(<Footer />);
        const link = screen.getByRole('link', { name: /About/i });
        expect(link).toBeInTheDocument();
    });

    test('footer has a contact link', () => {
        render(<Footer />);
        const link = screen.getByRole('link', { name: /Contact/i });
        expect(link).toBeInTheDocument();
    });

});