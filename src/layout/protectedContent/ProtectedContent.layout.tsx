"use client";
import React, { useState } from "react";
import styles from "./ProtectedContent.module.scss";
import formStyles from "@/styles/Form.module.scss";
import InfoContainer from "@/components/infoContainer/InfoContainer.component";
import BlogType from "@/types/BlogType";
import { AiFillUnlock } from "react-icons/ai";
import useApiHook from "@/state/useApi";
import ReadBlog from "@/views/blog/ReadBlog.view";

interface ProtectedContentProps {
  blog: BlogType;
}

const ProtectedContent = ({ blog }: ProtectedContentProps) => {
  const [isUnlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [blogState, setBlogState] = useState<BlogType>(blog);

  const handleMutationSuccess = (data: any) => { 
    if (data.success) {
      setBlogState(data.payload);
      setUnlocked(true);
      // update blog with data returned from server
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  const { mutate: postPassword } = useApiHook({
    method: "POST",
    key: "passwordValidation",
  }) as any;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postPassword(
      { url: `/blog/validate`, formData: { slug: blog.slug, password } },
      {
        onSuccess: (data: any) => {
          handleMutationSuccess(data);
        },
        onError: (data: any) => {
          handleMutationSuccess(data);
        },
      }
    );
  };

  if (isUnlocked) {
    return <ReadBlog blog={blogState} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.headerText}>
          <div className={styles.headerContainer}>
            <h1 className="section-title">Protected Content</h1>
            <AiFillUnlock className={styles.icon} />
          </div>
          <p>
            This section contains private and personally curated content, intended solely for my personal viewing and
            sharing with those I grant permission to. Unauthorized access to this content is a direct violation of my
            privacy and the trust placed in those with the approved password. Please respect the intended exclusivity of
            this blog.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={formStyles.form}>
          <div className={formStyles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
              className={formStyles.input}
              required
            />
          </div>
          {error && <p className={formStyles.error}>{error}</p>}
          <button type="submit" className={formStyles.button}>
            Submit
          </button>
        </form>
      </div>

      <div className={styles.rightContainer}>
        <InfoContainer />
      </div>
    </div>
  );
};

export default ProtectedContent;
