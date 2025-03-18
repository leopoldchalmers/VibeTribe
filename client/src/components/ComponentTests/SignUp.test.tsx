import { render, act} from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import { SignUp } from '../SignUp';
import { MemoryRouter } from 'react-router-dom';

jest.mock("axios");


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
    
    test("shows an error for short password", async () => {
        render(
          <MemoryRouter>
            <SignUp />
          </MemoryRouter>
        );
    
        const passwordField = screen.getByLabelText(/Password/i);
        fireEvent.change(passwordField, { target: { value: "123" } });
    
        const signUpButton = screen.getByRole("button", { name: /Sign up/i });
    
        await act(async () => {
          fireEvent.click(signUpButton);
        });
    
        expect(
          screen.getByText("Password must be at least 5 characters long")
        ).toBeInTheDocument();
});

});