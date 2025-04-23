"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Navbar.module.scss";
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchValue.trim();
    if (!trimmed) return;
    const encoded = encodeURIComponent(trimmed);
    window.location.href = `/search?search=${encoded}`;
  };

  // set search bar to close on route change
  useEffect(() => {
    setSearchVisible(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link href="/">
          <div className={styles.logo}>
            <Image src="/images/logo-192x192.png" alt="logo" width={50} height={50} />
            <span className={styles.logoText}>The Digital Adventure</span>
          </div>
        </Link>

        <ul className={styles.desktopNav}>
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <Link href={href} className={`${styles.navLink} ${pathname === href ? styles.active : ""}`}>
                {label}
              </Link>
            </li>
          ))}
          <button
            className={styles.searchToggle}
            onClick={() => setSearchVisible((s) => !s)}
            aria-label="Toggle search bar"
          >
            <AiOutlineSearch />
          </button>
        </ul>

        <button className={styles.menuToggle} onClick={() => setMenuOpen((m) => !m)} aria-label="Toggle menu">
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>

        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                className={styles.backdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
              />
              <motion.ul className={styles.mobileNav} initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}>
                {navLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} onClick={() => setMenuOpen(false)} className={styles.navLink}>
                      {label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    className={styles.searchToggleMobile}
                    onClick={() => {
                      setSearchVisible(!searchVisible);
                      setMenuOpen(false); // hide menu when showing search
                    }}
                    aria-label="Open search bar"
                  >
                    <AiOutlineSearch />
                    <span>Search</span>
                  </button>
                </li>
              </motion.ul>
            </>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {searchVisible && (
          <motion.div
            className={styles.searchBar}
            initial={{ maxHeight: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
            animate={{ maxHeight: 100, opacity: 1, paddingTop: "1rem", paddingBottom: "1rem" }}
            exit={{ maxHeight: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={styles.searchInput}
                placeholder="Search blog..."
              />
              <button type="submit" className={styles.searchButton} aria-label="Submit search">
                <BiSearchAlt />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
