"use client";

import { useState, useEffect } from "react";

const N8N_WEBHOOK_URL = "https://your-n8n-instance.com/webhook/callvantage-contact";

function useReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  useReveal();

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    societe: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "callvantage-website",
          timestamp: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          prenom: "",
          nom: "",
          email: "",
          telephone: "",
          societe: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.875rem 1rem",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "4px",
    color: "#F8F9FA",
    fontFamily: "var(--font-inter), sans-serif",
    fontSize: "0.9rem",
    fontWeight: 300,
    outline: "none",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "0.4rem",
    fontSize: "0.8rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#8899AA",
    fontFamily: "var(--font-inter), sans-serif",
    fontWeight: 500,
  };

  return (
    <>
      {/* Hero */}
      <section
        style={{
          paddingTop: "9rem",
          paddingBottom: "5rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          background:
            "linear-gradient(160deg, #0A1628 0%, #0d1f3c 60%, #0A1628 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background circles */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          <div
            style={{
              position: "absolute",
              top: "-100px",
              right: "-100px",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              border: "1px solid rgba(201, 168, 76, 0.07)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-60px",
              left: "5%",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              border: "1px solid rgba(0, 168, 232, 0.06)",
            }}
          />
        </div>

        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#C9A84C",
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 500,
              marginBottom: "1rem",
              animation: "fadeIn 0.8s ease forwards",
            }}
          >
            Nous contacter
          </div>
          <h1
            style={{
              fontFamily: "var(--font-playfair-display), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#F8F9FA",
              marginBottom: "1rem",
              animation: "fadeInUp 0.9s ease 0.1s forwards",
              opacity: 0,
              lineHeight: 1.2,
            }}
          >
            Démarrons ensemble
          </h1>
          <div
            style={{
              width: "48px",
              height: "2px",
              background: "linear-gradient(90deg, #C9A84C, #E8D48B)",
              margin: "0 auto 1.25rem",
              animation: "fadeIn 0.8s ease 0.2s forwards",
              opacity: 0,
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "1rem",
              color: "#8899AA",
              lineHeight: 1.75,
              fontWeight: 300,
              maxWidth: "540px",
              margin: "0 auto",
              animation: "fadeInUp 0.9s ease 0.3s forwards",
              opacity: 0,
            }}
          >
            Décrivez votre besoin, nous vous répondons sous 24 heures avec un
            audit gratuit de votre cible et une estimation de volume.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section
        style={{
          padding: "5rem 1.5rem",
          background: "#0A1628",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Form */}
          <div className="reveal">
            <div
              style={{
                background: "linear-gradient(145deg, #0f1e35, #162340)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                padding: "3rem",
                position: "relative",
              }}
            >
              {/* Gold corners */}
              <div
                style={{
                  position: "absolute",
                  top: "-1px",
                  left: "-1px",
                  width: "24px",
                  height: "24px",
                  borderTop: "2px solid #C9A84C",
                  borderLeft: "2px solid #C9A84C",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-1px",
                  right: "-1px",
                  width: "24px",
                  height: "24px",
                  borderBottom: "2px solid #C9A84C",
                  borderRight: "2px solid #C9A84C",
                }}
              />

              <h2
                style={{
                  fontFamily:
                    "var(--font-playfair-display), Georgia, serif",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "#F8F9FA",
                  marginBottom: "0.5rem",
                }}
              >
                Votre message
              </h2>
              <div
                style={{
                  width: "36px",
                  height: "2px",
                  background: "linear-gradient(90deg, #C9A84C, #E8D48B)",
                  marginBottom: "2rem",
                }}
              />

              {status === "success" ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "3rem 2rem",
                  }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      background: "rgba(46, 204, 113, 0.1)",
                      border: "1px solid rgba(46, 204, 113, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1.5rem",
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#2ECC71"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3
                    style={{
                      fontFamily:
                        "var(--font-playfair-display), Georgia, serif",
                      fontSize: "1.35rem",
                      color: "#F8F9FA",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Message envoyé !
                  </h3>
                  <p
                    style={{
                      color: "#8899AA",
                      fontSize: "0.9rem",
                      lineHeight: 1.65,
                      fontFamily: "var(--font-inter), sans-serif",
                    }}
                  >
                    Nous vous répondrons sous 24 heures. En attendant, vous
                    pouvez aussi nous contacter directement sur WhatsApp.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Prénom + Nom */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                      marginBottom: "1.25rem",
                    }}
                    className="name-grid"
                  >
                    <div>
                      <label style={labelStyle} htmlFor="prenom">
                        Prénom *
                      </label>
                      <input
                        id="prenom"
                        name="prenom"
                        type="text"
                        required
                        value={formData.prenom}
                        onChange={handleChange}
                        placeholder="Jean"
                        style={inputStyle}
                        onFocus={(e) => {
                          (e.target as HTMLElement).style.borderColor =
                            "rgba(201, 168, 76, 0.5)";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLElement).style.borderColor =
                            "rgba(255,255,255,0.1)";
                        }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle} htmlFor="nom">
                        Nom *
                      </label>
                      <input
                        id="nom"
                        name="nom"
                        type="text"
                        required
                        value={formData.nom}
                        onChange={handleChange}
                        placeholder="Dupont"
                        style={inputStyle}
                        onFocus={(e) => {
                          (e.target as HTMLElement).style.borderColor =
                            "rgba(201, 168, 76, 0.5)";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLElement).style.borderColor =
                            "rgba(255,255,255,0.1)";
                        }}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={labelStyle} htmlFor="email">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jean.dupont@entreprise.fr"
                      style={inputStyle}
                      onFocus={(e) => {
                        (e.target as HTMLElement).style.borderColor =
                          "rgba(201, 168, 76, 0.5)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLElement).style.borderColor =
                          "rgba(255,255,255,0.1)";
                      }}
                    />
                  </div>

                  {/* Téléphone + Société */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                      marginBottom: "1.25rem",
                    }}
                    className="name-grid"
                  >
                    <div>
                      <label style={labelStyle} htmlFor="telephone">
                        Téléphone
                      </label>
                      <input
                        id="telephone"
                        name="telephone"
                        type="tel"
                        value={formData.telephone}
                        onChange={handleChange}
                        placeholder="+33 6 12 34 56 78"
                        style={inputStyle}
                        onFocus={(e) => {
                          (e.target as HTMLElement).style.borderColor =
                            "rgba(201, 168, 76, 0.5)";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLElement).style.borderColor =
                            "rgba(255,255,255,0.1)";
                        }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle} htmlFor="societe">
                        Société *
                      </label>
                      <input
                        id="societe"
                        name="societe"
                        type="text"
                        required
                        value={formData.societe}
                        onChange={handleChange}
                        placeholder="Votre cabinet"
                        style={inputStyle}
                        onFocus={(e) => {
                          (e.target as HTMLElement).style.borderColor =
                            "rgba(201, 168, 76, 0.5)";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLElement).style.borderColor =
                            "rgba(255,255,255,0.1)";
                        }}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: "2rem" }}>
                    <label style={labelStyle} htmlFor="message">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre besoin : volume de RDV souhaité, cible géographique, secteurs..."
                      rows={5}
                      style={{
                        ...inputStyle,
                        resize: "vertical",
                        minHeight: "120px",
                      }}
                      onFocus={(e) => {
                        (e.target as HTMLElement).style.borderColor =
                          "rgba(201, 168, 76, 0.5)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLElement).style.borderColor =
                          "rgba(255,255,255,0.1)";
                      }}
                    />
                  </div>

                  {status === "error" && (
                    <div
                      style={{
                        padding: "0.85rem 1rem",
                        background: "rgba(231, 76, 60, 0.1)",
                        border: "1px solid rgba(231, 76, 60, 0.3)",
                        borderRadius: "4px",
                        marginBottom: "1.25rem",
                        fontSize: "0.875rem",
                        color: "#E74C3C",
                        fontFamily: "var(--font-inter), sans-serif",
                      }}
                    >
                      Une erreur est survenue. Veuillez réessayer ou nous
                      contacter via WhatsApp.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    style={{
                      width: "100%",
                      padding: "0.95rem",
                      borderRadius: "4px",
                      background:
                        status === "sending"
                          ? "rgba(201, 168, 76, 0.5)"
                          : "linear-gradient(135deg, #C9A84C, #E8D48B)",
                      border: "none",
                      color: "#0A1628",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      cursor: status === "sending" ? "not-allowed" : "pointer",
                      letterSpacing: "0.02em",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {status === "sending" ? (
                      <>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          style={{
                            animation: "spin 1s linear infinite",
                          }}
                        >
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer le message
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            {/* WhatsApp card */}
            <div
              className="reveal-right"
              style={{
                background: "linear-gradient(145deg, #091a12, #0d2518)",
                border: "1px solid rgba(46, 204, 113, 0.2)",
                borderRadius: "8px",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg, #2ECC71, transparent)",
                }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-playfair-display), Georgia, serif",
                  fontSize: "1.15rem",
                  fontWeight: 600,
                  color: "#F8F9FA",
                  marginBottom: "0.5rem",
                }}
              >
                Réponse immédiate
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#8899AA",
                  lineHeight: 1.6,
                  marginBottom: "1.25rem",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 300,
                }}
              >
                Pour une réponse rapide, contactez-nous directement sur
                WhatsApp.
              </p>
              <a
                href="https://wa.me/212664860353"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "4px",
                  background: "#2ECC71",
                  color: "white",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  width: "100%",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "#27ae60";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "#2ECC71";
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                +212 664 860 353
              </a>
            </div>

            {/* Address card */}
            <div
              className="reveal-right"
              style={{
                background: "linear-gradient(145deg, #0f1e35, #162340)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "8px",
                padding: "2rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg, #C9A84C, transparent)",
                }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-playfair-display), Georgia, serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#F8F9FA",
                  marginBottom: "1.25rem",
                }}
              >
                Adresse
              </h3>
              <div
                style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="2"
                  style={{ flexShrink: 0, marginTop: "2px" }}
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#CED4DA",
                      lineHeight: 1.7,
                      fontFamily: "var(--font-inter), sans-serif",
                      fontWeight: 300,
                      margin: 0,
                    }}
                  >
                    Gueliz - Av Yacoub el Mansour
                    <br />
                    Immeuble Amitaf B, Bureau 6
                    <br />
                    Marrakech, 40000
                    <br />
                    <span style={{ color: "#8899AA" }}>Maroc</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Commitment card */}
            <div
              className="reveal-right"
              style={{
                background: "linear-gradient(145deg, #0f1825, #121f32)",
                border: "1px solid rgba(0, 168, 232, 0.15)",
                borderRadius: "8px",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg, #00A8E8, transparent)",
                }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-playfair-display), Georgia, serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#F8F9FA",
                  marginBottom: "1.25rem",
                }}
              >
                Nos engagements
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.65rem",
                }}
              >
                {[
                  "Réponse sous 24h",
                  "Audit cible gratuit",
                  "Sans engagement initial",
                  "Tarif au résultat",
                ].map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: "0.65rem",
                      fontSize: "0.875rem",
                      color: "#8899AA",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#00A8E8"
                      strokeWidth="2.5"
                      style={{ flexShrink: 0, marginTop: "2px" }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 500px) {
          .name-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
