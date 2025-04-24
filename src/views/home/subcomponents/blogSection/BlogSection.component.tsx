// components/blogSection/BlogSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./BlogSection.module.scss";
import Link from "next/link";
import BlogType from "@/types/BlogType";
import BlogCard from "@/components/blogCard/BlogCard.component";
import InfoContainer from "@/components/infoContainer/InfoContainer.component";

interface Props {
  blogs: BlogType[];
  recentBlogs: BlogType[];
}

const BlogSection = ({ blogs, recentBlogs }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className={styles.articleContainer}
    >
      <div className={styles.leftContainer}>
        <h1 className={`section-title`}>Featured Blog</h1>
        <div className={styles.featuredContainer}>
          <div className={styles.featuredBlog}>
            {
              // use the first blog in the array
              // if it exists
              blogs[0] ? (
                <BlogCard blog={blogs[0]} large />
              ) : (
                <div className={styles.featuredBlogContent}>
                  <h2>No Featured Blogs</h2>
                  <p>There are no featured blogs at this time.</p>
                </div>
              )
            }
          </div>
        </div>
        <div className={styles.mostRecentContainer}>
          <div className={styles.titleContainer}>
            <h1 className={`section-title`}>Most Recent Blogs</h1>
            <Link href="/blog">
              <button aria-label="See more blogs" className={styles.transitionButton}>
                See More
              </button>
            </Link>
          </div>
          <div className={`${styles.articlesContainer}`}>
            {recentBlogs?.map((blog) => {
              return <BlogCard blog={blog} key={blog._id} large={false} showDescription={true} />;
            })}
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}><InfoContainer /></div>
    </motion.div>
  );
};

export default BlogSection;
