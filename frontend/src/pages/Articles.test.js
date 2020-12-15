import { render, screen } from '@testing-library/react';
import Articles from './Articles';

test('renders articles', () => {
  render(<Articles />);
  const linkElement = screen.getByText("article");
  expect(linkElement).toBeInTheDocument();
});
