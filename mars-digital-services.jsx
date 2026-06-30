import React, { useState, useEffect, useRef } from "react";

const palette = {
  ink: "#15100C",
  surface: "#1E1712",
  rust: "#C1440E",
  rustDeep: "#8C3009",
  sand: "#EDE0CC",
  sandDim: "#B6A98C",
  signal: "#5EEAD4",
};

const fontDisplay = "'Space Grotesk', sans-serif";
const fontBody = "'IBM Plex Sans', sans-serif";
const fontMono = "'IBM Plex Mono', monospace";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(18px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Label({ children }) {
  return (
    <div
      style={{
        fontFamily: fontMono,
        fontSize: "11px",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: palette.signal,
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <span style={{ width: "16px", height: "1px", background: palette.signal, display: "inline-block" }} />
      {children}
    </div>
  );
}

function Planet({ size = 220 }) {
  const [rot, setRot] = useState(0);
  useEffect(() => {
    let raf;
    const tick = () => {
      setRot((r) => (r + 0.06) % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <div
        style={{
          position: "absolute",
          inset: "-14px",
          borderRadius: "50%",
          border: `1px solid ${palette.sandDim}55`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          overflow: "hidden",
          background: `radial-gradient(circle at 38% 32%, ${palette.rust} 0%, ${palette.rustDeep} 55%, #5A1C05 100%)`,
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 200 200" style={{ position: "absolute", inset: 0, transform: `rotate(${rot}deg)` }}>
          <ellipse cx="70" cy="60" rx="30" ry="14" fill="#7A2A07" opacity="0.55" />
          <ellipse cx="140" cy="100" rx="22" ry="10" fill="#5A1C05" opacity="0.5" />
          <ellipse cx="90" cy="150" rx="34" ry="12" fill="#7A2A07" opacity="0.45" />
          <ellipse cx="30" cy="120" rx="16" ry="8" fill="#9C3A12" opacity="0.4" />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(115deg, transparent 48%, ${palette.ink}cc 50%, ${palette.ink}f5 100%)`,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "50%",
          width: "1px",
          height: "14px",
          background: palette.signal,
          transform: `translateX(-50%) rotate(${rot * 2.2}deg)`,
          transformOrigin: `0px ${size / 2 - 16}px`,
        }}
      />
    </div>
  );
}

function ServiceCard({ index, title, desc, tag }) {
  return (
    <Reveal delay={index * 90}>
      <div
        style={{
          border: `1px solid ${palette.sandDim}33`,
          padding: "28px 24px",
          height: "100%",
          background: palette.surface,
          transition: "border-color 0.25s ease, transform 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = palette.signal + "88";
          e.currentTarget.style.transform = "translateY(-4px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = palette.sandDim + "33";
          e.currentTarget.style.transform = "translateY(0px)";
        }}
      >
        <div style={{ fontFamily: fontMono, fontSize: "11px", color: palette.signal, marginBottom: "16px" }}>{tag}</div>
        <h3 style={{ fontFamily: fontDisplay, fontSize: "21px", fontWeight: 500, color: palette.sand, marginBottom: "10px" }}>
          {title}
        </h3>
        <p style={{ fontFamily: fontBody, fontSize: "14.5px", lineHeight: 1.65, color: palette.sandDim }}>{desc}</p>
      </div>
    </Reveal>
  );
}

function ProcessStep({ n, title, desc }) {
  return (
    <Reveal delay={n * 90}>
      <div style={{ display: "flex", gap: "20px", padding: "22px 0", borderTop: `1px solid ${palette.sandDim}2a` }}>
        <div style={{ fontFamily: fontMono, fontSize: "13px", color: palette.rust, minWidth: "54px" }}>
          {String(n).padStart(2, "0")}
        </div>
        <div>
          <h4 style={{ fontFamily: fontDisplay, fontSize: "17px", fontWeight: 500, color: palette.sand, marginBottom: "6px" }}>
            {title}
          </h4>
          <p style={{ fontFamily: fontBody, fontSize: "14px", color: palette.sandDim, lineHeight: 1.6, maxWidth: "520px" }}>
            {desc}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export default function MarsDigitalServices() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const services = [
    {
      tag: "01 / CGI + 3D",
      title: "CGI & 3D animation",
      desc: "Product renders, motion pieces and 3D brand worlds that most agencies in Karachi simply can't build in-house.",
    },
    {
      tag: "02 / IDENTITY",
      title: "Branding & identity",
      desc: "Logos, visual systems and brand guidelines built to carry across every touchpoint, not just a profile picture.",
    },
    {
      tag: "03 / WEB",
      title: "Web design & build",
      desc: "Fast, conversion-focused websites that actually work for your business, not just look good in a screenshot.",
    },
    {
      tag: "04 / SOCIAL",
      title: "Social media management",
      desc: "Posts, stories, captions and monthly reports handled end to end, so content stops being the thing you never get to.",
    },
  ];

  const nav = ["Services", "Process", "Careers", "Contact"];

  const scrollTo = (id) => {
    setNavOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ background: palette.ink, color: palette.sand, fontFamily: fontBody, minHeight: "100vh" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      {/* NAV */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: scrolled ? `${palette.ink}f0` : "transparent",
          borderBottom: scrolled ? `1px solid ${palette.sandDim}22` : "1px solid transparent",
          backdropFilter: "blur(6px)",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: fontDisplay, fontSize: "16px", fontWeight: 600, letterSpacing: "0.02em", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: palette.rust, display: "inline-block" }} />
            MARS DIGITAL
          </div>
          <nav className="hidden md:flex" style={{ gap: "32px", fontSize: "13.5px" }}>
            {nav.map((n) => (
              <button
                key={n}
                onClick={() => scrollTo(n.toLowerCase())}
                style={{ background: "none", border: "none", color: palette.sandDim, cursor: "pointer", fontFamily: fontBody, padding: 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = palette.sand)}
                onMouseLeave={(e) => (e.currentTarget.style.color = palette.sandDim)}
              >
                {n}
              </button>
            ))}
          </nav>
          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:inline-block"
            style={{
              fontFamily: fontMono,
              fontSize: "12px",
              letterSpacing: "0.05em",
              color: palette.ink,
              background: palette.signal,
              border: "none",
              padding: "10px 18px",
              cursor: "pointer",
            }}
          >
            FREE BRAND AUDIT
          </button>
          <button className="md:hidden" onClick={() => setNavOpen(!navOpen)} style={{ background: "none", border: "none", color: palette.sand }}>
            <i className={navOpen ? "ti ti-x" : "ti ti-menu-2"} style={{ fontSize: "22px" }} aria-hidden="true" />
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden" style={{ padding: "0 24px 20px", display: "flex", flexDirection: "column", gap: "14px" }}>
            {nav.map((n) => (
              <button
                key={n}
                onClick={() => scrollTo(n.toLowerCase())}
                style={{ background: "none", border: "none", color: palette.sandDim, textAlign: "left", fontSize: "15px", padding: 0 }}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              style={{ fontFamily: fontMono, fontSize: "12px", color: palette.ink, background: palette.signal, border: "none", padding: "10px 16px", width: "fit-content" }}
            >
              FREE BRAND AUDIT
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section style={{ maxWidth: "1180px", margin: "0 auto", padding: "64px 24px 80px" }}>
        <div className="flex flex-col md:flex-row" style={{ alignItems: "center", gap: "48px" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Label>TRANSMISSION FROM KARACHI, PK</Label>
            <h1
              style={{
                fontFamily: fontDisplay,
                fontWeight: 600,
                fontSize: "clamp(36px, 6vw, 60px)",
                lineHeight: 1.04,
                margin: "22px 0 22px",
                color: palette.sand,
              }}
            >
              We build the digital
              <br />
              <span style={{ color: palette.rust }}>surface</span> your brand
              <br />
              actually deserves.
            </h1>
            <p style={{ fontFamily: fontBody, fontSize: "16.5px", lineHeight: 1.7, color: palette.sandDim, maxWidth: "460px", marginBottom: "32px" }}>
              Mars Digital Services is a Karachi-based creative agency combining CGI, branding, web and social into one full-stack
              build for businesses ready to look like they mean it online.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <button
                onClick={() => scrollTo("contact")}
                style={{
                  fontFamily: fontMono,
                  fontSize: "13px",
                  letterSpacing: "0.04em",
                  background: palette.rust,
                  color: palette.sand,
                  border: "none",
                  padding: "15px 26px",
                  cursor: "pointer",
                }}
              >
                GET YOUR FREE BRAND AUDIT
              </button>
              <button
                onClick={() => scrollTo("services")}
                style={{
                  fontFamily: fontMono,
                  fontSize: "13px",
                  letterSpacing: "0.04em",
                  background: "transparent",
                  color: palette.sand,
                  border: `1px solid ${palette.sandDim}55`,
                  padding: "15px 26px",
                  cursor: "pointer",
                }}
              >
                SEE WHAT WE BUILD
              </button>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", flex: "0 0 auto" }}>
            <Planet size={240} />
          </div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section style={{ borderTop: `1px solid ${palette.sandDim}22`, borderBottom: `1px solid ${palette.sandDim}22` }}>
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ maxWidth: "1180px", margin: "0 auto", padding: "0 24px" }}
        >
          {[
            ["4", "core disciplines"],
            ["100%", "in-house CGI capability"],
            ["KHI", "based, built for local + global clients"],
            ["1", "agency, full-stack delivery"],
          ].map(([num, label], i) => (
            <div key={i} style={{ padding: "26px 18px", borderRight: i % 2 === 0 ? `1px solid ${palette.sandDim}22` : "none" }}>
              <div style={{ fontFamily: fontDisplay, fontSize: "26px", color: palette.signal, fontWeight: 500 }}>{num}</div>
              <div style={{ fontFamily: fontMono, fontSize: "11px", color: palette.sandDim, marginTop: "6px", letterSpacing: "0.04em" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ maxWidth: "1180px", margin: "0 auto", padding: "96px 24px" }}>
        <Reveal>
          <Label>WHAT WE BUILD</Label>
          <h2 style={{ fontFamily: fontDisplay, fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 500, margin: "16px 0 48px", maxWidth: "640px" }}>
            One agency, everything you need to dominate online.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "1px", background: `${palette.sandDim}22` }}>
          {services.map((s, i) => (
            <ServiceCard key={s.title} index={i} {...s} />
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" style={{ background: palette.surface, borderTop: `1px solid ${palette.sandDim}22` }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "96px 24px" }}>
          <Reveal>
            <Label>HOW WE WORK</Label>
            <h2 style={{ fontFamily: fontDisplay, fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 500, margin: "16px 0 8px", maxWidth: "560px" }}>
              Strategy first, always.
            </h2>
            <p style={{ color: palette.sandDim, fontSize: "15px", maxWidth: "520px", marginBottom: "8px" }}>
              Great results don't happen by accident — here's how every project moves from idea to launch.
            </p>
          </Reveal>
          <div style={{ marginTop: "28px" }}>
            <ProcessStep n={1} title="Free brand audit" desc="We review your current presence and tell you exactly what's working, what isn't, and what's costing you customers." />
            <ProcessStep n={2} title="Strategy & scope" desc="We define the right mix of CGI, branding, web and social for your goals and budget, in plain language, no jargon." />
            <ProcessStep n={3} title="Build" desc="Design, render and develop happen in tight loops with you, not behind closed doors for six weeks." />
            <ProcessStep n={4} title="Launch & report" desc="You go live with a system you actually own, plus the reporting to know it's working." />
          </div>
        </div>
      </section>

      {/* CTA / AUDIT */}
      <section id="contact" style={{ maxWidth: "1180px", margin: "0 auto", padding: "96px 24px" }}>
        <Reveal>
          <div
            style={{
              border: `1px solid ${palette.rust}55`,
              padding: "56px 40px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", right: "-40px", top: "-40px", opacity: 0.25 }}>
              <Planet size={180} />
            </div>
            <div style={{ position: "relative", maxWidth: "560px" }}>
              <Label>NEW CLIENT OFFER</Label>
              <h2 style={{ fontFamily: fontDisplay, fontSize: "clamp(26px, 4vw, 34px)", fontWeight: 500, margin: "16px 0 14px" }}>
                Not sure why your business isn't growing online? We'll tell you, for free.
              </h2>
              <p style={{ color: palette.sandDim, fontSize: "15px", lineHeight: 1.7, marginBottom: "28px" }}>
                Book a free brand audit and get 20% off your first project when you sign on. No pressure, no generic
                report, just a straight read on what's holding your brand back.
              </p>
              <div className="flex flex-col sm:flex-row" style={{ gap: "12px" }}>
                <input
                  type="email"
                  placeholder="name@company.com"
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: `1px solid ${palette.sandDim}55`,
                    padding: "14px 16px",
                    color: palette.sand,
                    fontFamily: fontBody,
                    fontSize: "14px",
                  }}
                />
                <button
                  style={{
                    fontFamily: fontMono,
                    fontSize: "13px",
                    background: palette.rust,
                    color: palette.sand,
                    border: "none",
                    padding: "14px 24px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  REQUEST AUDIT
                </button>
              </div>
              <p style={{ fontFamily: fontMono, fontSize: "11px", color: palette.sandDim, marginTop: "16px" }}>
                OR DM @MARSDIGITALSERVICES ON INSTAGRAM
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CAREERS */}
      <section id="careers" style={{ background: palette.surface, borderTop: `1px solid ${palette.sandDim}22`, borderBottom: `1px solid ${palette.sandDim}22` }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "80px 24px" }}>
          <Reveal>
            <div className="flex flex-col md:flex-row" style={{ justifyContent: "space-between", alignItems: "flex-start", gap: "24px" }}>
              <div>
                <Label>WE'RE HIRING</Label>
                <h2 style={{ fontFamily: fontDisplay, fontSize: "26px", fontWeight: 500, margin: "16px 0 10px" }}>
                  Chat sales executive — morning shift
                </h2>
                <p style={{ color: palette.sandDim, fontSize: "14.5px", maxWidth: "480px", lineHeight: 1.7 }}>
                  Onsite in North Nazimabad, Karachi. 9 AM – 5 PM, full-time, salary plus commission. Looking for chat
                  sales experience on Discord, Twitch, Steam, X or Threads, and women are encouraged to apply.
                </p>
              </div>
              <button
                style={{
                  fontFamily: fontMono,
                  fontSize: "12px",
                  background: "transparent",
                  color: palette.signal,
                  border: `1px solid ${palette.signal}66`,
                  padding: "13px 20px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                VIEW OPEN ROLES <i className="ti ti-arrow-right" style={{ fontSize: "14px", verticalAlign: "-2px", marginLeft: "4px" }} aria-hidden="true" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ maxWidth: "1180px", margin: "0 auto", padding: "48px 24px 32px" }}>
        <div className="flex flex-col md:flex-row" style={{ justifyContent: "space-between", gap: "24px" }}>
          <div>
            <div style={{ fontFamily: fontDisplay, fontSize: "15px", fontWeight: 600, marginBottom: "8px" }}>MARS DIGITAL SERVICES</div>
            <p style={{ fontFamily: fontMono, fontSize: "11px", color: palette.sandDim }}>KARACHI, PAKISTAN</p>
          </div>
          <div style={{ display: "flex", gap: "24px", fontSize: "13px" }}>
            <a href="https://www.instagram.com/marsdigitalservices" style={{ color: palette.sandDim, textDecoration: "none" }}>
              Instagram
            </a>
            <button onClick={() => scrollTo("services")} style={{ background: "none", border: "none", color: palette.sandDim, cursor: "pointer", padding: 0 }}>
              Services
            </button>
            <button onClick={() => scrollTo("careers")} style={{ background: "none", border: "none", color: palette.sandDim, cursor: "pointer", padding: 0 }}>
              Careers
            </button>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${palette.sandDim}22`, marginTop: "32px", paddingTop: "20px", fontFamily: fontMono, fontSize: "11px", color: palette.sandDim }}>
          © {new Date().getFullYear()} MARS DIGITAL SERVICES
        </div>
      </footer>
    </div>
  );
}
