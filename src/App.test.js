import { render, screen, fireEvent, } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import axios from 'axios';

// Mock Axios for API calls
jest.mock('axios');

describe('App Component Tests', () => {
  // Test 1: Check if the main heading renders
  test('renders the main heading', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const headingElement = screen.getByRole('heading', { name: /welcome/i }); // Replace "welcome" with your actual heading text
    expect(headingElement).toBeInTheDocument();
  });

  // Test 2: Check if a button click updates the text
  test('button click updates the text', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const buttonElement = screen.getByRole('button', { name: /click me/i }); // Replace "click me" with your button text
    fireEvent.click(buttonElement);
    const updatedText = screen.getByText(/updated text/i); // Replace "updated text" with the expected text
    expect(updatedText).toBeInTheDocument();
  });

  // Test 3: Mock an API call and check if data is displayed
  test('fetches and displays data', async () => {
    axios.get.mockResolvedValue({ data: { message: 'Hello, World!' } });

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const dataElement = await screen.findByText(/hello, world!/i);
    expect(dataElement).toBeInTheDocument();
  });

  // Test 4: Check if the loading spinner is displayed
  test('shows loading spinner while fetching data', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const loadingElement = screen.getByText(/loading/i); // Replace "loading" with your actual loading text
    expect(loadingElement).toBeInTheDocument();
  });

  // Test 5: Test navigation between pages
  test('renders the home page by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const homeElement = screen.getByText(/home page/i); // Replace "home page" with your actual text
    expect(homeElement).toBeInTheDocument();
  });

  // Test 6: Test form input and submission
  test('updates input value on change and submits the form', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const inputElement = screen.getByPlaceholderText(/enter your name/i); // Replace with your input's placeholder
    const submitButton = screen.getByRole('button', { name: /submit/i }); // Replace with your button text

    fireEvent.change(inputElement, { target: { value: 'John Doe' } });
    expect(inputElement.value).toBe('John Doe');

    fireEvent.click(submitButton);
    const successMessage = screen.getByText(/form submitted successfully/i); // Replace with your success message
    expect(successMessage).toBeInTheDocument();
  });

  // Test 7: Test error message for invalid input
  test('shows error message for invalid input', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const inputElement = screen.getByPlaceholderText(/enter your email/i); // Replace with your input's placeholder
    const submitButton = screen.getByRole('button', { name: /submit/i }); // Replace with your button text

    fireEvent.change(inputElement, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText(/invalid email address/i); // Replace with your error message
    expect(errorMessage).toBeInTheDocument();
  });
});