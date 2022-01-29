import React from 'react';
import { render, screen } from '@testing-library/react';
import StockBoard from './StockBoard';
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// unit tests

/* test('should render label text', () => {
  render(<StockBoard />);
  const labelElement = screen.getByText(/Enter up to/i);
  expect(labelElement).toBeInTheDocument();
}); */

//a11y tests

test("should not have any accessibility violations", async () => {
  const { container } = render(<StockBoard />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
})
