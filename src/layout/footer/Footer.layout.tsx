"use client";

import React from "react";
import styles from "./Footer.module.scss";
import { motion } from "framer-motion";
import socialLinks from "@/data/socialLinks";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className={styles.footer}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className={styles.socialLinks}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        viewport={{ once: true }}
      >
        {socialLinks.map((social) => (
          <motion.a
            key={social.id}
            href={social.url}
            aria-label={`Social Link ${social.name}`}
            className={styles.icon}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        className={styles.bottomText}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <p>Connect with me!</p>
        <p>&copy; Wulf Developments {year}</p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
