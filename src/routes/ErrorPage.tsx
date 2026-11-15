
import { Link, isRouteErrorResponse, useRouteError } from "react-router";
import { Container } from "react-bootstrap";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  const error = useRouteError();
  const missing = !error || (isRouteErrorResponse(error) && error.status === 404);
  return (
    <section className="grid min-h-[70dvh] place-items-center py-20">
      <Container fluid className="px-4 px-lg-5">
        <p className="display-cond text-[clamp(6rem,24vw,18rem)] text-rosso">{missing ? "404" : "Oops"}</p>
        <h1 className="display text-4xl">{missing ? "Off the track." : "Something stalled."}</h1>
        <p className="mt-4 max-w-[44ch] text-xl text-mute">
          {missing ? "That page does not exist. Head back to the pits." : "An unexpected error occurred. Try going back to the home page."}
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link to="/">Back to the pits</Link>
        </Button>
      </Container>
    </section>
  );
}
