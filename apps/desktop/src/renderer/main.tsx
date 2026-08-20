import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";

function App(): JSX.Element {
  const version = window.modelHub ? "Desktop bridge ready" : "Desktop bridge unavailable";

  return (
    <main className="shell">
      <section className="hero-card">
        <span className="eyebrow">MODEL HUB</span>
        <h1>Your AI workspace starts here.</h1>
        <p>
          Multi-model rooms, collaborative brainstorming, and a focused desktop
          assistant will be built on this foundation.
        </p>
        <div className="status">{version}</div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
