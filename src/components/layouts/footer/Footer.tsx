import Link from "next/link";
import React from "react";
import { Github } from "lucide-react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <footer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center gap-6 mt-12"
      >
        <div className="text-sm text-gray-600">
          &copy; 2024-2025
          <Link href={"https://github.com/lvncer"}> lvncer</Link>. All Rights
          Reserved.
        </div>

        {[{ icon: Github, href: "https://github.com/lvncer/nextsns" }].map(
          (item, index) => (
            <motion.a
              key={index}
              href={item.href}
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-gray-400 hover:text-gray-600"
            >
              <item.icon className="w-6 h-6" />
            </motion.a>
          )
        )}
      </motion.div>
    </footer>
  );
};

export default Footer;
