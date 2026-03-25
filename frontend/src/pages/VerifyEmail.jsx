




import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import api from "../utils/axiosClient";

/* ── Inline styles matching LPU Quora design language ── */
const S = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Nunito', sans-serif",
  },

  /* ── Navbar ── */
  nav: {
    background: "#ffffff",
    borderBottom: "3px solid #f26522",
    padding: "0 32px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 2px 8px rgba(242,101,34,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  navLogo: {
    width: 40,
    height: 40,
    background: "#f26522",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 800,
    fontSize: 13,
    flexShrink: 0,
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: "#f26522",
    letterSpacing: "-0.5px",
  },

  /* ── Center wrapper ── */
  center: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
  },

  /* ── Card ── */
  card: {
    background: "#ffffff",
    borderRadius: 14,
    borderLeft: "4px solid #f26522",
    boxShadow: "0 4px 24px rgba(0,0,0,0.09)",
    padding: "40px 44px",
    width: "100%",
    maxWidth: 460,
  },

  /* ── Icon circle ── */
  iconWrap: {
    width: 64,
    height: 64,
    background: "#fff4ee",
    border: "2px solid #fbd5bc",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    fontSize: 28,
  },

  heading: {
    fontSize: 22,
    fontWeight: 800,
    color: "#1a1a2e",
    textAlign: "center",
    marginBottom: 6,
  },

  subtext: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 1.5,
  },

  emailBadge: {
    display: "inline-block",
    background: "#fff4ee",
    color: "#f26522",
    fontWeight: 700,
    fontSize: 13,
    padding: "2px 10px",
    borderRadius: 6,
    border: "1px solid #fbd5bc",
  },

  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 700,
    color: "#374151",
    marginBottom: 6,
    letterSpacing: "0.03em",
  },

  inputRow: {
    display: "flex",
    gap: 10,
    marginBottom: 8,
  },

  input: {
    flex: 1,
    padding: "11px 16px",
    border: "1.5px solid #e5e7eb",
    borderRadius: 8,
    fontSize: 15,
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 600,
    color: "#1a1a2e",
    outline: "none",
    letterSpacing: "0.12em",
    transition: "border-color 0.18s",
  },

  btnPrimary: {
    padding: "11px 22px",
    background: "#f26522",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 800,
    fontFamily: "'Nunito', sans-serif",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "background 0.18s, transform 0.15s",
  },

  errorBox: {
    marginTop: 14,
    background: "#fef2f2",
    border: "1.5px solid #fca5a5",
    borderRadius: 8,
    padding: "10px 14px",
    color: "#dc2626",
    fontSize: 13,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  /* ── Fallback (no email) card ── */
  fallbackCard: {
    background: "#ffffff",
    borderRadius: 14,
    borderLeft: "4px solid #f26522",
    boxShadow: "0 4px 24px rgba(0,0,0,0.09)",
    padding: "40px 44px",
    width: "100%",
    maxWidth: 420,
    textAlign: "center",
  },
  fallbackIcon: {
    fontSize: 40,
    marginBottom: 14,
  },
  fallbackHeading: {
    fontSize: 20,
    fontWeight: 800,
    color: "#1a1a2e",
    marginBottom: 8,
  },
  fallbackDesc: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 24,
  },
  btnOutline: {
    padding: "10px 24px",
    background: "transparent",
    color: "#f26522",
    border: "2px solid #f26522",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 800,
    fontFamily: "'Nunito', sans-serif",
    cursor: "pointer",
    transition: "background 0.18s",
  },
};

/* ── Google Font loader (injected once) ── */
if (typeof document !== "undefined" && !document.getElementById("lpu-font")) {
  const link = document.createElement("link");
  link.id = "lpu-font";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap";
  document.head.appendChild(link);
}

/* ════════════════════════════════════════════
   Component — all logic unchanged
════════════════════════════════════════════ */
export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email; // ✅ safe access
  const emailId = location.state?.email;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  /* ── Navbar shared across both states ── */
  const Navbar = (
    <nav style={S.nav}>
      <div style={S.navLogo}>LPU</div>
      <span style={S.navTitle}>AlgoJudge</span>
    </nav>
  );

  // 🚨 handle direct access / refresh
  if (!email) {
    return (
      <div style={S.page}>
        {Navbar}
        <div style={S.center}>
          <div style={S.fallbackCard}>
            <div style={S.fallbackIcon}>📭</div>
            <h2 style={S.fallbackHeading}>No Email Found</h2>
            <p style={S.fallbackDesc}>Please register again to receive a new OTP.</p>
            <button
              style={S.btnOutline}
              onMouseEnter={(e) => (e.target.style.background = "#fff4ee")}
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
              onClick={() => navigate("/register")}
            >
              Go to Register
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleVerify = async () => {
    try {
      const res = await api.post("/user/verify-otp", {
        emailId,
        otp,
      });

      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div style={S.page}>
      {Navbar}

      <div style={S.center}>
        <div style={S.card}>
          {/* Icon */}
          <div style={S.iconWrap}>✉️</div>

          {/* Heading */}
          <h2 style={S.heading}>Verify Your Email</h2>
          <p style={S.subtext}>
            We sent a 6-digit OTP to&nbsp;
            <span style={S.emailBadge}>{email}</span>
            <br />
            Enter it below to activate your account.
          </p>

          {/* OTP Input + Button */}
          <label style={S.label} htmlFor="otp-input">
            One-Time Password
          </label>
          <div style={S.inputRow}>
            <input
              id="otp-input"
              style={S.input}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              maxLength={6}
              onFocus={(e) => (e.target.style.borderColor = "#f26522")}
              onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
            />
            <button
              style={S.btnPrimary}
              onMouseEnter={(e) => {
                e.target.style.background = "#d9541a";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#f26522";
                e.target.style.transform = "translateY(0)";
              }}
              onClick={handleVerify}
         >
              Verify
            </button>
          </div>



         
          {error && (
            <div style={S.errorBox}>
              <span>⚠️</span>
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



