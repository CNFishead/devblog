"use client";
import React, { useState, useEffect } from "react";
import styles from "./ReadBlog.module.scss";
import contentStyles from "./Content.module.scss";
import parser from "html-react-parser";
import BlogType from "@/types/BlogType";
import InfoContainer from "@/components/infoContainer/InfoContainer.component";
// import CommentForm from "@/components/comments/comment-form/CommentForm.component";
// import CommentItem from "@/components/comments/commentItem/CommentItem.component";
// import useGetComments from "@/state/blog/useGetComments";
import { FaCalendarAlt, FaComment, FaCommentAlt, FaEye, FaTags, FaTimes, FaUser } from "react-icons/fa";
import VideoPlayer from "@/components/videoPlayer/VideoPlayer.component";
import useApiHook from "@/state/useApi";

interface ReadBlogProps {
  blog: BlogType;
}

const ReadBlog = ({ blog }: ReadBlogProps) => {
  const [showComments, setShowComments] = useState(false);
  const {
    data: commentData,
    isLoading: commentsLoading,
    isError: commentsError,
  } = useApiHook({
    method: "GET",
    url: `/comment/${blog._id}`,
    filter: "isFlagged;false",
    key: ["comments", blog._id],
    enabled: !!blog,
  }) as any;

  useEffect(() => {
    // optional: update views here
  }, [blog]);

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <h1 className="section-title">{blog.blogTitle}</h1>

        {blog.blogImageUrl && (
          <div className={styles.coverImageContainer}>
            <img src={blog.blogImageUrl} alt={blog.blogTitle} />
          </div>
        )}

        {blog.isVlog && (
          <div className={styles.videoContainer}>
            <VideoPlayer video={blog} />
          </div>
        )}

        <div className={styles.metaContainer}>
          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <FaUser /> {blog.author}
            </span>
            <span className={styles.metaItem}>
              <FaCalendarAlt /> {new Date(blog.createdAt).toLocaleDateString()}
            </span>
            <span className={styles.metaItem}>
              <FaEye /> {blog.viewsCount}
            </span>
            <span className={styles.metaItem}>
              <FaComment /> {blog.commentsCount}
            </span>
          </div>
          <div className={styles.description}>
            {blog.description && (
              <span className={`${styles.metaItem} ${styles.descriptionContainer}`}>{blog.description}</span>
            )}
          </div>
        </div>

        <div className={`${styles.contentContainer} ${contentStyles.contentContainer}`}>
          {parser(`${parser(blog.content || "")}`)}
        </div>

        <div className={`${styles.metaContainer} ${styles.metaFooterContainer}`}>
          <FaTags />
          {blog.tags?.map((tag, i) => (
            <span key={i} className={styles.tagItem}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.rightContainer}>
        {showComments ? (
          <div className={styles.commentContainer}>
            <div className={styles.titleContainer}>
              <h2 className="section-title">Comments</h2>
              <FaTimes className={styles.closeButton} onClick={() => setShowComments(false)} />
            </div>
            {/* <CommentForm blog={blog} /> */}
            {commentData?.comments?.map((c: any) => (
              <></>
              // <CommentItem key={c._id} comment={c} />
            ))}
          </div>
        ) : (
          <InfoContainer />
        )}
      </div>

      {!showComments && (
        <div
          id="commentsContainer"
          className={styles.showCommentsButtonContainer}
          onClick={() => setShowComments(true)}
        >
          <button className={styles.showCommentsButton}>
            <FaCommentAlt />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReadBlog;
