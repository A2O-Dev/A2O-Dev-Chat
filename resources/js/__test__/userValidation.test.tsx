import { render, screen, fireEvent } from "@testing-library/react";
import UserValidation from "../Components/UserValidation";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { User } from "@/interfaces/app";

describe("UserValidation Component", () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    email: "",
    setEmail: jest.fn(),
    handleSubmit: jest.fn(),
    openError: false,
    setOpenError: jest.fn(),
    errors: undefined,
    users: [],
  };
  const theme = createTheme();

  test("renders the modal with open state", () => {
    render(<UserValidation {...defaultProps} />);

    expect(screen.getByText("Direct Message")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Validate Email/i })
    ).toBeInTheDocument();
  });

  test("calls setEmail when input value changes", () => {
    render(<UserValidation {...defaultProps} />);

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    expect(defaultProps.setEmail).toHaveBeenCalledWith("test@example.com");
  });

  test("calls handleSubmit when the button is clicked", () => {
    render(<UserValidation {...defaultProps} />);

    const button = screen.getByRole("button", { name: /Validate Email/i });
    fireEvent.click(button);

    expect(defaultProps.handleSubmit).toHaveBeenCalled();
  });

  test("shows error alert when openError is true", () => {
    const props = {
      ...defaultProps,
      openError: true,
      errors: { email: "Invalid email address" },
    };

    render(<UserValidation {...props} />);

    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
  });

  test("calls setOpenError when the alert is closed", () => {
    const props = {
      ...defaultProps,
      openError: true,
      errors: { email: "Invalid email address" },
    };

    render(<UserValidation {...props} />);

    const alertCloseButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(alertCloseButton);

    expect(defaultProps.setOpenError).toHaveBeenCalledWith(false);
  });

  test("does not show error alert when openError is false", () => {
    render(<UserValidation {...defaultProps} />);

    expect(
      screen.queryByText("Invalid email address")
    ).not.toBeInTheDocument();
  });

  test("renders Create Room panel correctly", () => {
    const props = { ...defaultProps, open: true };
    render(
      <ThemeProvider theme={theme}>
        <UserValidation {...props} />
      </ThemeProvider>
    );

    const createRoomTab = screen.getByText("Create Room");
    fireEvent.click(createRoomTab);

    expect(screen.getByLabelText("Room Name")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Register/i })
    ).toBeInTheDocument();
  });

  test("calls handleSubmit with correct parameters in Create Room panel", () => {
    const props = {
      ...defaultProps,
      open: true,
      users: [{ id: 1, name: "John Doe" } as User],
    };
    render(
      <ThemeProvider theme={theme}>
        <UserValidation {...props} />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText("Create Room"));

    fireEvent.change(screen.getByLabelText("Room Name"), {
      target: { value: "New Room" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    expect(defaultProps.handleSubmit).toHaveBeenCalledWith(
      2,
      [],
      "New Room"
    );
  });
});
