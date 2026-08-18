import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Attorneys from "./pages/Attorneys";
import AttorneyDetail from "./pages/AttorneyDetail";
import Practice from "./pages/Practice";
import Results from "./pages/Results";
import Perspectives from "./pages/Perspectives";
import PerspectiveDetail from "./pages/PerspectiveDetail";
import ResultDetail from "./pages/ResultDetail";
import Clients from "./pages/Clients";
import Evaluate from "./pages/Evaluate";
import Community from "./pages/Community";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="attorneys" element={<Attorneys />} />
          <Route path="attorneys/:slug" element={<AttorneyDetail />} />
          <Route path="practice" element={<Practice />} />
          <Route path="results" element={<Results />} />
          <Route path="results/:slug" element={<ResultDetail />} />
          <Route path="perspectives" element={<Perspectives />} />
          <Route path="perspectives/:slug" element={<PerspectiveDetail />} />
          <Route path="clients" element={<Clients />} />
          <Route path="evaluate" element={<Evaluate />} />
          <Route path="community" element={<Community />} />
          <Route path="careers" element={<Careers />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}
