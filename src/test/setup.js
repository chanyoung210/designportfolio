import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

if (!window.matchMedia) {
  window.matchMedia = vi.fn()
}
vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
  matches: false,
  media: query,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}))

vi.mock('gsap', () => {
  const chainable = {
    to: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    kill: vi.fn(),
  }
  return {
    gsap: {
      registerPlugin: vi.fn(),
      set: vi.fn(),
      to: vi.fn((_target, vars) => {
        vars?.onComplete?.()
        return { kill: vi.fn(), scrollTrigger: { kill: vi.fn() } }
      }),
      timeline: vi.fn((vars) => {
        vars?.onComplete?.()
        return chainable
      }),
    },
  }
})

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { create: vi.fn(), kill: vi.fn(), getAll: vi.fn(() => []) },
}))

vi.mock('gsap/SplitText', () => ({
  SplitText: vi.fn().mockImplementation(() => ({ chars: [], revert: vi.fn() })),
}))
