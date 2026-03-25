// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, NavLink } from 'react-router';
// import { registerUser } from '../authSlice';

// const signupSchema = z.object({
//   firstName: z.string().min(3, "Minimum character should be 3"),
//   emailId: z.string().email("Invalid Email"),
//   password: z.string().min(8, "Password is too weak")
// });

// function Signup() {

//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, loading } = useSelector((state) => state.auth); // Removed error as it wasn't used

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(signupSchema) });

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

//   // const onSubmit = (data) => {
//   //   dispatch(registerUser(data));
//   // };


//     // otp
// const onSubmit = async (data) => {
//   try {
//     const res = await dispatch(registerUser(data)).unwrap();

//     alert(res.message);

//     navigate("/verify-email", {
//       state: { email: data.emailId },
//     });

//   } catch (err) {
//     console.log(err);
//   }
// };


//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-base-200"> {/* Added a light bg for contrast */}
//       <div className="card w-96 bg-base-100 shadow-xl">
//         <div className="card-body">
//           <h2 className="card-title justify-center text-3xl mb-6">AlgoJudge</h2> {/* Added mb-6 for spacing */}

          
//           <form onSubmit={handleSubmit(onSubmit)}>
//             {/* First Name Field */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">First Name</span>
//               </label>
//               <input type="text" placeholder="John" className={`input input-bordered w-full
//                ${errors.firstName ? 'input-error' : ''}`}  {...register('firstName')} />
//               {errors.firstName && (
//                 <span className="text-error text-sm mt-1">{errors.firstName.message}</span>
//               )}
//             </div>

//             {/* Email Field */}
//             <div className="form-control mt-4">
//               <label className="label">
//                 <span className="label-text">Email</span>
//               </label>
//               <input
//                 type="email"
//                 placeholder="john@example.com"
//                 className={`input input-bordered w-full ${errors.emailId ? 'input-error' : ''}`} // Ensure w-full for consistency
//                 {...register('emailId')}
//               />
//               {errors.emailId && (
//                 <span className="text-error text-sm mt-1">{errors.emailId.message}</span>
//               )}
//             </div>

//             {/* Password Field with Toggle */}
//             <div className="form-control mt-4">
//               <label className="label">
//                 <span className="label-text">Password</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   // Added pr-10 (padding-right) to make space for the button
//                   className={`input input-bordered w-full pr-10 ${errors.password ? 'input-error' : ''}`}
//                   {...register('password')}
//                 />
//                 <button
//                   type="button"
//                   className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700" // Added transform for better centering, styling
//                   onClick={() => setShowPassword(!showPassword)}
//                   aria-label={showPassword ? "Hide password" : "Show password"} // Accessibility
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

//             {/* Submit Button */}
//             <div className="form-control mt-8 flex justify-center"> 
//               <button
//                 type="submit"
//                 className={`btn btn-primary ${loading ? 'loading' : ''}`}
//                 disabled={loading}
//               >
//                 {loading ? 'Signing Up...' : 'Sign Up'}
//               </button>
//             </div>
//           </form>

//           {/* Login Redirect */}
//           <div className="text-center mt-6"> {/* Increased mt for spacing */}
//             <span className="text-sm">
//               Already have an account?{' '}
//               <NavLink to="/login" className="link link-primary">
//                 Login
//               </NavLink>
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;






import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { registerUser } from '../authSlice';

const signupSchema = z.object({
  firstName: z.string().min(3, "Minimum character should be 3"),
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak")
});

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    try {
      const res = await dispatch(registerUser(data)).unwrap();
      alert(res.message);
      navigate("/verify-email", {
        state: { email: data.emailId },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@400;600;800&display=swap');

        .aj-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #0a0a0f;
          background-image:
            radial-gradient(ellipse 80% 50% at 20% -10%, rgba(99, 102, 241, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 110%, rgba(16, 185, 129, 0.08) 0%, transparent 60%),
            linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px);
          background-size: 100% 100%, 100% 100%, 40px 40px, 40px 40px;
          font-family: 'Syne', sans-serif;
          padding: 1rem;
        }

        .aj-card {
          width: 100%;
          max-width: 420px;
          background: rgba(15, 15, 25, 0.95);
          border: 1px solid rgba(99, 102, 241, 0.25);
          border-radius: 2px;
          box-shadow:
            0 0 0 1px rgba(99,102,241,0.05),
            0 20px 60px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.04);
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
        }

        .aj-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #6366f1, #10b981, transparent);
        }

        .aj-card::after {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 180px; height: 180px;
          background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .aj-logo-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 0.25rem;
        }

        .aj-logo-icon {
          width: 32px; height: 32px;
          background: linear-gradient(135deg, #6366f1, #10b981);
          border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .aj-logo-icon svg {
          width: 16px; height: 16px;
          fill: white;
        }

        .aj-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          color: #f1f5f9;
          letter-spacing: -0.02em;
        }

        .aj-subtitle {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          color: #10b981;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 2rem;
          opacity: 0.8;
        }

        .aj-field {
          margin-bottom: 1.25rem;
        }

        .aj-label {
          display: block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 0.4rem;
        }

        .aj-input-wrap {
          position: relative;
        }

        .aj-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 2px;
          color: #e2e8f0;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.875rem;
          padding: 0.65rem 0.875rem;
          outline: none;
          transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
          box-sizing: border-box;
        }

        .aj-input:focus {
          border-color: #6366f1;
          background: rgba(99,102,241,0.04);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1), 0 0 12px rgba(99,102,241,0.08);
        }

        .aj-input::placeholder {
          color: #334155;
        }

        .aj-input.error {
          border-color: rgba(239,68,68,0.5);
        }

        .aj-input.error:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
        }

        .aj-input-pw {
          padding-right: 2.75rem;
        }

        .aj-eye-btn {
          position: absolute;
          top: 50%; right: 0.75rem;
          transform: translateY(-50%);
          background: none; border: none;
          color: #475569;
          cursor: pointer;
          padding: 0;
          display: flex; align-items: center;
          transition: color 0.15s;
          line-height: 0;
        }

        .aj-eye-btn:hover { color: #6366f1; }

        .aj-error-msg {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          color: #ef4444;
          margin-top: 0.3rem;
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .aj-error-msg::before {
          content: '⚠';
          font-size: 0.6rem;
        }

        .aj-submit-btn {
          width: 100%;
          margin-top: 1.75rem;
          padding: 0.75rem 1rem;
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          border: none;
          border-radius: 2px;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          letter-spacing: 0.04em;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: opacity 0.15s, transform 0.1s, box-shadow 0.15s;
          box-shadow: 0 4px 20px rgba(99,102,241,0.3);
        }

        .aj-submit-btn:hover:not(:disabled) {
          box-shadow: 0 6px 28px rgba(99,102,241,0.45);
          transform: translateY(-1px);
        }

        .aj-submit-btn:active:not(:disabled) { transform: translateY(0); }

        .aj-submit-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .aj-submit-btn .btn-inner {
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }

        .aj-spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: aj-spin 0.7s linear infinite;
        }

        @keyframes aj-spin { to { transform: rotate(360deg); } }

        .aj-footer {
          margin-top: 1.5rem;
          text-align: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          color: #475569;
        }

        .aj-link {
          color: #6366f1;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.15s;
        }

        .aj-link:hover { color: #818cf8; text-decoration: underline; }

        .aj-divider {
          height: 1px;
          background: rgba(99,102,241,0.1);
          margin: 1.75rem 0 0;
        }
      `}</style>

      <div className="aj-root">
        <div className="aj-card">
          <div className="aj-logo-row">
            <div className="aj-logo-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3L4 12l4 9M16 3l4 9-4 9M5 9h14M5 15h14"/>
              </svg>
            </div>
            <span className="aj-title">AlgoJudge</span>
          </div>
          <p className="aj-subtitle">// Create your account</p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="aj-field">
              <label className="aj-label">First Name</label>
              <div className="aj-input-wrap">
                <input
                  type="text"
                  placeholder="John"
                  className={`aj-input${errors.firstName ? ' error' : ''}`}
                  {...register('firstName')}
                />
              </div>
              {errors.firstName && (
                <p className="aj-error-msg">{errors.firstName.message}</p>
              )}
            </div>

            <div className="aj-field">
              <label className="aj-label">Email</label>
              <div className="aj-input-wrap">
                <input
                  type="email"
                  placeholder="john@example.com"
                  className={`aj-input${errors.emailId ? ' error' : ''}`}
                  {...register('emailId')}
                />
              </div>
              {errors.emailId && (
                <p className="aj-error-msg">{errors.emailId.message}</p>
              )}
            </div>

            <div className="aj-field">
              <label className="aj-label">Password</label>
              <div className="aj-input-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`aj-input aj-input-pw${errors.password ? ' error' : ''}`}
                  {...register('password')}
                />
                <button
                  type="button"
                  className="aj-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="aj-error-msg">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="aj-submit-btn"
              disabled={loading}
            >
              <span className="btn-inner">
                {loading && <span className="aj-spinner" />}
                {loading ? 'Signing Up...' : 'Sign Up'}
              </span>
            </button>
          </form>

          <div className="aj-divider" />

          <p className="aj-footer">
            Already have an account?{' '}
            <NavLink to="/login" className="aj-link">Login</NavLink>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;