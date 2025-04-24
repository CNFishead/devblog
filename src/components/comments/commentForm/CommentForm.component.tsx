"use client";

import React, { useState } from "react";
import styles from "./CommentForm.module.scss";
import formStyles from "@/styles/Form.module.scss";
import Loader from "@/components/loader/Loader.component";
import BlogType from "@/types/BlogType";
import useApiHook from "@/state/useApi";

type Props = {
  scroll?: () => void;
  small?: boolean;
  blog?: BlogType;
};

const CommentForm = ({ blog, scroll }: Props) => {
  const { mutate: addComment, isLoading } = useApiHook({
    method: "POST",
    key: "comment",
  }) as any;

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      setError("Please enter both name and comment.");
      return;
    }

    const confirm = window.confirm(
      "Are you sure you want to comment?\n\nAll comments are moderated and may take time to appear."
    );

    if (confirm) {
      addComment(
        {
          url: `/blog/${blog?._id}/comment`,
          formData: { name: name.trim(), content: content.trim(), blogId: blog?._id },
        },
        {
          onSuccess: () => {
            setName("");
            setContent("");
            setError("");
            scroll?.();
          },
        }
      );
    }
  };

  return (
    <div className={styles.postFormContainer}>
      <form onSubmit={onSubmit} className={formStyles.form}>
        <div className={formStyles.inputGroup}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={formStyles.input}
            required
          />
        </div>

        <div className={formStyles.inputGroup}>
          <label htmlFor="content">Comment ({content.length}/280)</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts!"
            maxLength={280}
            className={formStyles.input}
            rows={4}
            required
          />
        </div>

        {error && <p className={formStyles.error}>{error}</p>}

        <div className={styles.button}>
          <button
            type="submit"
            className={formStyles.button}
            disabled={!name.trim() || !content.trim() || isLoading}
            aria-label="Post comment"
          >
            {isLoading ? <Loader /> : "Comment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
