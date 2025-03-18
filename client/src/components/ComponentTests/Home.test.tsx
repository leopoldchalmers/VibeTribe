import { render, screen} from '@testing-library/react';
import Home from '../Home';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import * as api from '../../api/api';

jest.mock('../../api/api');

describe('Home', () => {

  test('should have a Home title', () => {
    render(
    <MemoryRouter>
        <Home />
    </MemoryRouter>)

    const title = screen.getByRole('heading', { name: /Tribes/i });
    expect(title).toBeInTheDocument();
  });

  test('should have a Create Tribe button', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  
    const button = screen.getByRole('button', { name: /Create Tribe/i });
    expect(button).toBeInTheDocument();
  });


  test('displays a tribe on the home page', async () => {
    const fakeTribe = [
      {
        id: 1,
        title: 'Tribe One',
        description: 'A sample tribe description',
        owner: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    (api.getTribes as jest.Mock).mockResolvedValue(fakeTribe);
  
    render(
      <UserContext.Provider value={{ user: { username: 'user1' }, setUser: () => {} }}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </UserContext.Provider>
    );
  
    const tribeElement = await screen.findByText(/Tribe One/i);
    expect(tribeElement).toBeInTheDocument();

  });

});


