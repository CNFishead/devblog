import Link from "next/link";
import styles from "./not-found.module.scss"; // Optional: create for custom styling

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 – Page Not Found</h1>
      <p className={styles.description}>
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link href="/" className={styles.backLink}>
        Go back home →
      </Link>
    </div>
  );
}
