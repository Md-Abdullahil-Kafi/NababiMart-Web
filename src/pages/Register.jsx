import { useAuth } from "../context/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

const validate = () => {
  let newErrors = {};

  if (!name || name.length < 3) {
    newErrors.name = "Valid name is required";
  }

  if (!phone) {
    newErrors.phone = "Phone is required";
  } else if (!/^01[3-9]\d{8}$/.test(phone)) {
    newErrors.phone = "Invalid BD phone number";
  }

  if (!email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Invalid email";
  }

  if (!password) {
    newErrors.password = "Password is required";
  } else if (!/(?=.*[A-Z])(?=.*\d).{6,}/.test(password)) {
    newErrors.password = "Min 6 chars, 1 uppercase & 1 number";
  }

  if (!confirmPassword) {
    newErrors.confirmPassword = "Confirm your password";
  } else if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
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
      await register(email, password, {
        name,
        phone,
        address,
      });

      navigate("/");
    } catch (error) {
      setErrors({ api: error.message });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-xl p-5">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            type="tel"
            placeholder="Phone"
            className="input input-bordered w-full"
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

          <input
            type="text"
            placeholder="Address"
            className="input input-bordered w-full"
            onChange={(e) => setAddress(e.target.value)}
          />

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

          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}

          <button className="btn btn-primary w-full">Register</button>
        </form>

        {errors.api && (
          <p className="text-red-500 text-sm mt-2 text-center">
            {errors.api}
          </p>
        )}

        <p
          className="text-center mt-3 cursor-pointer text-sm"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
};

export default Register;
