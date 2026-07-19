# Beat Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the "일상속의 비트" one-page portfolio: beat-pulse intro → fold transition → CX/BX/UX hero → project list/detail → about/footer, with GSAP-driven scroll interactions and CSS-only depth/glassmorphism.

**Architecture:** Vite + React SPA (plain JavaScript, no TypeScript, no router library). Each visual section is an isolated component with its own CSS module. Scroll-linked animation is delegated entirely to GSAP's `ScrollTrigger` (including `scrub`) rather than hand-rolled scroll-position math. Project deep-linking uses a small custom hook around `history.pushState`/`popstate` instead of a routing library, since there is exactly one route parameter (`?project=<id>`).

**Tech Stack:** React 18, Vite, GSAP (`ScrollTrigger`, `SplitText` — both bundled free in the `gsap` package), Vitest + @testing-library/react for tests, CSS Modules (built into Vite, no extra dependency), Vercel (connected to GitHub) for deployment.

## Global Constraints

- No TypeScript — plain `.jsx`/`.js` only (per spec: user reads HTML/CSS, not JS).
- No Three.js/WebGL anywhere — all "depth" and "shape" effects are CSS (`perspective`, `translateZ`, blur/scale) or SVG/DOM + GSAP.
- No routing library (`react-router` etc.) — single page, one query param.
- Every component that drives a GSAP animation must check `prefers-reduced-motion` via the shared `useReducedMotion` hook and skip the animation (but still render final-state content) when reduced.
- Contact email in the footer is a placeholder (`your-email@example.com`) — user replaces it with their real address before publishing.

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/index.css`
- Create: `src/App.jsx`
- Create: `src/App.test.jsx`
- Create: `src/test/setup.js`
- Create: `.gitignore`

**Interfaces:**
- Produces: working `npm run dev`, `npm run build`, `npm test` pipeline that every later task builds on.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "beat-portfolio",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "gsap": "^3.12.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.8",
    "@testing-library/react": "^16.0.0",
    "@vitejs/plugin-react": "^4.3.1",
    "jsdom": "^24.1.1",
    "vite": "^5.4.0",
    "vitest": "^2.0.5"
  }
}
```

- [ ] **Step 2: Create `.gitignore`**

```
node_modules
dist
.vercel
```

- [ ] **Step 3: Create `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
  },
})
```

- [ ] **Step 4: Create `index.html`**

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>일상속의 비트</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Create `src/index.css`**

```css
:root {
  --color-bg: #05070a;
  --color-fg: #f5f5f0;
  --color-accent: #6dffb8;
  --glass-blur: 16px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-fg);
  font-family: system-ui, sans-serif;
  overflow-x: hidden;
}

.glass {
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 6: Create `src/main.jsx`**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

- [ ] **Step 7: Create placeholder `src/App.jsx`** (replaced fully in Task 10)

```jsx
export default function App() {
  return <div data-testid="app-placeholder">beat portfolio scaffold</div>
}
```

- [ ] **Step 8: Create `src/test/setup.js`**

This mocks `gsap`/`ScrollTrigger`/`SplitText` globally so every component test renders synchronously without touching real animation/layout internals, and polyfills `matchMedia` (jsdom has neither).

```js
import '@testing-library/jest-dom'
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
```

- [ ] **Step 9: Create `src/App.test.jsx`**

```jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App.jsx'

describe('App scaffold', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByTestId('app-placeholder')).toBeInTheDocument()
  })
})
```

- [ ] **Step 10: Install dependencies**

Run: `npm install`
Expected: installs without error, creates `node_modules` and `package-lock.json`.

- [ ] **Step 11: Run tests to verify the pipeline works**

Run: `npm test`
Expected: 1 test file, 1 test, PASS.

- [ ] **Step 12: Verify production build works**

Run: `npm run build`
Expected: `dist/` folder created, no errors.

- [ ] **Step 13: Commit**

```bash
git add package.json vite.config.js index.html src .gitignore
git commit -m "chore: scaffold Vite + React + Vitest project"
```

---

### Task 2: `useReducedMotion` Hook

**Files:**
- Create: `src/hooks/useReducedMotion.js`
- Test: `src/hooks/useReducedMotion.test.js`

**Interfaces:**
- Produces: `useReducedMotion(): boolean` — used by every animated component from Task 4 onward.

- [ ] **Step 1: Write the failing test**

```js
// src/hooks/useReducedMotion.test.js
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { useReducedMotion } from './useReducedMotion.js'

function mockMatchMedia(matches) {
  const listeners = new Set()
  const mql = {
    matches,
    addEventListener: (_event, handler) => listeners.add(handler),
    removeEventListener: (_event, handler) => listeners.delete(handler),
  }
  vi.spyOn(window, 'matchMedia').mockReturnValue(mql)
  return {
    mql,
    fire(nextMatches) {
      mql.matches = nextMatches
      listeners.forEach((handler) => handler({ matches: nextMatches }))
    },
  }
}

describe('useReducedMotion', () => {
  afterEach(() => vi.restoreAllMocks())

  it('returns false when the user has no reduced-motion preference', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
  })

  it('returns true when the user prefers reduced motion', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(true)
  })

  it('updates when the media query changes after mount', () => {
    const { fire } = mockMatchMedia(false)
    const { result } = renderHook(() => useReducedMotion())
    expect(result.current).toBe(false)
    act(() => fire(true))
    expect(result.current).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/hooks/useReducedMotion.test.js`
Expected: FAIL — `Cannot find module './useReducedMotion.js'`

- [ ] **Step 3: Write the implementation**

```js
// src/hooks/useReducedMotion.js
import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia(QUERY).matches)

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const handler = (event) => setReduced(event.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return reduced
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/hooks/useReducedMotion.test.js`
Expected: 3 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useReducedMotion.js src/hooks/useReducedMotion.test.js
git commit -m "feat: add useReducedMotion hook"
```

---

### Task 3: `useProjectRoute` Hook

**Files:**
- Create: `src/hooks/useProjectRoute.js`
- Test: `src/hooks/useProjectRoute.test.js`

**Interfaces:**
- Produces: `useProjectRoute(): { projectId: string | null, openProject(id: string): void, closeProject(): void }` — consumed by `App.jsx` (Task 10) and passed down to `ProjectList`/`ProjectDetail`.

- [ ] **Step 1: Write the failing test**

```js
// src/hooks/useProjectRoute.test.js
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useProjectRoute } from './useProjectRoute.js'

describe('useProjectRoute', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
  })

  it('starts with no project when the URL has no ?project param', () => {
    const { result } = renderHook(() => useProjectRoute())
    expect(result.current.projectId).toBeNull()
  })

  it('reads the initial project id from the URL', () => {
    window.history.pushState({}, '', '/?project=beat-01')
    const { result } = renderHook(() => useProjectRoute())
    expect(result.current.projectId).toBe('beat-01')
  })

  it('openProject sets state and updates the URL', () => {
    const { result } = renderHook(() => useProjectRoute())
    act(() => result.current.openProject('beat-02'))
    expect(result.current.projectId).toBe('beat-02')
    expect(window.location.search).toBe('?project=beat-02')
  })

  it('closeProject clears state and removes the query param', () => {
    const { result } = renderHook(() => useProjectRoute())
    act(() => result.current.openProject('beat-02'))
    act(() => result.current.closeProject())
    expect(result.current.projectId).toBeNull()
    expect(window.location.search).toBe('')
  })

  it('responds to browser back/forward (popstate)', () => {
    const { result } = renderHook(() => useProjectRoute())
    act(() => result.current.openProject('beat-03'))
    act(() => {
      window.history.pushState({}, '', '/')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    expect(result.current.projectId).toBeNull()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/hooks/useProjectRoute.test.js`
Expected: FAIL — `Cannot find module './useProjectRoute.js'`

- [ ] **Step 3: Write the implementation**

```js
// src/hooks/useProjectRoute.js
import { useCallback, useEffect, useState } from 'react'

function readProjectId() {
  return new URLSearchParams(window.location.search).get('project')
}

export function useProjectRoute() {
  const [projectId, setProjectId] = useState(readProjectId)

  useEffect(() => {
    const onPopState = () => setProjectId(readProjectId())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const openProject = useCallback((id) => {
    const url = new URL(window.location.href)
    url.searchParams.set('project', id)
    window.history.pushState({ projectId: id }, '', url)
    setProjectId(id)
  }, [])

  const closeProject = useCallback(() => {
    const url = new URL(window.location.href)
    url.searchParams.delete('project')
    window.history.pushState({}, '', url)
    setProjectId(null)
  }, [])

  return { projectId, openProject, closeProject }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/hooks/useProjectRoute.test.js`
Expected: 5 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useProjectRoute.js src/hooks/useProjectRoute.test.js
git commit -m "feat: add useProjectRoute hook for deep-linkable project modal"
```

---

### Task 4: `KineticText` Component

**Files:**
- Create: `src/components/KineticText/KineticText.jsx`
- Create: `src/components/KineticText/KineticText.test.jsx`

**Interfaces:**
- Consumes: `useReducedMotion()` from Task 2.
- Produces: `<KineticText text={string} as={string} className={string} />` — consumed by `ProjectList` (Task 7) and reusable for any heading.

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/KineticText/KineticText.test.jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { KineticText } from './KineticText.jsx'

describe('KineticText', () => {
  it('renders the given text', () => {
    render(<KineticText text="일상속의 비트" as="h2" />)
    expect(screen.getByText('일상속의 비트')).toBeInTheDocument()
  })

  it('renders as the tag passed via `as`', () => {
    render(<KineticText text="Hello" as="h3" />)
    expect(screen.getByRole('heading', { level: 3, name: 'Hello' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/KineticText/KineticText.test.jsx`
Expected: FAIL — `Cannot find module './KineticText.jsx'`

- [ ] **Step 3: Write the implementation**

```jsx
// src/components/KineticText/KineticText.jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'

gsap.registerPlugin(ScrollTrigger, SplitText)

export function KineticText({ text, as: Tag = 'h2', className }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return

    const split = new SplitText(ref.current, { type: 'chars' })
    gsap.set(split.chars, { opacity: 0, y: 40 })

    const tween = gsap.to(split.chars, {
      opacity: 1,
      y: 0,
      stagger: 0.02,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      split.revert()
    }
  }, [reduced])

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/KineticText/KineticText.test.jsx`
Expected: 2 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/KineticText
git commit -m "feat: add KineticText scroll-reveal component"
```

---

### Task 5: `Intro` Component (beat pulse + fold transition)

**Files:**
- Create: `src/components/Intro/Intro.jsx`
- Create: `src/components/Intro/Intro.module.css`
- Create: `src/components/Intro/Intro.test.jsx`

**Interfaces:**
- Consumes: `useReducedMotion()` from Task 2.
- Produces: `<Intro onComplete={() => void} />` — consumed by `App.jsx` (Task 10). Calls `onComplete` exactly once, when the pulse+fold sequence finishes (or immediately if reduced motion is on).

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/Intro/Intro.test.jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Intro } from './Intro.jsx'

describe('Intro', () => {
  it('renders the pulse element', () => {
    render(<Intro onComplete={() => {}} />)
    expect(screen.getByTestId('pulse')).toBeInTheDocument()
  })

  it('calls onComplete once the timeline finishes', () => {
    const onComplete = vi.fn()
    render(<Intro onComplete={onComplete} />)
    expect(onComplete).toHaveBeenCalledTimes(1)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/Intro/Intro.test.jsx`
Expected: FAIL — `Cannot find module './Intro.jsx'`

- [ ] **Step 3: Write `Intro.module.css`**

```css
.intro {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
}

.pulse {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: var(--color-accent);
}
```

- [ ] **Step 4: Write the implementation**

```jsx
// src/components/Intro/Intro.jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import styles from './Intro.module.css'

export function Intro({ onComplete }) {
  const rootRef = useRef(null)
  const pulseRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      onComplete()
      return
    }

    const tl = gsap.timeline({ onComplete })
    tl.to(pulseRef.current, {
      scale: 1.6,
      opacity: 0.4,
      duration: 0.6,
      repeat: 3,
      yoyo: true,
      ease: 'power1.inOut',
    }).to(rootRef.current, {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 0.8,
      ease: 'power2.inOut',
    })

    return () => tl.kill()
  }, [reduced, onComplete])

  return (
    <div ref={rootRef} className={styles.intro} data-testid="intro">
      <div ref={pulseRef} className={styles.pulse} data-testid="pulse" />
    </div>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/Intro/Intro.test.jsx`
Expected: 2 tests PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/Intro
git commit -m "feat: add Intro beat-pulse and fold transition"
```

---

### Task 6: `Hero` Component (CX/BX/UX rings)

**Files:**
- Create: `src/components/Hero/Hero.jsx`
- Create: `src/components/Hero/Hero.module.css`
- Create: `src/components/Hero/Hero.test.jsx`

**Interfaces:**
- Consumes: `useReducedMotion()` from Task 2.
- Produces: `<Hero />` — consumed by `App.jsx` (Task 10).

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/Hero/Hero.test.jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Hero } from './Hero.jsx'

describe('Hero', () => {
  it('renders the three CX/BX/UX rings and the USER message', () => {
    render(<Hero />)
    expect(screen.getByTestId('ring-cx')).toHaveTextContent('CX')
    expect(screen.getByTestId('ring-bx')).toHaveTextContent('BX')
    expect(screen.getByTestId('ring-ux')).toHaveTextContent('UX')
    expect(screen.getByText(/USER/)).toBeInTheDocument()
  })

  it('renders a parallax backdrop layer', () => {
    render(<Hero />)
    expect(screen.getByTestId('hero-backdrop')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/Hero/Hero.test.jsx`
Expected: FAIL — `Cannot find module './Hero.jsx'`

- [ ] **Step 3: Write `Hero.module.css`**

CSS 3D transform gives the overlapping rings their depth, without any WebGL.

```css
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  perspective: 1000px;
  overflow: hidden;
}

.backdrop {
  position: absolute;
  inset: -20% 0;
  background: radial-gradient(circle at 50% 40%, rgba(109, 255, 184, 0.15), transparent 60%);
  z-index: 0;
}

.message {
  position: relative;
  z-index: 1;
  font-size: clamp(1.2rem, 3vw, 2rem);
  text-align: center;
}

.rings {
  position: relative;
  z-index: 1;
  width: 300px;
  height: 300px;
}

.ring {
  position: absolute;
  inset: 0;
  border: 2px solid #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.ring:nth-child(1) {
  transform: translate3d(-40px, -20px, 0);
}

.ring:nth-child(2) {
  transform: translate3d(40px, -20px, 0);
}

.ring:nth-child(3) {
  transform: translate3d(0, 40px, 40px);
}
```

- [ ] **Step 4: Write the implementation**

```jsx
// src/components/Hero/Hero.jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import styles from './Hero.module.css'

gsap.registerPlugin(ScrollTrigger)

const RINGS = [
  { id: 'cx', label: 'CX' },
  { id: 'bx', label: 'BX' },
  { id: 'ux', label: 'UX' },
]

export function Hero() {
  const sectionRef = useRef(null)
  const backdropRef = useRef(null)
  const ringRefs = useRef({})
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !sectionRef.current) return

    // Pin the section (Apple-style): scroll input drives the timeline below
    // instead of moving the page, until all three rings have faded out.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: true,
        pin: true,
      },
    })

    RINGS.forEach((ring) => {
      tl.to(ringRefs.current[ring.id], { scale: 2.5, opacity: 0, ease: 'power1.in' })
    })

    // Parallax: backdrop drifts slower than the rings across the whole pinned duration.
    tl.to(backdropRef.current, { yPercent: 15, ease: 'none' }, 0)

    return () => tl.scrollTrigger?.kill()
  }, [reduced])

  return (
    <section ref={sectionRef} className={styles.hero} data-testid="hero">
      <div ref={backdropRef} className={styles.backdrop} data-testid="hero-backdrop" />
      <p className={styles.message}>결국, 모든 디자인은 USER를 향한다</p>
      <div className={styles.rings}>
        {RINGS.map((ring) => (
          <div
            key={ring.id}
            ref={(el) => (ringRefs.current[ring.id] = el)}
            className={styles.ring}
            data-testid={`ring-${ring.id}`}
          >
            {ring.label}
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/Hero/Hero.test.jsx`
Expected: 2 tests PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero
git commit -m "feat: add Hero section with CX/BX/UX rings"
```

---

### Task 7: Project Data + `ProjectList` Component

**Files:**
- Create: `src/components/ProjectList/projects.data.js`
- Create: `src/components/ProjectList/ProjectList.jsx`
- Create: `src/components/ProjectList/ProjectList.module.css`
- Create: `src/components/ProjectList/ProjectList.test.jsx`

**Interfaces:**
- Consumes: `KineticText` from Task 4.
- Produces: `projects` array (`{ id, title, description }[]`) and `<ProjectList projects={projects} onSelect={(id) => void} />` — both consumed by `App.jsx` (Task 10).

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/ProjectList/ProjectList.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ProjectList } from './ProjectList.jsx'

const projects = [
  { id: 'a', title: '프로젝트 A', description: 'A' },
  { id: 'b', title: '프로젝트 B', description: 'B' },
]

describe('ProjectList', () => {
  it('renders every project title', () => {
    render(<ProjectList projects={projects} onSelect={() => {}} />)
    expect(screen.getByText('프로젝트 A')).toBeInTheDocument()
    expect(screen.getByText('프로젝트 B')).toBeInTheDocument()
  })

  it('calls onSelect with the project id when an item is clicked', () => {
    const onSelect = vi.fn()
    render(<ProjectList projects={projects} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('프로젝트 B'))
    expect(onSelect).toHaveBeenCalledWith('b')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/ProjectList/ProjectList.test.jsx`
Expected: FAIL — `Cannot find module './ProjectList.jsx'`

- [ ] **Step 3: Create `projects.data.js`** (replace sample content with real projects later)

```js
// src/components/ProjectList/projects.data.js
export const projects = [
  { id: 'project-one', title: '프로젝트 1', description: '프로젝트 1 설명이 들어갈 자리입니다.' },
  { id: 'project-two', title: '프로젝트 2', description: '프로젝트 2 설명이 들어갈 자리입니다.' },
  { id: 'project-three', title: '프로젝트 3', description: '프로젝트 3 설명이 들어갈 자리입니다.' },
]
```

- [ ] **Step 4: Write `ProjectList.module.css`** (asymmetric grid — odd items offset)

```css
.list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  padding: 4rem 2rem;
}

.item {
  composes: glass from global;
  text-align: left;
  padding: 2rem;
  border-radius: 8px;
  cursor: pointer;
  color: inherit;
}

.offset {
  transform: translateY(3rem);
}

.number {
  display: block;
  font-size: 3rem;
  opacity: 0.4;
}
```

- [ ] **Step 5: Write the implementation**

```jsx
// src/components/ProjectList/ProjectList.jsx
import { KineticText } from '../KineticText/KineticText.jsx'
import styles from './ProjectList.module.css'

export function ProjectList({ projects, onSelect }) {
  return (
    <section className={styles.list} data-testid="project-list">
      {projects.map((project, index) => (
        <button
          key={project.id}
          type="button"
          className={`${styles.item} ${index % 2 === 1 ? styles.offset : ''}`}
          onClick={() => onSelect(project.id)}
        >
          <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
          <KineticText text={project.title} as="h3" />
        </button>
      ))}
    </section>
  )
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run src/components/ProjectList/ProjectList.test.jsx`
Expected: 2 tests PASS

- [ ] **Step 7: Commit**

```bash
git add src/components/ProjectList
git commit -m "feat: add ProjectList with asymmetric grid"
```

---

### Task 8: `ProjectDetail` Overlay

**Files:**
- Create: `src/components/ProjectDetail/ProjectDetail.jsx`
- Create: `src/components/ProjectDetail/ProjectDetail.module.css`
- Create: `src/components/ProjectDetail/ProjectDetail.test.jsx`

**Interfaces:**
- Produces: `<ProjectDetail project={{id, title, description} | null} onClose={() => void} />` — consumed by `App.jsx` (Task 10), driven by `useProjectRoute` (Task 3).

Fade in/out is plain CSS transition (no GSAP needed for a simple opacity fade), gated by a small `visible` state so the exit transition can play before the component actually unmounts.

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/ProjectDetail/ProjectDetail.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ProjectDetail } from './ProjectDetail.jsx'

const project = { id: 'a', title: '프로젝트 A', description: '설명 A' }

describe('ProjectDetail', () => {
  it('renders nothing when there is no project', () => {
    const { container } = render(<ProjectDetail project={null} onClose={() => {}} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders the project title and description', () => {
    render(<ProjectDetail project={project} onClose={() => {}} />)
    expect(screen.getByText('프로젝트 A')).toBeInTheDocument()
    expect(screen.getByText('설명 A')).toBeInTheDocument()
  })

  it('calls onClose after the fade-out delay when the close button is clicked', () => {
    vi.useFakeTimers()
    const onClose = vi.fn()
    render(<ProjectDetail project={project} onClose={onClose} />)
    fireEvent.click(screen.getByRole('button', { name: '닫기' }))
    expect(onClose).not.toHaveBeenCalled()
    vi.advanceTimersByTime(300)
    expect(onClose).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/ProjectDetail/ProjectDetail.test.jsx`
Expected: FAIL — `Cannot find module './ProjectDetail.jsx'`

- [ ] **Step 3: Write `ProjectDetail.module.css`**

```css
.overlay {
  composes: glass from global;
  position: fixed;
  inset: 2rem;
  z-index: 50;
  border-radius: 16px;
  padding: 3rem;
  opacity: 0;
  transition: opacity 300ms ease;
}

.visible {
  opacity: 1;
}

.closeButton {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: inherit;
  font-size: 2rem;
  cursor: pointer;
}
```

- [ ] **Step 4: Write the implementation**

```jsx
// src/components/ProjectDetail/ProjectDetail.jsx
import { useEffect, useState } from 'react'
import styles from './ProjectDetail.module.css'

const FADE_MS = 300

export function ProjectDetail({ project, onClose }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!project) {
      setVisible(false)
      return
    }
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [project])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, FADE_MS)
  }

  if (!project) return null

  return (
    <div
      className={`${styles.overlay} ${visible ? styles.visible : ''}`}
      data-testid="project-detail"
    >
      <button type="button" className={styles.closeButton} onClick={handleClose} aria-label="닫기">
        ×
      </button>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
    </div>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/components/ProjectDetail/ProjectDetail.test.jsx`
Expected: 3 tests PASS

- [ ] **Step 6: Commit**

```bash
git add src/components/ProjectDetail
git commit -m "feat: add ProjectDetail fade overlay"
```

---

### Task 9: `About` and `Footer` Components

**Files:**
- Create: `src/components/About/About.jsx`
- Create: `src/components/About/About.test.jsx`
- Create: `src/components/Footer/Footer.jsx`
- Create: `src/components/Footer/Footer.test.jsx`

**Interfaces:**
- Produces: `<About bio={string} />` and `<Footer email={string} />` — both consumed by `App.jsx` (Task 10).

- [ ] **Step 1: Write the failing tests**

```jsx
// src/components/About/About.test.jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { About } from './About.jsx'

describe('About', () => {
  it('renders the given bio text', () => {
    render(<About bio="자기소개 텍스트" />)
    expect(screen.getByText('자기소개 텍스트')).toBeInTheDocument()
  })
})
```

```jsx
// src/components/Footer/Footer.test.jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Footer } from './Footer.jsx'

describe('Footer', () => {
  it('renders a mailto link with the given email', () => {
    render(<Footer email="test@example.com" />)
    const link = screen.getByRole('link', { name: 'test@example.com' })
    expect(link).toHaveAttribute('href', 'mailto:test@example.com')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/About/About.test.jsx src/components/Footer/Footer.test.jsx`
Expected: both FAIL — modules not found

- [ ] **Step 3: Write the implementations**

```jsx
// src/components/About/About.jsx
export function About({ bio }) {
  return (
    <section data-testid="about">
      <p>{bio}</p>
    </section>
  )
}
```

```jsx
// src/components/Footer/Footer.jsx
export function Footer({ email }) {
  return (
    <footer data-testid="footer">
      <a href={`mailto:${email}`}>{email}</a>
    </footer>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/components/About/About.test.jsx src/components/Footer/Footer.test.jsx`
Expected: 2 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/About src/components/Footer
git commit -m "feat: add About and Footer sections"
```

---

### Task 10: App Integration + Deployment

**Files:**
- Modify: `src/App.jsx` (replace placeholder from Task 1)
- Modify: `src/App.test.jsx` (replace placeholder test from Task 1)
- Create: `vercel.json`

**Interfaces:**
- Consumes: `useProjectRoute` (Task 3), `Intro` (Task 5), `Hero` (Task 6), `ProjectList` + `projects` (Task 7), `ProjectDetail` (Task 8), `About`/`Footer` (Task 9).

- [ ] **Step 1: Write the failing test**

```jsx
// src/App.test.jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import App from './App.jsx'

describe('App', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
  })

  it('renders hero, project list, about, and footer', () => {
    render(<App />)
    expect(screen.getByTestId('hero')).toBeInTheDocument()
    expect(screen.getByTestId('project-list')).toBeInTheDocument()
    expect(screen.getByTestId('about')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('opens a project detail overlay when a project is clicked, and closes it', () => {
    render(<App />)
    screen.getByText('프로젝트 1').click()
    expect(screen.getByTestId('project-detail')).toBeInTheDocument()
    expect(window.location.search).toBe('?project=project-one')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/App.test.jsx`
Expected: FAIL — `getByTestId('hero')` not found (placeholder `App.jsx` doesn't render it yet)

- [ ] **Step 3: Replace `src/App.jsx`**

```jsx
// src/App.jsx
import { useState } from 'react'
import { Intro } from './components/Intro/Intro.jsx'
import { Hero } from './components/Hero/Hero.jsx'
import { ProjectList } from './components/ProjectList/ProjectList.jsx'
import { ProjectDetail } from './components/ProjectDetail/ProjectDetail.jsx'
import { About } from './components/About/About.jsx'
import { Footer } from './components/Footer/Footer.jsx'
import { projects } from './components/ProjectList/projects.data.js'
import { useProjectRoute } from './hooks/useProjectRoute.js'

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const { projectId, openProject, closeProject } = useProjectRoute()
  const activeProject = projects.find((p) => p.id === projectId) ?? null

  return (
    <>
      {!introDone && <Intro onComplete={() => setIntroDone(true)} />}
      <Hero />
      <ProjectList projects={projects} onSelect={openProject} />
      <About bio="자기소개 텍스트가 들어갈 자리입니다." />
      <Footer email="your-email@example.com" />
      <ProjectDetail project={activeProject} onClose={closeProject} />
    </>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/App.test.jsx`
Expected: 2 tests PASS

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: all test files PASS (scaffold + 2 hooks + 5 components + App)

- [ ] **Step 6: Verify the production build still works**

Run: `npm run build`
Expected: `dist/` builds with no errors

- [ ] **Step 7: Create `vercel.json`**

Vite's default output (`dist/`) needs no special Vercel config beyond confirming the framework preset; this file makes the build command explicit for a static SPA.

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

- [ ] **Step 8: Commit**

```bash
git add src/App.jsx src/App.test.jsx vercel.json
git commit -m "feat: wire up full page in App and add Vercel config"
```

- [ ] **Step 9: Manual deployment steps (not scriptable — do these in the browser)**

1. Push this repo to a new GitHub repository.
2. Go to https://vercel.com, "Add New Project", import the GitHub repo.
3. Vercel auto-detects Vite; accept the defaults (build command `npm run build`, output `dist`).
4. Deploy — every future push to `main` auto-redeploys.
5. Before going live, replace the placeholder email in `src/App.jsx` (`your-email@example.com`) with the real contact address.

---

## Manual Verification (after all tasks complete)

Automated tests cover logic (routing, reduced-motion, open/close, rendering). They deliberately do **not** cover real GSAP/ScrollTrigger visual behavior (mocked out) — so before calling this done, run `npm run dev` and manually check in a browser:

- Intro plays the pulse, then folds up into the Hero.
- Hero pins in place while scrolling (page stops moving) until all three CX/BX/UX rings have shrunk/faded out and the backdrop has drifted; only then does scrolling resume into the project list.
- Project list titles animate in on scroll; clicking one opens the detail overlay with a fade, updates the URL, and back/forward navigation closes it correctly.
- Toggling OS-level "reduce motion" (Windows: Settings → Accessibility → Visual effects → Animation effects, off) skips all animations but still shows final content.
