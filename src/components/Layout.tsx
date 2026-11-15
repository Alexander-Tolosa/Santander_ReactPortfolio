
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, ScrollRestoration, useLocation, useNavigation } from "react-router";
import { Container, Nav, Navbar, Offcanvas, Spinner } from "react-bootstrap";
import { Menu } from "lucide-react";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap";
import { profile } from "@/lib/data";

export const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Layout() {
  const { pathname } = useLocation();
  const navigation = useNavigation();
  const main = useRef<HTMLElement>(null);
  const lap = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Lap bar: scroll progress across the whole page.
  useLayoutEffect(() => {
    if (!lap.current) return;
    const t = gsap.to(lap.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 },
    });
    return () => {
      t.scrollTrigger?.kill();
      t.kill();
    };
  }, []);

  // Route transition: content rises in; focus moves to main for screen readers.
  useLayoutEffect(() => {
    const el = main.current;
    if (!el) return;
    if (!reducedMotion()) gsap.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out", clearProps: "transform" });
    el.focus({ preventScroll: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    document.title = `${navItems.find((n) => (n.to === "/" ? pathname === "/" : pathname.startsWith(n.to)))?.label ?? "Page"} | ${profile.name}`;
  }, [pathname]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1100] focus:bg-giallo focus:px-4 focus:py-2 focus:font-bold focus:text-carbon">
        Skip to content
      </a>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[1050] h-[3px] bg-white/10" aria-hidden>
        <div ref={lap} className="h-full origin-left scale-x-0 bg-rosso" />
      </div>

      <Navbar expand="lg" fixed="top" className="border-b border-white/10 bg-carbon/90 py-3 backdrop-blur-md" style={{ top: 3 }}>
        <Container fluid className="px-4 px-lg-5">
          <Navbar.Brand as={Link} to="/" className="display flex items-center gap-3 text-lg !text-ivory">
            <span className="grid size-9 place-items-center bg-rosso text-sm font-black text-white" aria-hidden>AS</span>
            <span className="hidden sm:inline">{profile.name}</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="nav-canvas" aria-label="Open menu" onClick={() => setOpen(true)} className="lg:!hidden !grid size-11 place-items-center !border !border-white/40 !p-0 !text-ivory"><Menu className="size-6" aria-hidden /></Navbar.Toggle>
          <Navbar.Offcanvas id="nav-canvas" placement="end" show={open} onHide={() => setOpen(false)}>
            <Offcanvas.Header closeButton closeVariant="white">
              <Offcanvas.Title className="display text-2xl">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="items-lg-center">
              <Nav className="ms-lg-auto gap-lg-1 pe-lg-2">
                {navItems.map((n) => (
                  <Nav.Link
                    as={NavLink}
                    key={n.to}
                    to={n.to}
                    end={n.to === "/"}
                    onClick={() => setOpen(false)}
                    className="display-cond !py-3 !text-2xl uppercase tracking-wide lg:!px-4 lg:!py-3 lg:!text-base [&.active]:text-white lg:[&.active]:shadow-[inset_0_-3px_0_#dc0000] [&:not(.active)]:text-mute hover:!text-white"
                  >
                    {n.label}
                  </Nav.Link>
                ))}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {navigation.state === "loading" && (
        <div className="fixed bottom-6 right-6 z-[1060] flex items-center gap-2 bg-asphalt px-4 py-2 text-sm" role="status">
          <Spinner size="sm" variant="danger" /> Loading
        </div>
      )}

      <main id="main" ref={main} tabIndex={-1} className="pt-[68px] outline-none">
        <Outlet />
      </main>

      <footer className="border-t border-white/10 bg-asphalt py-8">
        <Container fluid className="flex flex-wrap items-center gap-3 px-4 px-lg-5 text-mute">
          <p className="m-0">
            © 2026 {profile.name} · {profile.location}
          </p>
        </Container>
      </footer>
      <ScrollRestoration />
    </>
  );
}
