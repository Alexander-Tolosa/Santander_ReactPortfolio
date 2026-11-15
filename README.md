# Adrian Santander: Ferrari-inspired portfolio (placeholder content)
Vite + React + TypeScript, Tailwind, shadcn/ui, lucide-react, GSAP, React Router (Data Mode) and React Bootstrap.


    npm install
    npm run dev      # http://localhost:5173

## Replace the placeholders
All text lives in `src/lib/data.ts`.

## Rubric map
| Criteria | Where |
|---|---|
| Pages (separate .tsx) | `src/routes/`: Home, About, Contact (+ ErrorPage for 404) |
| React Bootstrap components (5+ different) | Navbar, Nav, Offcanvas, Container/Row/Col, Badge (Home); ListGroup, Accordion, ProgressBar (About); Form, Toast (Contact) |
| Navigation | `src/components/Layout.tsx`: one Navbar linking all pages, on every route |
| Layout / responsive | Mobile-first grid, Offcanvas menu below 992px, fluid type, reduced-motion support |

## How routing works
`src/components/AppRouter.tsx` builds `createBrowserRouter` (action on the contact form). Entry: `index.html` → `src/main.tsx`.

Ferrari-inspired styling only; no Ferrari logos or marks. Not affiliated with Ferrari.
