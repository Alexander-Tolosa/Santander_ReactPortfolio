
import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useNavigation, type ActionFunctionArgs } from "react-router";
import { Col, Container, Form as BsForm, Row, Toast, ToastContainer } from "react-bootstrap";
import { Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHead from "@/routes/PageHead";
import { useReveal } from "@/lib/useReveal";
import { profile } from "@/lib/data";

type Result = { ok: boolean; errors?: Partial<Record<"name" | "email" | "message", string>> };

// React Router Data Mode action: validates the form on submit.
export async function contactAction({ request }: ActionFunctionArgs): Promise<Result> {
  const data = await request.formData();
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();
  const errors: NonNullable<Result["errors"]> = {};
  if (!name) errors.name = "Enter your name so I know who to reply to.";
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email address, like name@example.com.";
  if (message.length < 10) errors.message = "Write at least 10 characters so I have something to answer.";
  if (Object.keys(errors).length) return { ok: false, errors };
  await new Promise((r) => setTimeout(r, 600)); // placeholder: wire to a real email service
  return { ok: true };
}

export default function Contact() {
  const root = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const result = useActionData() as Result | undefined;
  const navigation = useNavigation();
  const sending = navigation.state === "submitting";
  const [dismissed, setDismissed] = useState<Result | null>(null);
  const toast = !!result?.ok && dismissed !== result;
  useReveal(root);

  useEffect(() => {
    if (result?.ok) {
      formRef.current?.reset();
    } else if (result?.errors) {
      formRef.current?.querySelector<HTMLElement>(".is-invalid")?.focus();
    }
  }, [result]);

  const err = (k: "name" | "email" | "message") => result?.errors?.[k];

  return (
    <div ref={root}>
      <PageHead title="Contact" lead="Send a message, or reach me directly." />

      <section className="py-16">
        <Container fluid className="px-4 px-lg-5">
          <Row className="gy-5">
            <Col lg={7}>
              <Form method="post" noValidate ref={formRef} data-reveal>
                <BsForm.Group className="mb-4" controlId="name">
                  <BsForm.Label>Name (required)</BsForm.Label>
                  <BsForm.Control name="name" autoComplete="name" required isInvalid={!!err("name")} aria-describedby="name-err" />
                  <BsForm.Control.Feedback type="invalid" id="name-err">
                    {err("name")}
                  </BsForm.Control.Feedback>
                </BsForm.Group>
                <BsForm.Group className="mb-4" controlId="email">
                  <BsForm.Label>Email (required)</BsForm.Label>
                  <BsForm.Control type="email" name="email" autoComplete="email" placeholder="name@example.com" required isInvalid={!!err("email")} aria-describedby="email-err email-help" />
                  <BsForm.Text id="email-help" className="text-mute">Only used to reply to you.</BsForm.Text>
                  <BsForm.Control.Feedback type="invalid" id="email-err">
                    {err("email")}
                  </BsForm.Control.Feedback>
                </BsForm.Group>
                <BsForm.Group className="mb-4" controlId="message">
                  <BsForm.Label>Message (required)</BsForm.Label>
                  <BsForm.Control as="textarea" rows={6} name="message" required placeholder="What would you like to talk about?" isInvalid={!!err("message")} aria-describedby="message-err" />
                  <BsForm.Control.Feedback type="invalid" id="message-err">
                    {err("message")}
                  </BsForm.Control.Feedback>
                </BsForm.Group>
                <Button type="submit" size="lg" disabled={sending}>
                  <Send /> {sending ? "Sending…" : "Send message"}
                </Button>
              </Form>
            </Col>
            <Col lg={5}>
              <div data-reveal className="space-y-4 text-lg">
                <p className="m-0 flex items-center gap-3">
                  <Mail className="size-5 text-rosso-hi" aria-hidden />
                  <a href={`mailto:${profile.email}`} className="text-ivory hover:text-rosso-hi">{profile.email}</a>
                </p>
                <p className="m-0 flex items-center gap-3">
                  <MapPin className="size-5 text-rosso-hi" aria-hidden /> {profile.location}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <ToastContainer position="bottom-end" className="p-4" style={{ zIndex: 1080 }}>
        <Toast show={toast} onClose={() => setDismissed(result ?? null)} delay={9000} autohide>
          <Toast.Header closeButton>
            <strong className="me-auto">Message received</strong>
          </Toast.Header>
          <Toast.Body>Thanks for reaching out. I will reply soon. (Placeholder: nothing was actually sent.)</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
