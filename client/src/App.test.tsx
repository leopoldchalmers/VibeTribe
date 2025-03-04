
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import App from './App';
import { UserContext } from './UserContext';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


describe('App Component', () => {


  test('renders Navbar and Footer on all routes', () => {
    render(
      <UserContext.Provider value={{ user: undefined, setUser: jest.fn() }}>
          <App />
      </UserContext.Provider>
    );
    expect(screen.getByRole('link', {name : /VibeTribe/i})).toBeInTheDocument();
    expect(screen.getByRole('link', {name : /Help/i})).toBeInTheDocument(); 
  
  }
  );
  });

  /*
  test('renders the heading VibeTribe', () => {
    render(
    <App />
  );
    const headingElement = screen.getByText(/VibeTribe/i);
    expect(headingElement).toBeInTheDocument();
  });

  

  test('account has a login button', () => {
    render(<Account />);
    const button = screen.getByRole('button', { name: /Log in/i });
    expect(button).toBeInTheDocument();
  });

  */

