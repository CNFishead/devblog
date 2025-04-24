import React from "react";
import styles from "./Home.module.scss";
import HeroSection from "./subcomponents/heroSection/HeroSection.component";
import BlogType from "@/types/BlogType";
import BlogSection from "./subcomponents/blogSection/BlogSection.component";
import ConnectedDots from "@/components/dots/ConnectedDots.component";

interface Props {
  blogs: BlogType[];
  recentBlogs: BlogType[];
}

const Home = ({ blogs, recentBlogs }: Props) => {
  return (
    <div className={styles.container}>
      <HeroSection />
      <BlogSection blogs={blogs} recentBlogs={recentBlogs} />
    </div>
  );
};

export default Home;
