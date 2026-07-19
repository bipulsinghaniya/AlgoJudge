import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { forgotPassword, clearError } from "../authSlice";
import { useEffect, useState } from 'react';

const forgotPasswordSchema = z.object({
  emailId: z.string().email("Invalid Email"),
});

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) });

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit = async (data) => {
    setSuccessMsg("");
    try {
      await dispatch(forgotPassword(data.emailId)).unwrap();
      setSuccessMsg("OTP sent to your email!");
      setTimeout(() => {
        navigate('/verify-reset-otp', { state: { emailId: data.emailId } });
      }, 1500);
    } catch (err) {
      console.log("Failed to send OTP", err);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');

        .lp-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: #0d0f14;
          font-family: 'Syne', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .lp-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .lp-root::after {
          content: '';
          position: fixed;
          top: -150px;
          right: -150px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .lp-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 420px;
          background: #13151c;
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 16px;
          padding: 36px 32px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
        }

        .lp-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #6366f1, #06b6d4);
          border-radius: 16px 16px 0 0;
        }

        .lp-logo-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }

        .lp-logo-icon {
          width: 34px;
          height: 34px;
          background: linear-gradient(135deg, #6366f1, #06b6d4);
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .lp-logo-icon svg {
          width: 18px;
          height: 18px;
          fill: white;
        }

        .lp-logo-text {
          font-size: 1.3rem;
          font-weight: 800;
          color: #f1f5f9;
          letter-spacing: -0.02em;
        }

        .lp-subtitle {
          font-size: 0.75rem;
          font-weight: 600;
          color: #06b6d4;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 28px;
        }

        .lp-field {
          margin-bottom: 18px;
        }

        .lp-label {
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          color: #64748b;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          margin-bottom: 7px;
        }

        .lp-input {
          width: 100%;
          background: #0d0f14;
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 9px;
          padding: 11px 14px;
          color: #e2e8f0;
          font-size: 0.9rem;
          font-family: 'Syne', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }

        .lp-input::placeholder { color: #334155; }

        .lp-input:focus {
          border-color: rgba(99,102,241,0.5);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
        }

        .lp-input.error {
          border-color: rgba(239,68,68,0.4);
        }

        .lp-error-msg {
          font-size: 0.75rem;
          color: #f87171;
          margin-top: 5px;
        }

        .lp-global-error {
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 0.82rem;
          color: #f87171;
          margin-bottom: 18px;
        }
        
        .lp-global-success {
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 0.82rem;
          color: #10b981;
          margin-bottom: 18px;
        }

        .lp-submit-btn {
          width: 100%;
          padding: 12px;
          margin-top: 10px;
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: white;
          font-size: 0.95rem;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          border: none;
          border-radius: 9px;
          cursor: pointer;
          transition: opacity 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 18px rgba(99,102,241,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .lp-submit-btn:hover:not(:disabled) {
          box-shadow: 0 6px 24px rgba(99,102,241,0.45);
          opacity: 0.92;
        }

        .lp-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @keyframes lp-spin { to { transform: rotate(360deg); } }

        .lp-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: lp-spin 0.7s linear infinite;
        }

        .lp-footer {
          text-align: center;
          margin-top: 22px;
          font-size: 0.82rem;
          color: #475569;
        }

        .lp-footer a {
          color: #818cf8;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.15s;
        }

        .lp-footer a:hover { color: #a5b4fc; }
      `}</style>

      <div className="lp-root">
        <div className="lp-card">
          <div className="lp-logo-row">
            <div className="lp-logo-icon">
              <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="5" width="5" height="8" rx="1"/>
                <rect x="11" y="5" width="5" height="8" rx="1"/>
                <rect x="7" y="2" width="4" height="14" rx="1"/>
              </svg>
            </div>
            <span className="lp-logo-text">AlgoJudge</span>
          </div>
          <div className="lp-subtitle">// Reset Password</div>

          {error && <div className="lp-global-error">{error}</div>}
          {successMsg && <div className="lp-global-success">{successMsg}</div>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="lp-field">
              <label className="lp-label">Registered Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className={`lp-input ${errors.emailId ? 'error' : ''}`}
                {...register('emailId')}
              />
              {errors.emailId && <div className="lp-error-msg">{errors.emailId.message}</div>}
            </div>

            <button type="submit" className="lp-submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="lp-spinner" />
                  Sending OTP...
                </>
              ) : 'Send OTP'}
            </button>
          </form>

          <div className="lp-footer">
            Remembered your password?{' '}
            <NavLink to="/login">Login</NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
