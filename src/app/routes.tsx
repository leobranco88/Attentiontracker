import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { StudentDetail } from "./pages/StudentDetail";
import { TriageView } from "./pages/TriageView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "student/:id", Component: StudentDetail },
      { path: "triage", Component: TriageView },
    ],
  },
]);
