import React from 'react';
import { render, screen } from '@testing-library/react';
import CashFlowChart from './CashFlowChart';
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// unit tests
/*
test('should render the gray hint text', () => {
  render(<DailyPrices symbol='' />);
  const hintElement = screen.getByText(/Pick an additional/i);
  expect(hintElement).toBeInTheDocument();
});
*/
//a11y tests

test("should not have any accessibility violations", async () => {
  const { container } = render(<CashFlowChart symbol='' currency='USD' />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
})
