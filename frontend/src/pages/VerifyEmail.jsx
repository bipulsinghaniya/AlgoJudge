




// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router";
// import api from "../utils/axiosClient";

// /* ── Inline styles matching LPU Quora design language ── */
// const S = {
//   page: {
//     minHeight: "100vh",
//     background: "#f4f6f8",
//     display: "flex",
//     flexDirection: "column",
//     fontFamily: "'Nunito', sans-serif",
//   },

//   /* ── Navbar ── */
//   nav: {
//     background: "#ffffff",
//     borderBottom: "3px solid #f26522",
//     padding: "0 32px",
//     height: "64px",
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     boxShadow: "0 2px 8px rgba(242,101,34,0.08)",
//     position: "sticky",
//     top: 0,
//     zIndex: 100,
//   },
//   navLogo: {
//     width: 40,
//     height: 40,
//     background: "#f26522",
//     borderRadius: "50%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "#fff",
//     fontWeight: 800,
//     fontSize: 13,
//     flexShrink: 0,
//   },
//   navTitle: {
//     fontSize: 20,
//     fontWeight: 800,
//     color: "#f26522",
//     letterSpacing: "-0.5px",
//   },

//   /* ── Center wrapper ── */
//   center: {
//     flex: 1,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "40px 20px",
//   },

//   /* ── Card ── */
//   card: {
//     background: "#ffffff",
//     borderRadius: 14,
//     borderLeft: "4px solid #f26522",
//     boxShadow: "0 4px 24px rgba(0,0,0,0.09)",
//     padding: "40px 44px",
//     width: "100%",
//     maxWidth: 460,
//   },

//   /* ── Icon circle ── */
//   iconWrap: {
//     width: 64,
//     height: 64,
//     background: "#fff4ee",
//     border: "2px solid #fbd5bc",
//     borderRadius: "50%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     margin: "0 auto 20px",
//     fontSize: 28,
//   },

//   heading: {
//     fontSize: 22,
//     fontWeight: 800,
//     color: "#1a1a2e",
//     textAlign: "center",
//     marginBottom: 6,
//   },

//   subtext: {
//     fontSize: 14,
//     color: "#6b7280",
//     textAlign: "center",
//     marginBottom: 28,
//     lineHeight: 1.5,
//   },

//   emailBadge: {
//     display: "inline-block",
//     background: "#fff4ee",
//     color: "#f26522",
//     fontWeight: 700,
//     fontSize: 13,
//     padding: "2px 10px",
//     borderRadius: 6,
//     border: "1px solid #fbd5bc",
//   },

//   label: {
//     display: "block",
//     fontSize: 13,
//     fontWeight: 700,
//     color: "#374151",
//     marginBottom: 6,
//     letterSpacing: "0.03em",
//   },

//   inputRow: {
//     display: "flex",
//     gap: 10,
//     marginBottom: 8,
//   },

//   input: {
//     flex: 1,
//     padding: "11px 16px",
//     border: "1.5px solid #e5e7eb",
//     borderRadius: 8,
//     fontSize: 15,
//     fontFamily: "'Nunito', sans-serif",
//     fontWeight: 600,
//     color: "#1a1a2e",
//     outline: "none",
//     letterSpacing: "0.12em",
//     transition: "border-color 0.18s",
//   },

//   btnPrimary: {
//     padding: "11px 22px",
//     background: "#f26522",
//     color: "#fff",
//     border: "none",
//     borderRadius: 8,
//     fontSize: 15,
//     fontWeight: 800,
//     fontFamily: "'Nunito', sans-serif",
//     cursor: "pointer",
//     whiteSpace: "nowrap",
//     transition: "background 0.18s, transform 0.15s",
//   },

//   errorBox: {
//     marginTop: 14,
//     background: "#fef2f2",
//     border: "1.5px solid #fca5a5",
//     borderRadius: 8,
//     padding: "10px 14px",
//     color: "#dc2626",
//     fontSize: 13,
//     fontWeight: 600,
//     display: "flex",
//     alignItems: "center",
//     gap: 8,
//   },

//   /* ── Fallback (no email) card ── */
//   fallbackCard: {
//     background: "#ffffff",
//     borderRadius: 14,
//     borderLeft: "4px solid #f26522",
//     boxShadow: "0 4px 24px rgba(0,0,0,0.09)",
//     padding: "40px 44px",
//     width: "100%",
//     maxWidth: 420,
//     textAlign: "center",
//   },
//   fallbackIcon: {
//     fontSize: 40,
//     marginBottom: 14,
//   },
//   fallbackHeading: {
//     fontSize: 20,
//     fontWeight: 800,
//     color: "#1a1a2e",
//     marginBottom: 8,
//   },
//   fallbackDesc: {
//     fontSize: 14,
//     color: "#6b7280",
//     marginBottom: 24,
//   },
//   btnOutline: {
//     padding: "10px 24px",
//     background: "transparent",
//     color: "#f26522",
//     border: "2px solid #f26522",
//     borderRadius: 8,
//     fontSize: 14,
//     fontWeight: 800,
//     fontFamily: "'Nunito', sans-serif",
//     cursor: "pointer",
//     transition: "background 0.18s",
//   },
// };

// /* ── Google Font loader (injected once) ── */
// if (typeof document !== "undefined" && !document.getElementById("lpu-font")) {
//   const link = document.createElement("link");
//   link.id = "lpu-font";
//   link.rel = "stylesheet";
//   link.href =
//     "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap";
//   document.head.appendChild(link);
// }

// /* ════════════════════════════════════════════
//    Component — all logic unchanged
// ════════════════════════════════════════════ */
// export default function VerifyEmail() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const email = location.state?.email; // ✅ safe access
//   const emailId = location.state?.email;

//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");

//   /* ── Navbar shared across both states ── */
//   const Navbar = (
//     <nav style={S.nav}>
//       <div style={S.navLogo}>LPU</div>
//       <span style={S.navTitle}>AlgoJudge</span>
//     </nav>
//   );

//   // 🚨 handle direct access / refresh
//   if (!email) {
//     return (
//       <div style={S.page}>
//         {Navbar}
//         <div style={S.center}>
//           <div style={S.fallbackCard}>
//             <div style={S.fallbackIcon}>📭</div>
//             <h2 style={S.fallbackHeading}>No Email Found</h2>
//             <p style={S.fallbackDesc}>Please register again to receive a new OTP.</p>
//             <button
//               style={S.btnOutline}
//               onMouseEnter={(e) => (e.target.style.background = "#fff4ee")}
//               onMouseLeave={(e) => (e.target.style.background = "transparent")}
//               onClick={() => navigate("/register")}
//             >
//               Go to Register
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const handleVerify = async () => {
//     try {
//       const res = await api.post("/user/verify-otp", {
//         emailId,
//         otp,
//       });

//       alert(res.data.message);
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.message || "Verification failed");
//     }
//   };

//   return (
//     <div style={S.page}>
//       {Navbar}

//       <div style={S.center}>
//         <div style={S.card}>
//           {/* Icon */}
//           <div style={S.iconWrap}>✉️</div>

//           {/* Heading */}
//           <h2 style={S.heading}>Verify Your Email</h2>
//           <p style={S.subtext}>
//             We sent a 6-digit OTP to&nbsp;
//             <span style={S.emailBadge}>{email}</span>
//             <br />
//             Enter it below to activate your account.
//           </p>

//           {/* OTP Input + Button */}
//           <label style={S.label} htmlFor="otp-input">
//             One-Time Password
//           </label>
//           <div style={S.inputRow}>
//             <input
//               id="otp-input"
//               style={S.input}
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="Enter OTP"
//               maxLength={6}
//               onFocus={(e) => (e.target.style.borderColor = "#f26522")}
//               onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
//             />
//             <button
//               style={S.btnPrimary}
//               onMouseEnter={(e) => {
//                 e.target.style.background = "#d9541a";
//                 e.target.style.transform = "translateY(-1px)";
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.background = "#f26522";
//                 e.target.style.transform = "translateY(0)";
//               }}
//               onClick={handleVerify}
//          >
//               Verify
//             </button>
//           </div>



         
//           {error && (
//             <div style={S.errorBox}>
//               <span>⚠️</span>
//               {error}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

















// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router";
// import api from "../utils/axiosClient";

// /* ── Google Fonts ── */
// if (typeof document !== "undefined" && !document.getElementById("aj-fonts")) {
//   const link = document.createElement("link");
//   link.id = "aj-fonts";
//   link.rel = "stylesheet";
//   link.href =
//     "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@400;600;800&display=swap";
//   document.head.appendChild(link);
// }

// /* ── Inject CSS once ── */
// if (typeof document !== "undefined" && !document.getElementById("aj-verify-styles")) {
//   const style = document.createElement("style");
//   style.id = "aj-verify-styles";
//   style.textContent = `
//     .aj-page {
//       min-height: 100vh;
//       background-color: #0a0a0f;
//       background-image:
//         radial-gradient(ellipse 70% 50% at 50% -10%, rgba(99,102,241,0.13) 0%, transparent 60%),
//         radial-gradient(ellipse 50% 40% at 90% 110%, rgba(16,185,129,0.07) 0%, transparent 60%),
//         linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
//         linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px);
//       background-size: 100% 100%, 100% 100%, 40px 40px, 40px 40px;
//       display: flex;
//       flex-direction: column;
//       font-family: 'Syne', sans-serif;
//     }

//     /* ── Navbar ── */
//     .aj-nav {
//       background: rgba(10,10,20,0.9);
//       border-bottom: 1px solid rgba(99,102,241,0.2);
//       padding: 0 2rem;
//       height: 60px;
//       display: flex;
//       align-items: center;
//       gap: 10px;
//       position: sticky;
//       top: 0;
//       z-index: 100;
//       backdrop-filter: blur(10px);
//     }
//     .aj-nav::after {
//       content: '';
//       position: absolute;
//       bottom: 0; left: 0; right: 0;
//       height: 1px;
//       background: linear-gradient(90deg, transparent, #6366f1, #10b981, transparent);
//     }
//     .aj-nav-icon {
//       width: 32px; height: 32px;
//       background: linear-gradient(135deg, #6366f1, #10b981);
//       border-radius: 4px;
//       display: flex; align-items: center; justify-content: center;
//       flex-shrink: 0;
//     }
//     .aj-nav-icon svg {
//       width: 16px; height: 16px;
//       fill: none; stroke: white; stroke-width: 2;
//     }
//     .aj-nav-title {
//       font-family: 'Syne', sans-serif;
//       font-weight: 800;
//       font-size: 1.1rem;
//       color: #f1f5f9;
//       letter-spacing: -0.02em;
//     }

//     /* ── Center ── */
//     .aj-center {
//       flex: 1;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       padding: 2.5rem 1rem;
//     }

//     /* ── Card ── */
//     .aj-verify-card {
//       width: 100%;
//       max-width: 440px;
//       background: rgba(15,15,25,0.95);
//       border: 1px solid rgba(99,102,241,0.25);
//       border-radius: 2px;
//       box-shadow:
//         0 0 0 1px rgba(99,102,241,0.05),
//         0 20px 60px rgba(0,0,0,0.6),
//         inset 0 1px 0 rgba(255,255,255,0.04);
//       padding: 2.5rem;
//       position: relative;
//       overflow: hidden;
//     }
//     .aj-verify-card::before {
//       content: '';
//       position: absolute;
//       top: 0; left: 0; right: 0;
//       height: 2px;
//       background: linear-gradient(90deg, transparent, #6366f1, #10b981, transparent);
//     }
//     .aj-verify-card::after {
//       content: '';
//       position: absolute;
//       top: -60px; right: -60px;
//       width: 180px; height: 180px;
//       background: radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%);
//       pointer-events: none;
//     }

//     /* ── Icon ── */
//     .aj-icon-wrap {
//       width: 56px; height: 56px;
//       background: rgba(99,102,241,0.08);
//       border: 1px solid rgba(99,102,241,0.2);
//       border-radius: 2px;
//       display: flex; align-items: center; justify-content: center;
//       margin: 0 auto 1.25rem;
//       font-size: 1.5rem;
//     }

//     .aj-heading {
//       font-family: 'Syne', sans-serif;
//       font-weight: 800;
//       font-size: 1.4rem;
//       color: #f1f5f9;
//       text-align: center;
//       margin-bottom: 0.4rem;
//       letter-spacing: -0.02em;
//     }

//     .aj-subtext {
//       font-family: 'JetBrains Mono', monospace;
//       font-size: 0.7rem;
//       color: #64748b;
//       text-align: center;
//       margin-bottom: 2rem;
//       line-height: 1.7;
//       letter-spacing: 0.01em;
//     }

//     .aj-email-badge {
//       display: inline-block;
//       background: rgba(99,102,241,0.1);
//       color: #818cf8;
//       font-weight: 600;
//       font-size: 0.7rem;
//       padding: 2px 8px;
//       border-radius: 2px;
//       border: 1px solid rgba(99,102,241,0.25);
//       font-family: 'JetBrains Mono', monospace;
//     }

//     .aj-otp-label {
//       display: block;
//       font-family: 'JetBrains Mono', monospace;
//       font-size: 0.65rem;
//       letter-spacing: 0.1em;
//       text-transform: uppercase;
//       color: #64748b;
//       margin-bottom: 0.4rem;
//     }

//     .aj-input-row {
//       display: flex;
//       gap: 8px;
//     }

//     .aj-otp-input {
//       flex: 1;
//       background: rgba(255,255,255,0.03);
//       border: 1px solid rgba(99,102,241,0.2);
//       border-radius: 2px;
//       color: #e2e8f0;
//       font-family: 'JetBrains Mono', monospace;
//       font-size: 1rem;
//       font-weight: 600;
//       letter-spacing: 0.25em;
//       padding: 0.65rem 0.875rem;
//       outline: none;
//       transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
//       box-sizing: border-box;
//     }
//     .aj-otp-input:focus {
//       border-color: #6366f1;
//       background: rgba(99,102,241,0.04);
//       box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
//     }
//     .aj-otp-input::placeholder { color: #334155; letter-spacing: 0.05em; }

//     .aj-verify-btn {
//       padding: 0.65rem 1.25rem;
//       background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
//       color: #fff;
//       border: none;
//       border-radius: 2px;
//       font-family: 'Syne', sans-serif;
//       font-weight: 600;
//       font-size: 0.875rem;
//       letter-spacing: 0.04em;
//       cursor: pointer;
//       white-space: nowrap;
//       transition: box-shadow 0.15s, transform 0.1s;
//       box-shadow: 0 4px 18px rgba(99,102,241,0.3);
//     }
//     .aj-verify-btn:hover {
//       box-shadow: 0 6px 26px rgba(99,102,241,0.45);
//       transform: translateY(-1px);
//     }
//     .aj-verify-btn:active { transform: translateY(0); }

//     .aj-error-box {
//       margin-top: 1rem;
//       background: rgba(239,68,68,0.07);
//       border: 1px solid rgba(239,68,68,0.2);
//       border-radius: 2px;
//       padding: 0.6rem 0.875rem;
//       color: #ef4444;
//       font-family: 'JetBrains Mono', monospace;
//       font-size: 0.7rem;
//       display: flex;
//       align-items: center;
//       gap: 6px;
//       letter-spacing: 0.02em;
//     }

//     /* ── Fallback card ── */
//     .aj-fallback-card {
//       width: 100%;
//       max-width: 400px;
//       background: rgba(15,15,25,0.95);
//       border: 1px solid rgba(99,102,241,0.25);
//       border-radius: 2px;
//       box-shadow:
//         0 0 0 1px rgba(99,102,241,0.05),
//         0 20px 60px rgba(0,0,0,0.6);
//       padding: 2.5rem;
//       text-align: center;
//       position: relative;
//       overflow: hidden;
//     }
//     .aj-fallback-card::before {
//       content: '';
//       position: absolute;
//       top: 0; left: 0; right: 0;
//       height: 2px;
//       background: linear-gradient(90deg, transparent, #6366f1, #10b981, transparent);
//     }

//     .aj-fallback-icon {
//       font-size: 2.5rem;
//       margin-bottom: 1rem;
//     }
//     .aj-fallback-heading {
//       font-family: 'Syne', sans-serif;
//       font-weight: 800;
//       font-size: 1.2rem;
//       color: #f1f5f9;
//       margin-bottom: 0.5rem;
//     }
//     .aj-fallback-desc {
//       font-family: 'JetBrains Mono', monospace;
//       font-size: 0.7rem;
//       color: #64748b;
//       margin-bottom: 1.75rem;
//       letter-spacing: 0.02em;
//       line-height: 1.6;
//     }
//     .aj-outline-btn {
//       padding: 0.65rem 1.5rem;
//       background: transparent;
//       color: #6366f1;
//       border: 1px solid rgba(99,102,241,0.4);
//       border-radius: 2px;
//       font-family: 'Syne', sans-serif;
//       font-weight: 600;
//       font-size: 0.875rem;
//       letter-spacing: 0.04em;
//       cursor: pointer;
//       transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
//     }
//     .aj-outline-btn:hover {
//       background: rgba(99,102,241,0.08);
//       border-color: #6366f1;
//       box-shadow: 0 0 12px rgba(99,102,241,0.15);
//     }
//   `;
//   document.head.appendChild(style);
// }

// /* ════════════════════════════════════════════
//    Component — all logic unchanged
// ════════════════════════════════════════════ */
// export default function VerifyEmail() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const email = location.state?.email;
//   const emailId = location.state?.email;

//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");

//   const Navbar = (
//     <nav className="aj-nav">
//       <div className="aj-nav-icon">
//         <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M8 3L4 12l4 9M16 3l4 9-4 9M5 9h14M5 15h14"/>
//         </svg>
//       </div>
//       <span className="aj-nav-title">AlgoJudge</span>
//     </nav>
//   );

//   // 🚨 handle direct access / refresh
//   if (!email) {
//     return (
//       <div className="aj-page">
//         {Navbar}
//         <div className="aj-center">
//           <div className="aj-fallback-card">
//             <div className="aj-fallback-icon">📭</div>
//             <h2 className="aj-fallback-heading">No Email Found</h2>
//             <p className="aj-fallback-desc">Please register again to receive a new OTP.</p>
//             <button
//               className="aj-outline-btn"
//               onClick={() => navigate("/register")}
//             >
//               Go to Register
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const handleVerify = async () => {
//     try {
//       const res = await api.post("/user/verify-otp", {
//         emailId,
//         otp,
//       });

//       alert(res.data.message);
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.message || "Verification failed");
//     }
//   };

//   return (
//     <div className="aj-page">
//       {Navbar}

//       <div className="aj-center">
//         <div className="aj-verify-card">
//           <div className="aj-icon-wrap">✉️</div>

//           <h2 className="aj-heading">Verify Your Email</h2>
//           <p className="aj-subtext">
//             We sent a 6-digit OTP to&nbsp;
//             <span className="aj-email-badge">{email}</span>
//             <br />
//             Enter it below to activate your account.
//           </p>

//           <label className="aj-otp-label" htmlFor="otp-input">
//             One-Time Password
//           </label>
//           <div className="aj-input-row">
//             <input
//               id="otp-input"
//               className="aj-otp-input"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="Enter OTP"
//               maxLength={6}
//             />
//             <button
//               className="aj-verify-btn"
//               onClick={handleVerify}
//             >
//               Verify
//             </button>
//           </div>

//           {error && (
//             <div className="aj-error-box">
//               <span>⚠</span>
//               {error}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }







import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import api from "../utils/axiosClient";

/* ── Google Fonts ── */
if (typeof document !== "undefined" && !document.getElementById("aj-fonts")) {
  const link = document.createElement("link");
  link.id = "aj-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@400;600;800&display=swap";
  document.head.appendChild(link);
}

/* ── Inject CSS once ── */
if (typeof document !== "undefined" && !document.getElementById("aj-verify-styles")) {
  const style = document.createElement("style");
  style.id = "aj-verify-styles";
  style.textContent = `
    .aj-page {
      min-height: 100vh;
      background-color: #0a0a0f;
      background-image:
        radial-gradient(ellipse 70% 50% at 50% -10%, rgba(99,102,241,0.13) 0%, transparent 60%),
        radial-gradient(ellipse 50% 40% at 90% 110%, rgba(16,185,129,0.07) 0%, transparent 60%),
        linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px);
      background-size: 100% 100%, 100% 100%, 40px 40px, 40px 40px;
      display: flex;
      flex-direction: column;
      font-family: 'Syne', sans-serif;
    }

    /* ── Navbar ── */
    .aj-nav {
      background: rgba(10,10,20,0.9);
      border-bottom: 1px solid rgba(99,102,241,0.2);
      padding: 0 2rem;
      height: 60px;
      display: flex;
      align-items: center;
      gap: 10px;
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(10px);
    }
    .aj-nav::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, #6366f1, #10b981, transparent);
    }
    .aj-nav-icon {
      width: 32px; height: 32px;
      background: linear-gradient(135deg, #6366f1, #10b981);
      border-radius: 4px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .aj-nav-icon svg {
      width: 16px; height: 16px;
      fill: none; stroke: white; stroke-width: 2;
    }
    .aj-nav-title {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.1rem;
      color: #f1f5f9;
      letter-spacing: -0.02em;
    }

    /* ── Center ── */
    .aj-center {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2.5rem 1rem;
    }

    /* ── Card ── */
    .aj-verify-card {
      width: 100%;
      max-width: 440px;
      background: rgba(15,15,25,0.95);
      border: 1px solid rgba(99,102,241,0.25);
      border-radius: 2px;
      box-shadow:
        0 0 0 1px rgba(99,102,241,0.05),
        0 20px 60px rgba(0,0,0,0.6),
        inset 0 1px 0 rgba(255,255,255,0.04);
      padding: 2.5rem;
      position: relative;
      overflow: hidden;
    }
    .aj-verify-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, #6366f1, #10b981, transparent);
    }
    .aj-verify-card::after {
      content: '';
      position: absolute;
      top: -60px; right: -60px;
      width: 180px; height: 180px;
      background: radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%);
      pointer-events: none;
    }

    /* ── Icon ── */
    .aj-icon-wrap {
      width: 56px; height: 56px;
      background: rgba(99,102,241,0.08);
      border: 1px solid rgba(99,102,241,0.2);
      border-radius: 2px;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 1.25rem;
      font-size: 1.5rem;
    }

    .aj-heading {
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      font-size: 1.25rem;
      color: #e2e8f0;
      text-align: center;
      margin-bottom: 0.4rem;
      letter-spacing: 0;
    }

    .aj-subtext {
      font-family: 'Syne', sans-serif;
      font-size: 0.875rem;
      color: #94a3b8;
      text-align: center;
      margin-bottom: 2rem;
      line-height: 1.6;
      font-weight: 400;
    }

    .aj-email-badge {
      display: inline-block;
      background: rgba(99,102,241,0.1);
      color: #818cf8;
      font-weight: 600;
      font-size: 0.875rem;
      padding: 2px 8px;
      border-radius: 4px;
      border: 1px solid rgba(99,102,241,0.25);
      font-family: 'Syne', sans-serif;
    }

    .aj-otp-label {
      display: block;
      font-family: 'Syne', sans-serif;
      font-size: 0.8rem;
      font-weight: 600;
      color: #94a3b8;
      margin-bottom: 0.4rem;
      letter-spacing: 0;
      text-transform: none;
    }

    .aj-input-row {
      display: flex;
      gap: 8px;
    }

    .aj-otp-input {
      flex: 1;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(99,102,241,0.2);
      border-radius: 2px;
      color: #e2e8f0;
      font-family: 'JetBrains Mono', monospace;
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0.25em;
      padding: 0.65rem 0.875rem;
      outline: none;
      transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
      box-sizing: border-box;
    }
    .aj-otp-input:focus {
      border-color: #6366f1;
      background: rgba(99,102,241,0.04);
      box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
    }
    .aj-otp-input::placeholder { color: #334155; letter-spacing: 0.05em; }

    .aj-verify-btn {
      padding: 0.65rem 1.25rem;
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #fff;
      border: none;
      border-radius: 2px;
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      font-size: 0.875rem;
      letter-spacing: 0.04em;
      cursor: pointer;
      white-space: nowrap;
      transition: box-shadow 0.15s, transform 0.1s;
      box-shadow: 0 4px 18px rgba(99,102,241,0.3);
    }
    .aj-verify-btn:hover {
      box-shadow: 0 6px 26px rgba(99,102,241,0.45);
      transform: translateY(-1px);
    }
    .aj-verify-btn:active { transform: translateY(0); }

    .aj-error-box {
      margin-top: 1rem;
      background: rgba(239,68,68,0.07);
      border: 1px solid rgba(239,68,68,0.2);
      border-radius: 4px;
      padding: 0.6rem 0.875rem;
      color: #f87171;
      font-family: 'Syne', sans-serif;
      font-size: 0.825rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* ── Fallback card ── */
    .aj-fallback-card {
      width: 100%;
      max-width: 400px;
      background: rgba(15,15,25,0.95);
      border: 1px solid rgba(99,102,241,0.25);
      border-radius: 2px;
      box-shadow:
        0 0 0 1px rgba(99,102,241,0.05),
        0 20px 60px rgba(0,0,0,0.6);
      padding: 2.5rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .aj-fallback-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, #6366f1, #10b981, transparent);
    }

    .aj-fallback-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    .aj-fallback-heading {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1.2rem;
      color: #f1f5f9;
      margin-bottom: 0.5rem;
    }
    .aj-fallback-desc {
      font-family: 'Syne', sans-serif;
      font-size: 0.875rem;
      font-weight: 400;
      color: #94a3b8;
      margin-bottom: 1.75rem;
      line-height: 1.6;
    }
    .aj-outline-btn {
      padding: 0.65rem 1.5rem;
      background: transparent;
      color: #6366f1;
      border: 1px solid rgba(99,102,241,0.4);
      border-radius: 2px;
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      font-size: 0.875rem;
      letter-spacing: 0.04em;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
    }
    .aj-outline-btn:hover {
      background: rgba(99,102,241,0.08);
      border-color: #6366f1;
      box-shadow: 0 0 12px rgba(99,102,241,0.15);
    }
  `;
  document.head.appendChild(style);
}

/* ════════════════════════════════════════════
   Component — all logic unchanged
════════════════════════════════════════════ */
export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const emailId = location.state?.email;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const Navbar = (
    <nav className="aj-nav">
      <div className="aj-nav-icon">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 3L4 12l4 9M16 3l4 9-4 9M5 9h14M5 15h14"/>
        </svg>
      </div>
      <span className="aj-nav-title">AlgoJudge</span>
    </nav>
  );

  // 🚨 handle direct access / refresh
  if (!email) {
    return (
      <div className="aj-page">
        {Navbar}
        <div className="aj-center">
          <div className="aj-fallback-card">
            <div className="aj-fallback-icon">📭</div>
            <h2 className="aj-fallback-heading">No Email Found</h2>
            <p className="aj-fallback-desc">Please register again to receive a new OTP.</p>
            <button
              className="aj-outline-btn"
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
    <div className="aj-page">
      {Navbar}

      <div className="aj-center">
        <div className="aj-verify-card">
          <div className="aj-icon-wrap">✉️</div>

          <h2 className="aj-heading">Verify Your Email</h2>
          <p className="aj-subtext">
            We sent a 6-digit OTP to&nbsp;
            <span className="aj-email-badge">{email}</span>
            <br />
            Enter it below to activate your account.
          </p>

          <label className="aj-otp-label" htmlFor="otp-input">
            One-Time Password
          </label>
          <div className="aj-input-row">
            <input
              id="otp-input"
              className="aj-otp-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              maxLength={6}
            />
            <button
              className="aj-verify-btn"
              onClick={handleVerify}
            >
              Verify
            </button>
          </div>

          {error && (
            <div className="aj-error-box">
              <span>⚠</span>
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}