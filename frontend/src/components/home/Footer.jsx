;

import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export const Footer = () => {
  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-gradient-to-b from-[#048c7f] to-[#4a0f39] text-white py-12 px-6 md:px-20"
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <motion.div variants={linkVariants} className="text-3xl font-bold">
          Campus<span className="text-white font-extrabold">Admin</span>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-2 text-sm md:text-base">
          {["Home", "About", "Features", "Contact"].map((item, index) => (
            <motion.a
              key={index}
              href={item == "Home" ? "/" : `/${item.toLowerCase()}`}
              variants={linkVariants}
              whileHover="hover"
              className="cursor-pointer  p-2 text-lg   transition-colors duration-300text-white/80"
            >
              {item}
            </motion.a>
          ))}
        </div>

        <div className="flex gap-5 mt-6 md:mt-0">
          {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map(
            (Icon, index) => (
              <motion.a
                key={index}
                href="#"
                variants={linkVariants}
                whileHover="hover"
                className="p-3 rounded-full bg-white/10 text-white hover:bg-white hover:text-[#048c7f] transition-colors duration-300"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ),
          )}
        </div>
      </div>

      <motion.div
        className="text-center text-sm mt-10 opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5, duration: 1 } }}
      >
        &copy; {new Date().getFullYear()} CampusAdmin. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};
