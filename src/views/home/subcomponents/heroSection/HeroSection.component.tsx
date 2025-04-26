"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./HeroSection.module.scss";
import Image from "next/image";
import InfoContainer from "@/components/infoContainer/InfoContainer.component";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1>
              Welcome <span className={styles.emphasis}>!</span>
            </h1>
            <span className={styles.subtitle}>To Austin Howard's Blog</span>
            <p>
              I'm Austin — a full-stack developer with a passion for building clean, scalable, and impactful software.
              I’ve spent the last several years working across both frontend and backend technologies, architecting
              solutions that range from streaming platforms to church management tools.
            </p>
            <p>
              My work is grounded in functional programming principles and thoughtful design systems, and I’m constantly
              looking for ways to improve how people interact with technology — whether that’s through better user
              experiences or more maintainable codebases.
            </p>
            <p>
              I built <a href="https://shepherdcms.org">ShepherdCMS</a> to support ministries in managing their
              communities with grace and efficiency — but my journey doesn’t stop there. When I’m not in the code, I’m
              probably planning a gritty D&D campaign, chasing my daughter around the house, or reflecting on how faith
              and tech intersect in meaningful ways.
            </p>
            <p>
              This blog is my journal — a place to share wins, lessons, and honest thoughts from my life as a developer
              and believer. Whether you're here for the tech, the testimony, or the tales, I’m glad you stopped by.
            </p>
            <a href="https://austinhoward.dev" className={styles.heroButton}>
              View My Portfolio
            </a>
          </motion.div>
        </div>
        <motion.div
          className={styles.imageContainer}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Image
            src={"https://res.cloudinary.com/wulfdev/image/upload/v1694977181/portfolio/headshot.04f99695.jpg"}
            alt="Austin Howard"
            width={250}
            height={250}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
