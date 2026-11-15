import { useRef } from "react";
import { Link } from "react-router";
import { Accordion, Col, Container, ListGroup, ProgressBar, Row } from "react-bootstrap";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHead from "@/routes/PageHead";
import { useReveal } from "@/lib/useReveal";
import { education, experience, glance, profile, skills } from "@/lib/data";

export default function About() {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);

  return (
    <div ref={root}>
      <PageHead title="About" lead={profile.intro} />

      <section className="py-16">
        <Container fluid className="px-4 px-lg-5">
          <Row className="gy-5">
            <Col lg={5}>
              <h2 data-reveal className="display mb-6 text-[clamp(2rem,4vw,3rem)]">
                At a glance
              </h2>
              <ListGroup data-reveal variant="flush" as="dl" className="m-0">
                {glance.map((g) => (
                  <ListGroup.Item key={g.label} className="flex justify-between gap-6 !border-white/15 py-3">
                    <dt className="font-normal text-mute">{g.label}</dt>
                    <dd className="m-0 text-right text-ivory">{g.value}</dd>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div data-reveal className="mt-8">
                <Button asChild>
                  <Link to="/contact">
                    Get in touch <ArrowRight />
                  </Link>
                </Button>
              </div>
            </Col>

            <Col lg={7}>
              <h2 data-reveal className="display mb-6 text-[clamp(2rem,4vw,3rem)]">
                Experience
              </h2>
              <Accordion data-reveal defaultActiveKey="0" className="mb-12">
                {experience.map((e, i) => (
                  <Accordion.Item key={e.role} eventKey={String(i)}>
                    <Accordion.Header>{e.role}</Accordion.Header>
                    <Accordion.Body>
                      <p className="mb-2 text-lg text-white">{e.place}</p>
                      <p className="m-0 text-mute">{e.note}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>

              <h2 data-reveal className="display mb-6 text-[clamp(2rem,4vw,3rem)]">
                Education
              </h2>
              <div data-reveal className="mb-12 border border-white/15 p-4">
                <p className="display-cond m-0 text-3xl uppercase">{education.title}</p>
                <p className="mt-2 mb-1 text-white">{education.place}</p>
                <p className="m-0 text-mute">{education.note}</p>
              </div>

              <h2 data-reveal className="display mb-6 text-[clamp(2rem,4vw,3rem)]">
                Skills
              </h2>
              <div data-reveal className="space-y-5">
                {skills.map((s) => (
                  <div key={s.name}>
                    <p className="display-cond mb-2 text-2xl uppercase">{s.name}</p>
                    <ProgressBar now={s.level} aria-label={`${s.name} comfort level`} />
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
