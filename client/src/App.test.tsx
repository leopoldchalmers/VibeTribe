import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import App from './App';
import { UserContext } from './UserContext';

describe('App Component', () => {

  test('renders Navbar and Footer on all routes', () => {
    render(
      <UserContext.Provider value={{ user: undefined, setUser: jest.fn() }}>
          <App />
      </UserContext.Provider>
    );
    expect(screen.getByRole('link', {name : /VibeTribe/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name : /About/i})).toBeInTheDocument(); 
  
  }
  );
  });