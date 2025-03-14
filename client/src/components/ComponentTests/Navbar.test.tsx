import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import Navbar from '../Navbar';
import { MemoryRouter } from 'react-router-dom';

describe('Navbar Component', () => {

    test('navbar has a home link', () => {
        render(
            <MemoryRouter>
            <Navbar />
            </MemoryRouter>);
        const link = screen.getByRole('link', { name: /VibeTribe/i });
        expect(link).toBeInTheDocument();
    }
    )

    test('navbar has a account link', () => {
        render(
            <MemoryRouter>
            <Navbar />
            </MemoryRouter>);
        const button = screen.getByAltText(/Profile Icon/i);
        expect(button).toBeInTheDocument();
    }
    )
});