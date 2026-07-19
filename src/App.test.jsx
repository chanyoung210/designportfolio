import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App.jsx'

describe('App scaffold', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByTestId('app-placeholder')).toBeInTheDocument()
  })
})
