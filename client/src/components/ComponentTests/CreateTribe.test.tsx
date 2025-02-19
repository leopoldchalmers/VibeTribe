import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import CreateTribe from '../CreateTribe';

describe('CreateTribe Component', () => {

    test('renders the heading Create tribe', () => {
        render(<CreateTribe />);
        const headingElement = screen.getByText(/Create tribe/i);
        expect(headingElement).toBeInTheDocument();
    });
    test('CreateTribe has a go back button', () => {
        render(<CreateTribe />);
        const button = screen.getByRole('button', { name: /Go back/i });
        expect(button).toBeInTheDocument();
    }
    );
    test('CreateTribe has a form', () => {
        render(<CreateTribe />);
        const form = screen.getByRole('form');
        expect(form).toBeInTheDocument();
    }
    );

});