import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";

const Login = () => {
  const { googleLogin, login, register } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 where to redirect
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }

      navigate(from, { replace: true }); // 🔥 redirect

    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate(from, { replace: true }); // 🔥 redirect
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-xl p-5">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary w-full">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full mt-3"
        >
          Continue with Google
        </button>

        <p
          className="text-center mt-3 cursor-pointer text-sm"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Login;