import { fireEvent, render, screen } from "@testing-library/react";
import { expect } from "vitest";
import { FeedPage } from "../../src/pages/Feed/FeedPage";
import { vi } from "vitest";

import { useNavigate } from "react-router-dom";


vi.mock("react-router-dom", () => {
    const navigateMock = vi.fn();
    const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
    return { useNavigate: useNavigateMock };
  });




describe("Logout", () => {
    beforeEach(() => {
        vi.resetAllMocks();
      });

    test("Logs user out", async () => {
      render(<FeedPage />);
      const navigateMock = useNavigate();
      const button = await screen.getByRole("button")
      fireEvent.click(button)
      expect(navigateMock).toHaveBeenCalledWith("/login");

    });
  });

