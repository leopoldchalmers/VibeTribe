import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import Navbar from '../Navbar';

describe('Navbar Component', () => {

    test('renders the heading VibeTribe', () => {
        render(<Navbar />);
        const headingElement = screen.getByText(/VibeTribe/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('navbar has a home link', () => {
        render(<Navbar />);
        const link = screen.getByRole('link', { name: /Home/i });
        expect(link).toBeInTheDocument();
    });