import { render, fireEvent, act } from '@testing-library/react';
import { screen } from '@testing-library/dom';

import axios from 'axios'
import { Account } from '../Account';
import { MemoryRouter } from 'react-router-dom';
jest.mock("axios")

const mockedAxios = axios as jest.Mocked<typeof axios>

describe('A login screen', () => {
  test('when Log In is clicked, sends the username and password to the server', async () => {
    render(
      <MemoryRouter>
        <Account />
      </MemoryRouter>
  );

    const userNameField = screen.findByLabelText("Username");
    const passwordField = screen.findByLabelText("Password");
    const loginButton = screen.getByRole('button', {name: "Log In"});

    await act(async () => {
      fireEvent.change(await userNameField, {target: {value: "Hilda"}});
      fireEvent.change(await passwordField, {target: {value: "12345"}});
      fireEvent.click(await loginButton);
    });

    expect(mockedAxios.post).toHaveBeenCalledWith("http://localhost:8080/users/login",
      {username : "Hilda", password: "12345"}
    );
  })
});



