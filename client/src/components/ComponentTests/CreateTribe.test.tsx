import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import CreateTribe from '../CreateTribe';
import { MemoryRouter } from 'react-router-dom';

describe('CreateTribe Component', () => {

    test('renders the heading Create tribe', () => {
        render(
        <MemoryRouter> 
        <CreateTribe />
        </MemoryRouter>);
        const headingElement = screen.getByText(/Create tribe/i);
        expect(headingElement).toBeInTheDocument();
    });
    test('CreateTribe has a go back button', () => {
        render(
            <MemoryRouter> 
            <CreateTribe />
            </MemoryRouter>);
        const button = screen.getByRole('button', { name: /Go back/i });
        expect(button).toBeInTheDocument();
    }
    );
    test('CreateTribe has a form', () => {
        render(
            <MemoryRouter> 
            <CreateTribe />
            </MemoryRouter>);
        const form = screen.getByRole('form');
        expect(form).toBeInTheDocument();
    }
    );

});