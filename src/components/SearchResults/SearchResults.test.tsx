import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// unit tests
/*
test('should render label text', () => {
  render(<SearchBar />);
  const labelElement = screen.getByText(/Enter up to/i);
  expect(labelElement).toBeInTheDocument();
});
*/
//a11y tests

test("should not have any accessibility violations", async () => {
  const mockResults = ['PLTR; Palantir', 'GE; General Electric'];
  const mockClearCallback = jest.fn();
  const { container } = render(
    <SearchResults results={ mockResults } clearCallback={ mockClearCallback }/>)
  ;
  const results = await axe(container);
  expect(results).toHaveNoViolations();
})
