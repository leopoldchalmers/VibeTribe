import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { Account } from '../Account';
import { MemoryRouter } from 'react-router-dom';

describe('Account Component', () => {

    test('renders the heading Log in to VibeTribe', () => {
        render(
        <MemoryRouter>
            <Account />
        </MemoryRouter>

    );
        const headingElement = screen.getByText(/Log in to VibeTribe/i);
        expect(headingElement).toBeInTheDocument();
    });
    
    test('account has a login button', () => {
        render(
            <MemoryRouter>
                <Account />
            </MemoryRouter>
    
        );
        const button = screen.getByRole('button', { name: /Log in/i });
        expect(button).toBeInTheDocument();
    }
    );

    test('account has navigation link to signup', () => {
        render(
            <MemoryRouter>
                <Account />
            </MemoryRouter>
    
        );
        const link = screen.getByRole('link', { name: /Sign up/i });
        expect(link).toBeInTheDocument();
    }
    );

});


    