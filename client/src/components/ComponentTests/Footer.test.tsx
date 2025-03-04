import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import Footer from '../Footer';
import { MemoryRouter } from 'react-router-dom';


describe('Footer Component', () => {

    test('renders the footer', () => {
        render(
            <MemoryRouter>
            <Footer />
            </MemoryRouter>);
        const footerElement = screen.getByText(/VibeTribe/i);
        expect(footerElement).toBeInTheDocument();
    });

    test('footer has a about link', () => {
        render(        
            <MemoryRouter>
            <Footer />
            </MemoryRouter>);
        const link = screen.getByRole('link', { name: /About/i });
        expect(link).toBeInTheDocument();
    });

    test('footer has a contact link', () => {
        render(
        <MemoryRouter>
        <Footer />
        </MemoryRouter>
);
        const link = screen.getByRole('link', { name: /Contact/i });
        expect(link).toBeInTheDocument();
    });

});