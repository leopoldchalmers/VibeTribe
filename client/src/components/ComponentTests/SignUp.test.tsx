import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { SignUp } from '../SignUp';
import { MemoryRouter } from 'react-router-dom';

describe('SignUp Component', () => {

    test('renders the heading Register new user', () => {
        render(
        <MemoryRouter>
            <SignUp />
        </MemoryRouter>

    );
        const headingElement = screen.getByText(/Register new user/i);
        expect(headingElement).toBeInTheDocument();
    });
    
    test('contains a signup button', () => {
        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
    
        );
        const button = screen.getByRole('button', { name: /Sign up/i });
        expect(button).toBeInTheDocument();
    }
    );

    test('has a navigation link to log in', () => {
        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
    
        );
        const link = screen.getByRole('link', { name: /Log in/i });
        expect(link).toBeInTheDocument();
    }
    );

});


    