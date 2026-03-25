import { useLocation, Link } from "react-router";

export default function CheckEmail() {
  const location = useLocation();
  const email = location.state?.email || "your email address";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        
        <div className="text-6xl mb-4">📧</div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Verify your email
        </h1>

        <p className="text-gray-600 mb-4">
          We’ve sent a verification link to
        </p>

        <p className="font-semibold text-orange-600 break-all mb-6">
          {email}
        </p>

        <div className="space-y-3">
          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noreferrer"
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition"
          >
            Open Gmail
          </a>

          <Link
            to="/login"
            className="block w-full border border-gray-300 py-3 rounded-xl text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            Go to Login
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Didn’t receive the email? Check spam or promotions folder.
        </p>
      </div>
    </div>
  );
}
