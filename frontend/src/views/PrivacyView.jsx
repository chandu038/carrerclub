import { useNavigate } from "react-router-dom";

export default function PrivacyView({ T, isMobile }) {
  const navigate = useNavigate();

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 17, fontWeight: 700, color: T.text, marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: `1px solid ${T.border}` }}>
        {title}
      </div>
      <div style={{ fontSize: 14, color: T.text2, lineHeight: 1.8 }}>{children}</div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "'Satoshi',sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: isMobile ? "2rem 1.25rem" : "3rem 2rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: T.a3, fontSize: 13, cursor: "pointer", fontFamily: "'Satoshi',sans-serif", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 6, padding: 0 }}>
            ← Back to Home
          </button>
          <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: isMobile ? 28 : 36, fontWeight: 700, color: T.text, marginBottom: "0.5rem" }}>
            Privacy Policy
          </div>
          <div style={{ fontSize: 13, color: T.text3 }}>Last updated: March 2025</div>
        </div>

        <div style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 16, padding: isMobile ? "1.5rem" : "2rem" }}>

          <Section title="1. Introduction">
            Welcome to CarrerClub ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our website carrerclub.in.
          </Section>

          <Section title="2. Information We Collect">
            We collect information you provide directly to us, such as when you create an account, subscribe to job alerts, or contact us. This may include:
            <ul style={{ marginTop: "0.75rem", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: 6 }}>
              <li>Email address (for job alerts)</li>
              <li>Name and contact details</li>
              <li>Job preferences and search history</li>
              <li>Device information and IP address</li>
              <li>Browser type and usage data via cookies</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            We use the information we collect to:
            <ul style={{ marginTop: "0.75rem", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: 6 }}>
              <li>Provide, maintain, and improve our services</li>
              <li>Send job alerts and relevant notifications</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze usage patterns</li>
              <li>Serve relevant advertisements via Google AdSense</li>
            </ul>
          </Section>

          <Section title="4. Google AdSense & Cookies">
            We use Google AdSense to display advertisements. Google uses cookies to serve ads based on your prior visits to our website or other websites. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" style={{ color: T.a3 }}>Google Ads Settings</a>. We also use cookies to improve your experience on our site.
          </Section>

          <Section title="5. Third-Party Services">
            We use the following third-party services:
            <ul style={{ marginTop: "0.75rem", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: 6 }}>
              <li><strong style={{ color: T.text }}>Firebase</strong> — for database and authentication</li>
              <li><strong style={{ color: T.text }}>Google AdSense</strong> — for displaying advertisements</li>
              <li><strong style={{ color: T.text }}>Vercel</strong> — for hosting</li>
            </ul>
            These services have their own privacy policies governing the use of your information.
          </Section>

          <Section title="6. Data Security">
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure and we cannot guarantee absolute security.
          </Section>

          <Section title="7. Children's Privacy">
            Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13.
          </Section>

          <Section title="8. Changes to This Policy">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date.
          </Section>

          <Section title="9. Contact Us">
            If you have any questions about this Privacy Policy, please contact us at:
            <div style={{ marginTop: "0.75rem", padding: "1rem", background: T.bg3, borderRadius: 10, border: `1px solid ${T.border2}` }}>
              <div>📧 Email: <a href="mailto:darapanenic1@gmail.com" style={{ color: T.a3 }}>darapanenic1@gmail.com</a></div>
              <div style={{ marginTop: 6 }}>✈️ Telegram: <a href="https://t.me/undefined890" target="_blank" rel="noreferrer" style={{ color: T.a3 }}>@undefined890</a></div>
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
}