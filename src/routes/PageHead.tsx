import { Container } from "react-bootstrap";

export default function PageHead({ title, lead }: { title: string; lead: string }) {
  return (
    <header className="border-b border-white/10 bg-carbon pt-20 pb-14">
      <Container fluid className="px-4 px-lg-5">
        <h1 className="display text-[clamp(3rem,9vw,8rem)]">
          {title}
          <span className="text-rosso">.</span>
        </h1>
        <p className="mt-6 max-w-[52ch] text-xl text-mute">{lead}</p>
      </Container>
    </header>
  );
}
