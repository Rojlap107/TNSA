export const metadata = {
  title: "Tibetan National Sports Association",
  description: "Official TNSA website",
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
};

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Shared Header */}
        <header className="header">
          <div className="top-bar">
            <div className="container">
              <div className="social-donate">
                <a href="/donate" className="donate-btn">
                  DONATE
                </a>
                <a href="/membership" className="member-btn">
                  Become a Member
                </a>
                <div className="social-icons">
                  <a
                    href="https://www.facebook.com/tibetfootballteam/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="social-icon facebook"
                  >
                    <img src="/icons/facebook.svg" alt="Facebook" />
                  </a>
                  <a
                    href="https://www.instagram.com/tnsadharamshala/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="social-icon instagram"
                  >
                    <img src="/icons/instagram.svg" alt="Instagram" />
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCV8AcnJxF3dMqJ7GogF0Q-g"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                    className="social-icon youtube"
                  >
                    <img src="/icons/youtube.svg" alt="YouTube" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <nav className="navbar">
            <div className="container">
              <div className="nav-content">
                <a href="/" className="logo">
                  <img src="/logo.png" alt="TNSA Logo" />
                </a>
                <ul className="nav-menu">
                  <li>
                    <a href="/about">ABOUT</a>
                  </li>
                  <li>
                    <a href="/news">NEWS</a>
                  </li>
                  <li>
                    <a href="/tournaments">TOURNAMENTS</a>
                  </li>
                  <li>
                    <a href="/programs">PROGRAMS</a>
                  </li>
                  <li>
                    <a href="/national-team">NATIONAL TEAM</a>
                  </li>
                  <li>
                    <a href="/contact">CONTACT</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        {/* Page content */}
        {children}

        {/* Shared Footer */}
        <footer className="footer" id="contact">
          <div className="container">
            <a href="/contact" className="contact-btn">
              Contact Us
            </a>
            <div className="footer-social">
              <a
                href="https://www.facebook.com/tibetfootballteam/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="social-icon facebook"
              >
                <img src="/icons/facebook.svg" alt="Facebook" />
              </a>
              <a
                href="https://www.instagram.com/tnsadharamshala/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="social-icon instagram"
              >
                <img src="/icons/instagram.svg" alt="Instagram" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCV8AcnJxF3dMqJ7GogF0Q-g"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="social-icon youtube"
              >
                <img src="/icons/youtube.svg" alt="YouTube" />
              </a>
            </div>
            <p className="copyright">
              © Copyrights 2025 | Tibetan National Sports Association
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
