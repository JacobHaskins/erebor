import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// unit tests

test('should render label text', () => {
  render(<SearchBar />);
  const labelElement = screen.getByText(/Enter up to/i);
  expect(labelElement).toBeInTheDocument();
});

//a11y tests

test("should not have any accessibility violations", async () => {
  const { container } = render(<SearchBar />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
})
