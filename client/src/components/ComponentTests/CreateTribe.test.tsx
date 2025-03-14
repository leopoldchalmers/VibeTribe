import { render } from '@testing-library/react';
import { fireEvent, screen } from '@testing-library/dom';
import CreateTribe from '../CreateTribe';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '../../UserContext';

describe('CreateTribe Component', () => {

    test('renders the heading Create tribe', () => {
        render(
            <MemoryRouter> 
            <CreateTribe />
            </MemoryRouter>);
        const headingElement = screen.getByRole('heading', {name:/Create tribe/i});
        expect(headingElement).toBeInTheDocument();
    });
    
    
    test('CreateTribe has navigation link to home', () => {
        render(
            <MemoryRouter>
                <CreateTribe />
            </MemoryRouter>
    
        );
        const link = screen.getByRole('link', { name: /Go back/i });
        expect(link).toBeInTheDocument();
    }
    );
    test('renders input fields for title and description', () => {
        render(
            <MemoryRouter>
                <CreateTribe />
            </MemoryRouter>
        );
        const titleInput = screen.getByPlaceholderText(/name/i);
        const descriptionInput = screen.getByPlaceholderText(/description/i);

        expect(titleInput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();
    });

    test('updates state when typing in inputs', () => {
        render(
            <MemoryRouter>
                <CreateTribe />
            </MemoryRouter>
        );

        const titleInput = screen.getByPlaceholderText(/name/i);
        const descriptionInput = screen.getByPlaceholderText(/description/i);

        fireEvent.change(titleInput, { target: { value: 'Test Tribe' } });
        fireEvent.change(descriptionInput, { target: { value: 'This is a test tribe' } });

        expect(titleInput).toHaveValue('Test Tribe');
        expect(descriptionInput).toHaveValue('This is a test tribe');
    });

});

describe('CreateTribe Component - User Input Handling', () => {
    test('updates title and description state on user input', () => {
        render(
            <MemoryRouter>
                <UserContext.Provider value={{ user: { username: 'testUser' }, setUser: jest.fn() }}>
                    <CreateTribe />
                </UserContext.Provider>
            </MemoryRouter>
        );

        const titleInput = screen.getByPlaceholderText(/name/i);
        const descriptionInput = screen.getByPlaceholderText(/description/i);

        fireEvent.change(titleInput, { target: { value: 'New Tribe Name' } });
        fireEvent.change(descriptionInput, { target: { value: 'A description of the tribe' } });

        expect(titleInput).toHaveValue('New Tribe Name');
        expect(descriptionInput).toHaveValue('A description of the tribe');
    });
});