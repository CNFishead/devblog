// components/blogSection/BlogSection.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./BlogSection.module.scss";
import Link from "next/link";
import BlogType from "@/types/BlogType";
import BlogCard from "@/components/blogCard/BlogCard.component";

interface Props {
  blogs: BlogType[];
  recentBlogs?: BlogType[];
}

const BlogSection = ({ blogs }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className={styles.articleContainer}
    >
      <div className={styles.leftContainer}>
        <div className={styles.titleContainer}>
          <h1 className={`section-title`}>Featured Blog</h1>
          <Link href={"/blog"}>
            <button className={styles.transitionButton}>See More</button>
          </Link>
        </div>
        <div className={styles.featuredContainer}>
            {
              blogs ? (
                blogs?.map((blog: BlogType) => <BlogCard blog={blog} large key={blog._id} />)
              ) : (
                <div className={styles.featuredBlogContent}>
                  <h2>No Featured Blogs</h2>
                  <p>There are no featured blogs at this time.</p>
                </div>
              )
            }
        </div>
      </div>
    </motion.div>
  );
};

export default BlogSection;
