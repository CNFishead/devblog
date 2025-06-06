import { Metadata } from "next";
import { notFound } from "next/navigation";
import axios from "@/utils/axios";
import ReadBlog from "@/views/blog/ReadBlog.view";
import BlogType from "@/types/BlogType";
import ProtectedContent from "@/layout/protectedContent/ProtectedContent.layout";

async function fetchBlog(slug: string): Promise<BlogType | null> {
  try {
    const { data } = await axios.get(`/blog/${slug}/public`);
    return { ...data.payload };
  } catch (err: any) {
    console.log(err);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBlog(slug);

  if (!blog) {
    return {
      title: "Blog not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${blog.blogTitle} | Austin Howard`,
    description: blog.description,
    openGraph: {
      title: blog.blogTitle,
      description: blog.description,
      images: [{ url: blog.blogImageUrl }],
      url: `https://blog.austinhoward.dev/blog/${blog.slug}`,
    },
    keywords: blog.tags?.join(","),
  };
} 
export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ admin?: string }>;
}) {
  const { slug } = await params;
  const { admin } = await searchParams;
  const isAdmin = admin === "true";
  const blog = (await fetchBlog(slug)) as BlogType;

  if (!blog && !isAdmin) notFound();
  const isPrivate = blog?.isPrivate && !isAdmin;

  return <>{isPrivate ? <ProtectedContent blog={blog} /> : <ReadBlog blog={blog} />}</>;
}
