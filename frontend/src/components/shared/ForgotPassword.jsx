import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const url = useLocation();
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError("Email is required");
      return;
    } else if (!emailRegex.test(email)) {
      setError("Enter a valid email address");
      return;
    }
    let user = null;
    if (url.pathname.includes("admin")) {
      user = "admin";
    } else if (url.pathname.includes("faculty")) {
      user = "faculty";
    } else {
      user = "student";
    }

    setIsSubmitting(true);

    try {
      const res = await axios.post(`${apiUrl}/api/forgot-password`, {
        email,
        user,
      });
      res.data.code === 200 && setEmail("");
      if (res.data.code === 200) {
        toast.success("Reset link sent!", {
          icon: <Check className="h-5 w-5 text-green-500" />,
        });
        setTimeout(() => {
          navigate(`/${user}/verify-reset-password`);
        }, 2000);
      } else {
        toast.error(res.data.message, {
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        });
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      toast.error(msg, {
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="fixed top-4 left-4">
        <button
          onClick={() => navigate("/admin-login")}
          className="flex items-center justify-center p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 text-[#048c7f]" />
        </button>
      </div>

      <motion.div
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        <motion.div
          className="bg-white p-8 rounded-lg shadow-lg"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            No problem, just enter your email and we'll send you a reset link!!
          </p>

          <form onSubmit={handleSubmit}>
            <motion.div className="mb-6" variants={itemVariants}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  error
                    ? "border-red-300 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
              />
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center py-2 px-4 rounded-md text-white text-sm font-medium shadow-sm 
                  ${
                    isSubmitting
                      ? "bg-[#8a1d65]"
                      : "bg-[#048c7f] hover:bg-[#500f3b]"
                  } transition-colors duration-200`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Sending reset link...
                  </>
                ) : (
                  <>
                    <Mail className="h-5 w-5 mr-2" />
                    Send Reset Link
                  </>
                )}
              </button>
            </motion.div>

            <motion.div className="mt-6 text-center" variants={itemVariants}>
              <p className="text-sm text-gray-600">
                Back to{" "}
                <button
                  type="button"
                  className="font-medium text-[#048c7f] hover:text-[#8a1d65] transition-colors duration-200"
                  onClick={() => navigate("/admin-login")}
                >
                  Login
                </button>
              </p>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
