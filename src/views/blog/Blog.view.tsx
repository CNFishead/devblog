"use client";
import BlogCard from "@/components/blogCard/BlogCard.component";
import useApiHook from "@/state/useApi";
import { useState } from "react";
import styles from "./Blog.module.scss";
import Paginator from "@/components/pagination/Paginator.component";

const PAGE_SIZE = 10;
type Props = {
  initialSearch: string;
};
export default function BlogPaginationContainer({ initialSearch }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(initialSearch);
  const [activeSearch, setActiveSearch] = useState(initialSearch);

  const { data, isLoading, isError } = useApiHook({
    url: `/blog`,
    key: ["blogs", activeSearch, page],
    method: "GET",
    filter: `isPublished;true,isPrivate;false`,
    keyword: activeSearch,
    limit: PAGE_SIZE,
    pageNumber: page,
  }) as any;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setActiveSearch(search);
  };
 

  return (
    <div className={styles.blogPaginationContainer}>
      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search blog posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {isLoading ? (
        <p>Loading posts...</p>
      ) : isError ? (
        <p>Failed to load posts.</p>
      ) : (
        <div className={styles.blogContainer}>
          {data?.blogs?.map((blog: any) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
          {data?.pages > 1 && (
            <Paginator currentPage={page} totalPages={data.pages} onPageChange={(newPage) => setPage(newPage)} />
          )}
        </div>
      )}
    </div>
  );
}
