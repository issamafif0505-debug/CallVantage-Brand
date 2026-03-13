"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#060f1c",
        borderTop: "1px solid rgba(201, 168, 76, 0.15)",
        padding: "4rem 1.5rem 2rem",
        color: "#CED4DA",
        fontFamily: "var(--font-inter), sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Top row — 3 columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand column */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-playfair-display), Georgia, serif",
                fontSize: "1.375rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: "#F8F9FA",
                marginBottom: "1rem",
              }}
            >
              CALL<span style={{ color: "#C9A84C" }}>&apos;</span>VANTAGE
            </div>
            <div
              style={{
                width: "40px",
                height: "2px",
                background: "linear-gradient(90deg, #C9A84C, #E8D48B)",
                marginBottom: "1rem",
              }}
            />
            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: "1.7",
                color: "#8899AA",
                maxWidth: "280px",
              }}
            >
              Centre d&apos;appels B2B spécialisé dans la génération de
              rendez-vous qualifiés pour les courtiers en énergie sur le marché
              français.
            </p>
            <p
              style={{
                fontSize: "0.8rem",
                marginTop: "1rem",
                color: "#C9A84C",
                fontStyle: "italic",
              }}
            >
              &ldquo;Si le RDV n&apos;est pas qualifié, il n&apos;est pas
              facturé.&rdquo;
            </p>
          </div>

          {/* Liens utiles */}
          <div>
            <h4
              style={{
                color: "#F8F9FA",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Liens utiles
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {[
                { label: "Accueil", href: "/" },
                { label: "Notre offre", href: "/#offre" },
                { label: "Notre processus", href: "/#processus" },
                { label: "Notre garantie", href: "/#garantie" },
                { label: "Nous contacter", href: "/contact/" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      color: "#8899AA",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      transition: "color 0.2s ease",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = "#C9A84C";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = "#8899AA";
                    }}
                  >
                    <span style={{ color: "#C9A84C", fontSize: "0.6rem" }}>▸</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                color: "#F8F9FA",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Contact
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {/* Address */}
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="2"
                  style={{ flexShrink: 0, marginTop: "2px" }}
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span style={{ fontSize: "0.85rem", lineHeight: "1.6", color: "#8899AA" }}>
                  Gueliz - Av Yacoub el Mansour<br />
                  Immeuble Amitaf B, Bureau 6<br />
                  Marrakech, 40000 — Maroc
                </span>
              </div>

              {/* WhatsApp */}
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#C9A84C"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <a
                  href="https://wa.me/212664860353"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#8899AA",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = "#C9A84C";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = "#8899AA";
                  }}
                >
                  +212 664 860 353
                </a>
              </div>

              {/* CTA */}
              <a
                href="/contact/"
                style={{
                  display: "inline-block",
                  marginTop: "0.5rem",
                  padding: "0.6rem 1.25rem",
                  borderRadius: "4px",
                  border: "1px solid rgba(201, 168, 76, 0.4)",
                  color: "#C9A84C",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  width: "fit-content",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(201, 168, 76, 0.1)";
                  el.style.borderColor = "#C9A84C";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "transparent";
                  el.style.borderColor = "rgba(201, 168, 76, 0.4)";
                }}
              >
                Prendre contact →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span style={{ fontSize: "0.8rem", color: "#445566" }}>
            © {currentYear} CALL&apos;VANTAGE — Tous droits réservés
          </span>
          <span style={{ fontSize: "0.8rem", color: "#445566" }}>
            Marrakech, Maroc · Marché français
          </span>
        </div>
      </div>
    </footer>
  );
}
