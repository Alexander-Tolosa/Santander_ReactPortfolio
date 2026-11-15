import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router";
import { Badge, Container } from "react-bootstrap";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap, reducedMotion } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";
import { profile, tools } from "@/lib/data";

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);

  // One entrance: the hero content rises into place.
  useLayoutEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-in]", { y: 40, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.1 });
    }, root);
    return () => ctx.revert();
  }, []);

  const [first, last] = profile.name.split(" ");

  return (
    <div ref={root}>
      <section className="bg-carbon py-12 lg:py-20">
        <Container fluid className="px-4 px-lg-5">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="order-[2] lg:order-[1]">
              <h1 data-hero-in className="display text-[clamp(2.8rem,7vw,6.5rem)] text-ivory">
                {first}
                <br />
                <span className="text-rosso">{last}</span>
              </h1>
              <p data-hero-in className="mt-6 max-w-[34ch] text-xl text-ivory/90 md:text-2xl">
                {profile.role}. {profile.tagline}
              </p>
              <div data-hero-in className="mt-9 flex flex-wrap items-center gap-4">
                <Button asChild size="lg">
                  <Link to="/about">
                    About me <ArrowRight />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/contact">Get in touch</Link>
                </Button>
              </div>
            </div>

            <div data-hero-in className="order-[1] mx-auto w-full max-w-[300px] lg:order-[2] lg:ml-auto lg:mr-0 lg:max-w-[460px]">
              <div className="relative">
                <div aria-hidden className="absolute -bottom-4 -right-4 h-3/4 w-3/4 bg-rosso" />
                <img
                  src="/adrian.jpg"
                  alt={`Portrait of ${profile.name}`}
                  width={800}
                  height={800}
                  className="relative aspect-[4/5] w-full object-cover object-[55%_20%]"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 bg-asphalt py-10">
        <Container fluid className="px-4 px-lg-5">
          <ul data-reveal className="m-0 flex list-none flex-wrap justify-center gap-3 p-0">
            {tools.map((t) => (
              <li key={t}>
                <Badge bg="secondary" className="px-4 py-3 !text-sm">
                  {t}
                </Badge>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  );
}
