import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach } from "vitest";
import LoginPage from "@/app/login/page";
import { api } from "@/lib/api/client";
import toast from "react-hot-toast";

const mockPush = vi.fn();
const postMock = api.post as ReturnType<typeof vi.fn>;

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock("@/lib/api/client", () => ({
  api: {
    post: vi.fn(),
  },
}));

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the login form correctly", () => {
    render(<LoginPage />);
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/user@example.com/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("shows validation error for invalid email", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    
    const emailInput = screen.getByPlaceholderText(/user@example.com/i);
    await user.type(emailInput, "invalid-email");
    
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it("toggles password visibility when the eye icon is clicked", async () => {
    render(<LoginPage />);
    const passwordInput = screen.getByPlaceholderText(/your password/i);
    const toggleButton = screen.getByRole("button", { name: "" }); 

    expect(passwordInput).toHaveAttribute("type", "password");
    
    await fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");
  });

  it("handles successful login", async () => {
    const user = userEvent.setup();
    postMock.mockResolvedValue({ data: { success: true } });

    render(<LoginPage />);

    await user.type(screen.getByPlaceholderText(/user@example.com/i), "test@example.com");
    await user.type(screen.getByPlaceholderText(/your password/i), "password123");

    const loginButton = screen.getByRole("button", { name: /login/i });
    await user.click(loginButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/api/login", {
        email: "test@example.com",
        password: "password123",
      });
      expect(toast.success).toHaveBeenCalledWith("Login successful");
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("shows error toast when API call fails", async () => {
    const user = userEvent.setup();
    postMock.mockRejectedValue({
      isAxiosError: true,
      response: { data: { error: "Invalid credentials" } },
    });

    render(<LoginPage />);

    await user.type(screen.getByPlaceholderText(/user@example.com/i), "wrong@test.com");
    await user.type(screen.getByPlaceholderText(/your password/i), "wrongpass");

    await user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
    });
  });
});