import BlogType from "@/types/BlogType";
import BlogPaginationContainer from "@/views/blog/Blog.view";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import styles from "./page.module.scss";

// Metadata for SEO
export const metadata = {
  title: "All Posts | Austin Howard's Developer Blog",
  description:
    "Browse all blog posts from Austin Howard. Explore full-stack development insights, technical tutorials, and reflections on faith and software.",
  openGraph: {
    title: "All Posts | Austin Howard's Developer Blog",
    description:
      "Discover the complete collection of blog articles from Austin Howard — covering code, creativity, and calling.",
    url: "https://blog.austinhoward.dev/blog",
    siteName: "Austin Howard Blog",
    images: [
      {
        url: "https://res.cloudinary.com/wulfdev/image/upload/v1745537492/og-blog-photo_ul2pt6.png",
        width: 1200,
        height: 630,
        alt: "Austin Howard Blog OG Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
type PageProps = {
  searchParams: { search: string };
};
export default async function Page({ searchParams }: PageProps) {
  const searchParam = await searchParams;
  const { search } = searchParam;
  const queryClient = new QueryClient();
  // Pre-fetch the first page of blogs for static generation
  await queryClient.prefetchQuery({ queryKey: [`blogs`, search, 1], queryFn: () => getInitialBlogs(1, search) });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className={styles.blogPageContainer}>
        <h1 className="section-title">All Blog Posts</h1>
        <BlogPaginationContainer initialSearch={search ?? ""} />
      </main>
    </HydrationBoundary>
  );
}
export async function getInitialBlogs(page: number = 1, search: string = ""): Promise<BlogType[]> {
  const res = await fetch(
    `${process.env.API_URL}/blog?pageNumber=${page}&limit=10&filterOptions=isPublished;true,isPrivate;false&keyword=${search}`,
    {
      next: { revalidate: 60 }, // Revalidate every 60s
    }
  );
  return res.json();
}
