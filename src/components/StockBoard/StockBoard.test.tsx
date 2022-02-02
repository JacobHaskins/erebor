import React from 'react';
import { render } from '@testing-library/react';
import StockBoard from './StockBoard';
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

//a11y tests

test("should not have any accessibility violations", async () => {
  const { container } = render(<StockBoard />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
})
