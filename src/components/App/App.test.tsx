import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// unit tests

test('should render header text', () => {
  render(<App />);
  const headerElement = screen.getByText(/Stock Comparison/i);
  expect(headerElement).toBeInTheDocument();
});

//a11y tests

test("should not have any accessibility violations", async () => {
  const { container } = render(<App />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
})
