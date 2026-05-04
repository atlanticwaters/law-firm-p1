import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [location.pathname]);

  const headerClass = isHome && !scrolled
    ? "header header--transparent"
    : "header header--solid";

  return (
    <div className="layout">
      <header className={headerClass}>
        <nav className="nav">
          <Link to="/" className="nav-brand" aria-label="Glover, Mast &amp; Purl LLP — Home">
            <span className="nav-firm-name">Glover, Mast &amp; Purl <span style={{ fontWeight: 300 }}>LLP</span></span>
          </Link>

          <div
            id="nav-links"
            className={`nav-links${menuOpen ? " open" : ""}`}
            {...(menuOpen ? { role: "dialog", "aria-modal": "true", "aria-label": "Navigation" } : {})}
          >
            {menuOpen && (
              <button
                className="nav-close"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                &times;
              </button>
            )}
            <Link to="/practice" className={location.pathname === "/practice" ? "active" : ""}>
              Practice Areas
            </Link>
            <Link to="/clients" className={location.pathname === "/clients" ? "active" : ""}>
              Who We Serve
            </Link>
            <Link to="/attorneys" className={location.pathname.startsWith("/attorneys") ? "active" : ""}>
              Attorneys
            </Link>
            <Link to="/results" className={location.pathname === "/results" ? "active" : ""}>
              Results
            </Link>
            <Link to="/perspectives" className={location.pathname === "/perspectives" ? "active" : ""}>
              Perspectives
            </Link>
            <Link to="/evaluate" className={location.pathname === "/evaluate" ? "active" : ""}>
              Case Evaluation
            </Link>
            <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>
              Contact
            </Link>
          </div>

          <button
            className="nav-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="nav-links"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-brand">Glover, Mast &amp; Purl LLP</div>
            <p className="footer-description">
              Counsel for those who cannot independently retain
              or instruct legal representation. Established 1994.
            </p>
          </div>
          <div>
            <div className="footer-heading">Navigation</div>
            <ul className="footer-links">
              <li><Link to="/practice">Practice Areas</Link></li>
              <li><Link to="/attorneys">Attorneys</Link></li>
              <li><Link to="/results">Results</Link></li>
              <li><Link to="/perspectives">Perspectives</Link></li>
              <li><Link to="/evaluate">Case Evaluation</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-heading">The Firm</div>
            <ul className="footer-links">
              <li><Link to="/community">Community &amp; Pro Bono</Link></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
            <div className="footer-heading" style={{ marginTop: "var(--space-xl)" }}>Offices</div>
            <ul className="footer-links">
              <li><span>New York</span></li>
              <li><span>London</span></li>
              <li><span>Geneva</span></li>
            </ul>
            <div className="footer-heading" style={{ marginTop: "var(--space-xl)" }}>Inquiries</div>
            <ul className="footer-links">
              <li><a href="mailto:inquiries@glovermastpurl.com">inquiries@glovermastpurl.com</a></li>
              <li><span>1-888-GMP-LLAW</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Glover, Mast &amp; Purl LLP. All rights reserved.</span>
          <div style={{ display: "flex", gap: "var(--space-xl)" }}>
            <Link to="/privacy" style={{ color: "inherit" }}>Privacy Policy</Link>
            <span>Attorney Advertising</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
