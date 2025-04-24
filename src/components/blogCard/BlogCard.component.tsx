import BlogType from "@/types/BlogType";
import React from "react";
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

const BlogCard = ({ blog, large, showDescription }: BlogCardProps) => {
  return (
    <div className={styles.container}>
      {large ? (
        <div className={styles.featuredCard}>
          <div className={styles.imageContainer}>
            <Image alt={blog.blogTitle} src={blog?.blogImageUrl} layout="fill" />
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardTitle}>
              <h2>{blog?.blogTitle}</h2>
            </div>
            <div className={styles.description}>
              <div className={styles.meta}>
                <span className={styles.author}>{dayjs(blog?.publishedAt).format("MMM DD, YYYY")} by </span>
                <span className={styles.date}>{blog?.author}</span>
              </div>
              <p>
                {
                  // if the description is too long, truncate it, show a read more button
                  // and show the full description, if the see more button is clicked
                  blog?.description?.length > 200 ? `${blog?.description.substring(0, 150)}...` : blog.description
                }
              </p>
            </div>
            <div className={styles.actionContainer}>
              <Link href={`/blog/${blog.slug}`}>
                <button className={`transitionButton`} aria-label={`Read More: ${blog.blogTitle}`}>
                  Read More
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.article} key={blog._id}>
          <div className={styles.articleImage}>
            <Image alt={blog?.blogTitle} src={blog?.blogImageUrl} className={styles.image} layout="fill"  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
          </div>
          {/* just displaying the title and the date it was published */}
          <div className={styles.articleContent}>
            <div className={styles.titleContainer}>
              <h3 className="ellipsis">{blog?.blogTitle}</h3>
              <span className={styles.date}>{new Date(blog?.createdAt).toDateString()}</span>
            </div>
            <div className={styles.contentContainer}>
              {showDescription && (
                <p className={styles.description}>
                  {
                    // if the description is too long, truncate it, show a read more button
                    // and show the full description, if the see more button is clicked
                    blog?.description?.length > 200 ? `${blog?.description.substring(0, 150)}...` : blog.description
                  }
                </p>
              )}
              <div className={styles.actionContainer}>
                <Link href={`/blog/${blog?.slug}`}>
                  <button className={`transitionButton`} aria-label={`Read Blog ${blog.blogTitle}`}>
                    <MdOutlineOpenInNew />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
