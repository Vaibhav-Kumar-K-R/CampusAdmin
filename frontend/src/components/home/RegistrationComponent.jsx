import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const RegistrationComponent = () => {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  // Animation controls for registration component
  const headingControls = useAnimation();
  const buttonsControls = useAnimation();

  // Refs to detect when elements are in view for registration component
  const [headingRef, headingInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [buttonsRef, buttonsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Start animations when elements come into view for registration component
  useEffect(() => {
    if (headingInView) {
      headingControls.start("visible");
    }
    if (buttonsInView) {
      buttonsControls.start("visible");
    }
  }, [headingInView, buttonsInView, headingControls, buttonsControls]);

  // Animation variants for registration component
  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const buttonsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Button hover animations for registration component
  const primaryButtonHover = {
    scale: 1.03,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    backgroundColor: "#048c7f",
    color: "white",
    transition: { duration: 0.3 },
  };

  const adminButtonHover = {
    scale: 1.03,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    color: "#048c7f",
    transition: { duration: 0.3 },
  };

  // Animation variants for already logged in component
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.7,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Function to determine user role for personalized message
  const getUserRoleText = () => {
    const role = user?.role?.toLowerCase() || "user";
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  // Render different components based on whether user is logged in or not
  if (user) {
    // Already Logged In Component
    return (
      <div id="getstarted" className="w-full bg-gray-50">
        <div className="max-w-[1200px] m-auto mb-20 mt-20 pb-20 pt-20 px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col items-center text-center"
          >
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#048c7f] mb-4">
                Welcome Back!
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 pl-2 pr-2">
                You're already signed in as a {getUserRoleText()}.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-5 w-full max-w-3xl justify-center mt-6"
            >
              {user && user.role === "Admin" && (
                <motion.button
                  whileHover={primaryButtonHover}
                  whileTap={{ scale: 0.98 }}
                  className="text-xl px-8 py-4 bg-[#048c7f] text-white font-bold rounded-lg shadow-lg"
                  onClick={() => navigate("/admin-dashboard")}
                >
                  Go to Dashboard
                </motion.button>
              )}
              {user && user.role === "Student" && (
                <motion.button
                  whileHover={primaryButtonHover}
                  whileTap={{ scale: 0.98 }}
                  className="text-xl px-8 py-4 bg-[#048c7f] text-white font-bold rounded-lg shadow-lg"
                  onClick={() => navigate("/student-dashboard")}
                >
                  Go to Dashboard
                </motion.button>
              )}
              {user && user.role === "Faculty" && (
                <motion.button
                  whileHover={primaryButtonHover}
                  whileTap={{ scale: 0.98 }}
                  className="text-xl px-8 py-4 bg-[#048c7f] text-white font-bold rounded-lg shadow-lg"
                  onClick={() => navigate("/faculty-dashboard")}
                >
                  Go to Dashboard
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  } else {
    // Registration Component
    return (
      <div className="w-full bg-gray-50">
        <div
          id="getstarted"
          className="max-w-[1200px] m-auto mb-20 mt-20 pb-20 pt-20 px-6"
        >
          <motion.div
            ref={headingRef}
            initial="hidden"
            animate={headingControls}
            variants={headingVariants}
            className="flex flex-col gap-2 mb-20 pl-5 sm:mb-10"
          >
            <motion.h2 className="text-4xl md:text-5xl font-extrabold text-[#048c7f]">
              Tell us about yourself.
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              What would you like to use CampusAdmin as?
            </motion.p>
          </motion.div>

          <motion.div
            ref={buttonsRef}
            initial="hidden"
            animate={buttonsControls}
            variants={buttonsContainerVariants}
            className="flex flex-col items-center gap-5"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:justify-between w-full">
              <motion.div
                variants={buttonVariants}
                whileHover={primaryButtonHover}
                whileTap={{ scale: 0.98 }}
                id="studenttab"
                className="text-2xl lg:text-4xl w-[90%] sm:w-[48%] p-5 m-auto sm:m-5 flex justify-center items-center text-white bg-[#048c7f] font-extrabold shadow-xl rounded-lg cursor-pointer"
                onClick={() => navigate("/student-login")}
              >
                Student
              </motion.div>

              <motion.div
                variants={buttonVariants}
                whileHover={primaryButtonHover}
                whileTap={{ scale: 0.98 }}
                id="admintab"
                className="text-2xl lg:text-4xl w-[90%] m-auto sm:m-5 sm:w-[48%] p-5 flex justify-center items-center text-white bg-[#048c7f] font-extrabold shadow-xl rounded-lg cursor-pointer"
                onClick={() => navigate("/faculty-login")}
              >
                Faculty
              </motion.div>
            </div>

            <div
              id="admintab"
              className="md:w-[50%] w-full pl-5 pr-5 shadow-none border-none"
            >
              <motion.div
                variants={buttonVariants}
                whileHover={adminButtonHover}
                whileTap={{ scale: 0.98 }}
                className="text-2xl lg:text-4xl font-extrabold w-[100%] sm:m-0 sm:m-full flex justify-center items-center p-5 border-4 border-[#048c7f] shadow-md cursor-pointer rounded-lg"
                onClick={() => navigate("/admin-register")}
              >
                Admin
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
};
