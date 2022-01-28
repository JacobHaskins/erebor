import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("should not have any accessibility violations", async () => {
  const { container } = render(<App />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
})