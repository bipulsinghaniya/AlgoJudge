// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, NavLink } from 'react-router'; 
// import { loginUser } from "../authSlice";
// import { useEffect, useState } from 'react';


// const loginSchema = z.object({
//   emailId: z.string().email("Invalid Email"),
//   password: z.string().min(8, "Password is too weak") 
// });

// function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(loginSchema) }); // Using renamed schema

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

//   const onSubmit = (data) => {
//     dispatch(loginUser(data));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-base-200"> {/* Added bg for contrast */}
//       <div className="card w-96 bg-base-100 shadow-xl">
//         <div className="card-body">
//           <h2 className="card-title justify-center text-3xl mb-6">AlgoJudge</h2> {/* Added mb-6 */}

          
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="form-control"> {/* Removed mt-4 from first form-control for tighter spacing to title or global error */}
//               <label className="label"> {/* Removed mb-1, default spacing should be fine */}
//                 <span className="label-text">Email</span>
//               </label>
//               <input
//                 type="email"
//                 placeholder="john@example.com"
//                 className={`input input-bordered w-full ${errors.emailId ? 'input-error' : ''}`} 
//                 {...register('emailId')}
//               />
//               {errors.emailId && (
//                 <span className="text-error text-sm mt-1">{errors.emailId.message}</span>
//               )}
//             </div>

//             <div className="form-control mt-4">
//               <label className="label">
//                 <span className="label-text">Password</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   className={`input input-bordered w-full pr-10 ${errors.password ? 'input-error' : ''}`}
//                   {...register('password')}
//                 />
//                 <button
//                   type="button"
//                   className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                   onClick={() => setShowPassword(!showPassword)}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? (
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                     </svg>
//                   ) : (
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//                 <span className="text-error text-sm mt-1">{errors.password.message}</span>
//               )}
//             </div>

//             <div className="form-control mt-8 flex justify-center">
//               <button
//                 type="submit"
//                 className={`btn btn-primary ${loading ? 'loading btn-disabled' : ''}`} // Added btn-disabled for better UX with loading
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <span className="loading loading-spinner"></span>
//                     Logging in...
//                   </>
//                 ) : 'Login'}
//               </button>
//             </div>
//           </form>
//           <div className="text-center mt-6">
//             <span className="text-sm">
//               Don't have an account?{' '} {/* Adjusted text slightly */}
//               <NavLink to="/signup" className="link link-primary">
//                 Sign Up
//               </NavLink>
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;










import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { loginUser } from "../authSlice";
import { useEffect, useState } from 'react';
import { clearError } from "../authSlice";

const loginSchema = z.object({
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak")
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
  dispatch(clearError());
}, [dispatch]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
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

        /* Grid background */
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

        /* Glow blob */
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

        /* Top accent line */
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
          <div className="lp-subtitle">// Login to your account</div>

          {error && <div className="lp-global-error">{error}</div>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="lp-field">
              <label className="lp-label">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className={`lp-input ${errors.emailId ? 'error' : ''}`}
                {...register('emailId')}
              />
              {errors.emailId && <div className="lp-error-msg">{errors.emailId.message}</div>}
            </div>

            <div className="lp-field">
              <label className="lp-label">Password</label>
              <div className="lp-input-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`lp-input ${errors.password ? 'error' : ''}`}
                  {...register('password')}
                />
                <button
                  type="button"
                  className="lp-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
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
              {errors.password && <div className="lp-error-msg">{errors.password.message}</div>}
            </div>

            <button type="submit" className="lp-submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="lp-spinner" />
                  Logging in...
                </>
              ) : 'Login'}
            </button>
          </form>

          <div className="lp-footer">
            Don't have an account?{' '}
            <NavLink to="/signup">Sign Up</NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;































// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, NavLink } from 'react-router';
// import { loginUser } from "../authSlice";
// import { useEffect, useState } from 'react';
// import { clearError } from "../authSlice";

// const loginSchema = z.object({
//   emailId: z.string().email("Invalid Email"),
//   password: z.string().min(8, "Password is too weak")
// });

// function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(loginSchema) });

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

//   // const onSubmit = (data) => {
//   //   dispatch(loginUser(data));
//   // };

//   const onSubmit = async (data) => {
//   try {
//     await dispatch(loginUser(data)).unwrap();
//   } catch (err) {
//     console.log(err);
//   }
// };

//   useEffect(() => {
//   dispatch(clearError());
// }, [dispatch]);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@400;600;800&display=swap');

//         .aj-root {
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background-color: #0a0a0f;
//           background-image:
//             radial-gradient(ellipse 80% 50% at 80% -10%, rgba(99, 102, 241, 0.12) 0%, transparent 60%),
//             radial-gradient(ellipse 60% 40% at 20% 110%, rgba(16, 185, 129, 0.08) 0%, transparent 60%),
//             linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px);
//           background-size: 100% 100%, 100% 100%, 40px 40px, 40px 40px;
//           font-family: 'Syne', sans-serif;
//           padding: 1rem;
//         }

//         .aj-card {
//           width: 100%;
//           max-width: 420px;
//           background: rgba(15, 15, 25, 0.95);
//           border: 1px solid rgba(99, 102, 241, 0.25);
//           border-radius: 2px;
//           box-shadow:
//             0 0 0 1px rgba(99,102,241,0.05),
//             0 20px 60px rgba(0,0,0,0.6),
//             inset 0 1px 0 rgba(255,255,255,0.04);
//           padding: 2.5rem;
//           position: relative;
//           overflow: hidden;
//         }

//         .aj-card::before {
//           content: '';
//           position: absolute;
//           top: 0; left: 0; right: 0;
//           height: 2px;
//           background: linear-gradient(90deg, transparent, #10b981, #6366f1, transparent);
//         }

//         .aj-card::after {
//           content: '';
//           position: absolute;
//           bottom: -60px; left: -60px;
//           width: 180px; height: 180px;
//           background: radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%);
//           pointer-events: none;
//         }

//         .aj-logo-row {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           margin-bottom: 0.25rem;
//         }

//         .aj-logo-icon {
//           width: 32px; height: 32px;
//           background: linear-gradient(135deg, #6366f1, #10b981);
//           border-radius: 4px;
//           display: flex; align-items: center; justify-content: center;
//           flex-shrink: 0;
//         }

//         .aj-logo-icon svg {
//           width: 16px; height: 16px;
//           fill: none;
//           stroke: white;
//           stroke-width: 2;
//         }

//         .aj-title {
//           font-family: 'Syne', sans-serif;
//           font-weight: 800;
//           font-size: 1.5rem;
//           color: #f1f5f9;
//           letter-spacing: -0.02em;
//         }

//         .aj-subtitle {
//           font-family: 'JetBrains Mono', monospace;
//           font-size: 0.7rem;
//           color: #10b981;
//           letter-spacing: 0.12em;
//           text-transform: uppercase;
//           margin-bottom: 2rem;
//           opacity: 0.8;
//         }

//         .aj-field {
//           margin-bottom: 1.25rem;
//         }

//         .aj-label {
//           display: block;
//           font-family: 'JetBrains Mono', monospace;
//           font-size: 0.65rem;
//           letter-spacing: 0.1em;
//           text-transform: uppercase;
//           color: #64748b;
//           margin-bottom: 0.4rem;
//         }

//         .aj-input-wrap { position: relative; }

//         .aj-input {
//           width: 100%;
//           background: rgba(255,255,255,0.03);
//           border: 1px solid rgba(99,102,241,0.2);
//           border-radius: 2px;
//           color: #e2e8f0;
//           font-family: 'JetBrains Mono', monospace;
//           font-size: 0.875rem;
//           padding: 0.65rem 0.875rem;
//           outline: none;
//           transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
//           box-sizing: border-box;
//         }

//         .aj-input:focus {
//           border-color: #6366f1;
//           background: rgba(99,102,241,0.04);
//           box-shadow: 0 0 0 3px rgba(99,102,241,0.1), 0 0 12px rgba(99,102,241,0.08);
//         }

//         .aj-input::placeholder { color: #334155; }

//         .aj-input.error { border-color: rgba(239,68,68,0.5); }
//         .aj-input.error:focus {
//           border-color: #ef4444;
//           box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
//         }

//         .aj-input-pw { padding-right: 2.75rem; }

//         .aj-eye-btn {
//           position: absolute;
//           top: 50%; right: 0.75rem;
//           transform: translateY(-50%);
//           background: none; border: none;
//           color: #475569;
//           cursor: pointer;
//           padding: 0;
//           display: flex; align-items: center;
//           transition: color 0.15s;
//           line-height: 0;
//         }

//         .aj-eye-btn:hover { color: #6366f1; }

//         .aj-error-msg {
//           font-family: 'JetBrains Mono', monospace;
//           font-size: 0.65rem;
//           color: #ef4444;
//           margin-top: 0.3rem;
//           letter-spacing: 0.02em;
//           display: flex;
//           align-items: center;
//           gap: 4px;
//         }

//         .aj-error-msg::before { content: '⚠'; font-size: 0.6rem; }

//         .aj-global-error {
//           font-family: 'JetBrains Mono', monospace;
//           font-size: 0.7rem;
//           color: #ef4444;
//           background: rgba(239,68,68,0.07);
//           border: 1px solid rgba(239,68,68,0.2);
//           border-radius: 2px;
//           padding: 0.5rem 0.75rem;
//           margin-bottom: 1.25rem;
//           letter-spacing: 0.02em;
//         }

//         .aj-submit-btn {
//           width: 100%;
//           margin-top: 1.75rem;
//           padding: 0.75rem 1rem;
//           background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
//           border: none;
//           border-radius: 2px;
//           color: #fff;
//           font-family: 'Syne', sans-serif;
//           font-weight: 600;
//           font-size: 0.875rem;
//           letter-spacing: 0.04em;
//           cursor: pointer;
//           overflow: hidden;
//           transition: opacity 0.15s, transform 0.1s, box-shadow 0.15s;
//           box-shadow: 0 4px 20px rgba(99,102,241,0.3);
//         }

//         .aj-submit-btn:hover:not(:disabled) {
//           box-shadow: 0 6px 28px rgba(99,102,241,0.45);
//           transform: translateY(-1px);
//         }

//         .aj-submit-btn:active:not(:disabled) { transform: translateY(0); }

//         .aj-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

//         .aj-submit-btn .btn-inner {
//           display: flex; align-items: center; justify-content: center; gap: 8px;
//         }

//         .aj-spinner {
//           width: 14px; height: 14px;
//           border: 2px solid rgba(255,255,255,0.3);
//           border-top-color: #fff;
//           border-radius: 50%;
//           animation: aj-spin 0.7s linear infinite;
//         }

//         @keyframes aj-spin { to { transform: rotate(360deg); } }

//         .aj-footer {
//           margin-top: 1.5rem;
//           text-align: center;
//           font-family: 'JetBrains Mono', monospace;
//           font-size: 0.7rem;
//           color: #475569;
//         }

//         .aj-link {
//           color: #6366f1;
//           text-decoration: none;
//           font-weight: 500;
//           transition: color 0.15s;
//         }

//         .aj-link:hover { color: #818cf8; text-decoration: underline; }

//         .aj-divider {
//           height: 1px;
//           background: rgba(99,102,241,0.1);
//           margin: 1.75rem 0 0;
//         }
//       `}</style>

//       <div className="aj-root">
//         <div className="aj-card">
//           <div className="aj-logo-row">
//             <div className="aj-logo-icon">
//               <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M8 3L4 12l4 9M16 3l4 9-4 9M5 9h14M5 15h14"/>
//               </svg>
//             </div>
//             <span className="aj-title">AlgoJudge</span>
//           </div>
//           <p className="aj-subtitle">// Welcome back</p>

//           {error && (
//             <div className="aj-global-error">
//               ✗ {typeof error === 'string' ? error : 'Invalid credentials. Please try again.'}
//             </div>
//           )}

//           <form onSubmit={handleSubmit(onSubmit)} noValidate>
//             <div className="aj-field">
//               <label className="aj-label">Email</label>
//               <div className="aj-input-wrap">
//                 <input
//                   type="email"
//                   placeholder="john@example.com"
//                   className={`aj-input${errors.emailId ? ' error' : ''}`}
//                   {...register('emailId')}
//                 />
//               </div>
//               {errors.emailId && (
//                 <p className="aj-error-msg">{errors.emailId.message}</p>
//               )}
//             </div>

//             <div className="aj-field">
//               <label className="aj-label">Password</label>
//               <div className="aj-input-wrap">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   className={`aj-input aj-input-pw${errors.password ? ' error' : ''}`}
//                   {...register('password')}
//                 />
//                 <button
//                   type="button"
//                   className="aj-eye-btn"
//                   onClick={() => setShowPassword(!showPassword)}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? (
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                     </svg>
//                   ) : (
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="aj-error-msg">{errors.password.message}</p>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="aj-submit-btn"
//               disabled={loading}
//             >
//               <span className="btn-inner">
//                 {loading && <span className="aj-spinner" />}
//                 {loading ? 'Logging in...' : 'Login'}
//               </span>
//             </button>
//           </form>

//           <div className="aj-divider" />

//           <p className="aj-footer">
//             Don't have an account?{' '}
//             <NavLink to="/signup" className="aj-link">Sign Up</NavLink>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;