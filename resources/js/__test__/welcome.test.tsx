import { render, screen } from '@testing-library/react'
import HelloWorld from '../Pages/HelloWorld'

test('renders Hello, world! text', () => {
  render(<HelloWorld />)
  const linkElement = screen.getByText(/hello, world!/i)
  expect(linkElement).toBeInTheDocument()
})
