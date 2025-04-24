"use client";

import styles from "./Comment.module.scss";
import { BsFillTrashFill } from "react-icons/bs"; 
import { useSearchParams } from "next/navigation";
import useApiHook from "@/state/useApi"; 
import timeDifference from "@/utils/timeDifference";

type Props = {
  comment: any;
  large?: boolean;
};

const Comment = ({ comment, large = false }: Props) => {
  const searchParams = useSearchParams();
  const blogId = searchParams.get("slug") || ""; // Assuming blog slug is in query

  const { mutate: deleteComment, isLoading } = useApiHook({
    method: "DELETE",
    key: "comment",
  }) as any;
  if (!comment) return null;

  return (
    <div className={`${styles.commentContainer} ${large ? styles.large : ""}`}>
      <div className={styles.commentHeader}>
        <span className={styles.commentName}>{comment.name}</span>
        <span className={styles.commentDate}>{timeDifference(new Date(), new Date(comment.createdAt))}</span>
      </div>

      <p className={styles.commentText}>{comment.content}</p>

      {/* You can conditionally render admin-only delete button here */}
      {/* <button
        className={styles.deleteButton}
        onClick={() => deleteComment({ commentId: comment._id })}
        disabled={isLoading}
      >
        <BsFillTrashFill />
        Delete
      </button> */}
    </div>
  );
};

export default Comment;
