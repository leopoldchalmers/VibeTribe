import { render } from '@testing-library/react';
import { fireEvent, screen } from '@testing-library/dom';
import CreateTribe from '../CreateTribe';
import { MemoryRouter } from 'react-router-dom';


describe('CreateTribe Component', () => {

    test('renders the heading Create tribe', () => {
        render(
            <MemoryRouter> 
            <CreateTribe />
            </MemoryRouter>);
        const headingElement = screen.getByRole('heading', {name:/Create tribe/i});
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

});