import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";

const Login = () => {
  const { googleLogin, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const validate = () => {
    let newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      setErrors({ api: error.message });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate(from, { replace: true });
    } catch (error) {
      setErrors({ api: error.message });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-xl p-5">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <button className="btn btn-primary w-full">Login</button>
        </form>

        {errors.api && (
          <p className="text-red-500 text-sm mt-2 text-center">
            {errors.api}
          </p>
        )}

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full mt-3"
        >
          Continue with Google
        </button>

        <p
          className="text-center mt-3 cursor-pointer text-sm"
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register
        </p>
      </div>
    </div>
  );
};

export default Login;