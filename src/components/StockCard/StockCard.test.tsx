import React from 'react';
import { render, screen } from '@testing-library/react';
import StockCard from './StockCard';
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// unit tests

test('should render the gray hint text', () => {
  render(<StockCard title='Oakenshield Company'/>);
  const hintElement = screen.getByText(/Pick an additional/i);
  expect(hintElement).toBeInTheDocument();
});

//a11y tests

test("should not have any accessibility violations", async () => {
  const { container } = render(<StockCard title='Oakenshield Company' />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
})
