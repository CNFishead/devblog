"use client";
import styles from "./InfoContainer.module.scss";
import formStyles from "@/styles/Form.module.scss";
import React, { useState } from "react";
import BlogCard from "../blogCard/BlogCard.component";
import BlogType from "@/types/BlogType";
import Error from "../error/Error.component";
import useApiHook from "@/state/useApi";
import { motion, AnimatePresence } from "framer-motion";
import socialLinks from "@/data/socialLinks";
import { useMediaQuery } from "react-responsive";

interface InfoContainerProps {
  blogs?: BlogType[];
  showBlogs?: boolean;
}

const InfoContainer = ({ blogs, showBlogs = false }: InfoContainerProps) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [email, setEmail] = useState("");
  const {
    data: blogsData,
    isLoading: loading,
    isError,
    error,
  } = useApiHook({
    method: "GET",
    url: `/blog`,
    key: "recentBlogs",
    filter: `isPublished;true,isPrivate;false`,
    limit: 3,
    enabled: !blogs,
  }) as any;

  const onSuccessCallback = (data: any) => {
    if (data.success) {
      setShowSubscribe(false);
      alert("You have successfully subscribed to my newsletter.");
      setEmail("");
    }
  };
  const { mutate: newsLetterSignup } = useApiHook({
    method: "POST",
    url: "/util/newsletter",
    key: "newsletter",
  }) as any;

  const onFormFinish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email address.");
    newsLetterSignup({ email });
  };

  return (
    <div className={styles.container}>
      <div className={styles.socialCard}>
        <div className={styles.logoContainer}>
          <img src="/images/logo-192x192.png" alt="logo" width={100} height={100} />
        </div>
        <div className={styles.contentContainer}>
          <p>
            Join the journey, stay updated, and be a part of the conversation. Follow me on my social media channels to
            get the latest updates, behind-the-scenes glimpses, and more.
          </p>
          <div className={styles.linksContainer}>
            {socialLinks.map((link: any) => (
              <motion.a
                key={link.id}
                href={link.url}
                className={styles.socialButton}
                aria-label={`Social Link ${link.name}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.newsLetterCard}>
        <h1 className="section-title">Newsletter</h1>
        <span>
          If you&apos;d like to stay up to date with the latest news, updates, and more, please subscribe to my
          newsletter. I promise not to spam you.
        </span>
        <div className={styles.actionContainer}>
          <AnimatePresence>
            {showSubscribe ? (
              <motion.form
                key="subscribe-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={onFormFinish}
                className={formStyles.form}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={formStyles.input}
                  required
                />
                <p className={formStyles.help}>
                  By clicking subscribe you agree to receive emails from me. I promise not to spam you.
                </p>
                <button type="submit" className={styles.subscribeButton} aria-label="subscribe to newsletter button">
                  Subscribe
                </button>
              </motion.form>
            ) : (
              <motion.button
                key="subscribe-toggle"
                className={styles.subscribeButton}
                onClick={() => setShowSubscribe(true)}
                aria-label="subscribe to newsletter button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {showBlogs && (
        <div className={styles.blogsContainer}>
          {loading ? (
            <p>Loading...</p>
          ) : isError ? (
            <Error error={error} />
          ) : blogs?.length === 0 ? (
            <p>No blogs found.</p>
          ) : (
            (blogs ?? blogsData?.blogs)?.map((blog: BlogType) => (
              <motion.div key={blog._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <BlogCard blog={blog} large={false} showDescription={isMobile ? true : false} />
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default InfoContainer;
