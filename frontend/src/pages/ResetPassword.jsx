import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { resetPassword, clearError } from "../authSlice";
import { useEffect, useState } from 'react';

const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useSelector((state) => state.auth);
  const [successMsg, setSuccessMsg] = useState("");
  
  const resetToken = location.state?.resetToken;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(resetPasswordSchema) });

  useEffect(() => {
    if (!resetToken) {
      navigate('/forgot-password');
    }
    dispatch(clearError());
  }, [resetToken, navigate, dispatch]);

  const onSubmit = async (data) => {
    setSuccessMsg("");
    try {
      await dispatch(resetPassword({ resetToken, newPassword: data.newPassword, confirmPassword: data.confirmPassword })).unwrap();
      setSuccessMsg("Password reset successfully!");
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      console.log("Failed to reset password", err);
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

        .lp-input-wrap {
          position: relative;
        }

        .lp-input-wrap .lp-input {
          padding-right: 42px;
        }

        .lp-eye-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #475569;
          display: flex;
          align-items: center;
          padding: 0;
          transition: color 0.15s;
        }

        .lp-eye-btn:hover { color: #94a3b8; }

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
          <div className="lp-subtitle">// Create New Password</div>

          {error && <div className="lp-global-error">{error}</div>}
          {successMsg && <div className="lp-global-success">{successMsg}</div>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="lp-field">
              <label className="lp-label">New Password</label>
              <div className="lp-input-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`lp-input ${errors.newPassword ? 'error' : ''}`}
                  {...register('newPassword')}
                />
                <button
                  type="button"
                  className="lp-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.newPassword && <div className="lp-error-msg">{errors.newPassword.message}</div>}
            </div>

            <div className="lp-field">
              <label className="lp-label">Confirm Password</label>
              <div className="lp-input-wrap">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`lp-input ${errors.confirmPassword ? 'error' : ''}`}
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  className="lp-eye-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && <div className="lp-error-msg">{errors.confirmPassword.message}</div>}
            </div>

            <button type="submit" className="lp-submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="lp-spinner" />
                  Resetting...
                </>
              ) : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
