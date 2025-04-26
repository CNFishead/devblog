import BlogType from "@/types/BlogType";
import React, { useState } from "react";
import styles from "./BlogCard.module.scss";
import Link from "next/link";
import dayjs from "dayjs";
import { MdOutlineOpenInNew } from "react-icons/md";
import Image from "next/image";

interface BlogCardProps {
  blog: BlogType;
  large?: boolean;
  showDescription?: boolean;
}

const BlogCard = ({ blog, large, showDescription = true }: BlogCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const truncate = (text: string, limit = 150) => (text.length > limit ? `${text.substring(0, limit)}...` : text);

  const handleToggle = () => setExpanded((prev) => !prev);

  return (
    <div className={styles.container}>
      {large ? (
        <div className={styles.featuredCard}>
          <div className={styles.imageContainer}>
            <Image alt={blog.blogTitle} src={blog?.blogImageUrl} className={styles.image} width={400} height={400}/>
          </div>
          <div className={styles.cardBody}>
            <h2 className={`${styles.cardTitle} ellipsis`}>{blog?.blogTitle}</h2>
            <div className={styles.meta}>
              <span>
                {dayjs(blog?.publishedAt).format("MMM DD, YYYY")} by {blog?.author}
              </span>
            </div>
            <p className={styles.description}>
              {expanded ? blog.description : truncate(blog.description)}
              {blog.description.length > 150 && (
                <button className={styles.toggleBtn} onClick={handleToggle}>
                  {expanded ? "See Less" : "See More"}
                </button>
              )}
            </p>
            <Link href={`/blog/${blog.slug}`} className={styles.readMore}>
              Read More
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.article}>
          <div className={styles.articleImage}>
            <Image
              alt={blog?.blogTitle}
              src={blog?.blogImageUrl}
              className={styles.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className={styles.articleContent}>
            <div className={styles.titleContainer}>
              <h3 className={styles.ellipsis}>{blog?.blogTitle}</h3>
              <span className={styles.date}>
                {dayjs(blog?.createdAt).format("MMM DD, YYYY")} by {blog?.author}
              </span>
            </div>
            {showDescription && (
              <div className={styles.contentContainer}>
                <p className={styles.description}>{expanded ? blog.description : truncate(blog.description)}</p>
                {blog.description.length > 150 && (
                  <button className={styles.toggleBtn} onClick={handleToggle}>
                    {expanded ? "See Less" : "See More"}
                  </button>
                )}
              </div>
            )}
            <div className={styles.actionContainer}>
              <Link href={`/blog/${blog?.slug}`}>
                <button className={styles.readIconButton} aria-label={`Read Blog ${blog.blogTitle}`}>
                  <MdOutlineOpenInNew />
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
