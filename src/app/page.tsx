// app/page.tsx
import Home from "@/views/home/Home.view";
import styles from "./page.module.css";
import axios from "@/utils/axios";

// Metadata for SEO
export const metadata = {
  title: "Austin Howard | Developer Blog",
  description:
    "Explore technical insights, personal growth, and faith-driven reflections by Austin Howard — a full-stack developer and creator of ShepherdCMS.",
  openGraph: {
    title: "Austin Howard | Developer Blog",
    description:
      "Follow the journey of a Christian software engineer blending full-stack development with faith-based innovation.",
    url: "https://blog.austinhoward.dev",
    siteName: "Austin Howard Blog",
    images: [
      {
        url: "https://res.cloudinary.com/wulfdev/image/upload/v1713140000/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Austin Howard Blog OG Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function Page() {
  let blogs = [];
  try {
    const { data } = await axios.get(`/blog`, {
      params: {
        filterOptions: "isPublished;true,isFeatured;true,isPrivate;false",
        limit: "3",
      },
    });
    blogs = data.blogs;
  } catch (err) {
    console.error("Error fetching featured blogs:", err);
  }
  return (
    <div className={styles.page}>
      <Home blogs={blogs} />
    </div>
  );
}
