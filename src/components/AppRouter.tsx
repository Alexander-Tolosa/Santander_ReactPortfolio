
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "@/components/Layout";
import Home from "@/routes/Home";
import About from "@/routes/About";
import Contact, { contactAction } from "@/routes/Contact";
import ErrorPage from "@/routes/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    ErrorBoundary: ErrorPage,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "contact", Component: Contact, action: contactAction },
      { path: "*", Component: ErrorPage },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
