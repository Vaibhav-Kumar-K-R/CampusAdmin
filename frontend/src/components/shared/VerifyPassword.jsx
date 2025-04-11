// src/pages/ResetPassword.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
const apiUrl = import.meta.env.VITE_API_URL;
export default function VerifyPassword() {
  const navigate = useNavigate();
  const token = new URLSearchParams(window.location.search).get("token");
  const user = new URLSearchParams(window.location.search).get("user");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      await axios.post(`${apiUrl}/api/verify-password`, {
        password,
        token,
        user,
      });
      toast.success("Password reset successfully");
      navigate(`/${user}-login`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-slate-200  shadow-xl p-8  w-full max-w-md">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">
          Campus Admin
        </h1>
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="New Password"
              className="w-full px-4 py-2 border  focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="absolute right-3 top-2.5 text-gray-600 cursor-pointer"
              onClick={() => setShow(!show)}
            >
              {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2  font-medium hover:bg-teal-700 transition duration-200"
          >
            Set New Password
          </button>
        </form>
      </div>
    </motion.div>
  );
}
