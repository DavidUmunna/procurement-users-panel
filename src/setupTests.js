// jest-dom adds custom jest matchers for asserting on DOM nodes
import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock process.env variables
process.env.REACT_APP_API_URL = 'https://mock-api.com';

// Suppress React warnings
const originalError = console.error;
console.error = (...args) => {
  if (args[0].includes('Warning:')) {
    return; // Ignore warnings
  }
  originalError(...args);
};

// Example: Add a global mock function
global.mockFunction = jest.fn();