import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { TribeInfo } from "../TribeInfo";
import * as api from "../../api";

jest.mock("../../api");

describe("TribeInfo Component", () => {
  const mockTribe = {
    id: 1,
    title: "Test Tribe",
    description: "This is a test tribe",
    owner: "testUser",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const mockPosts = [
    {
      id: 1,
      title: "Test Post 1",
      description: "This is the first test post",
      author: "testUser",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 10,
      tribeId: 1,
      songLink: "http://example.com/song1",
    },
    {
      id: 2,
      title: "Test Post 2",
      description: "This is the second test post",
      author: "testUser",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 5,
      tribeId: 1,
      songLink: "http://example.com/song2",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (api.getTribeById as jest.Mock).mockResolvedValue(mockTribe);
    (api.getPostsByTribeId as jest.Mock).mockResolvedValue(mockPosts);
  });

  test("renders tribe details correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/tribe/1"]}>
        <Routes>
          <Route path="/tribe/:id" element={<TribeInfo />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(mockTribe.title)).toBeInTheDocument();
      expect(screen.getByText(mockTribe.description)).toBeInTheDocument();
      expect(screen.getByText(`Owner: ${mockTribe.owner}`)).toBeInTheDocument();
    });
  });

  test("renders posts correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/tribe/1"]}>
        <Routes>
          <Route path="/tribe/:id" element={<TribeInfo />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockPosts[0].title)).toBeInTheDocument();
      expect(screen.getByText(mockPosts[1].title)).toBeInTheDocument();
    });
  });

 
  
});