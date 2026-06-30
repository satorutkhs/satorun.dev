"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-jal-border-light transition-all duration-300 ${
        scrolled ? "shadow-[0_2px_15px_rgba(0,0,0,0.05)] py-2" : "py-3"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-8 flex items-center justify-between h-14">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-jal-dark font-bold text-base tracking-tight hover:text-jal-red transition-colors group"
        >
          <span className="w-7 h-7 bg-jal-red rounded-full flex items-center justify-center text-white text-xs font-bold transition-transform duration-300 group-hover:scale-105">
            S
          </span>
          <span className="hidden sm:inline tracking-wide">satorun.dev</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-xs font-bold uppercase tracking-[0.1em] text-jal-text-secondary hover:text-jal-red transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {/* Research (protected) */}
          <li>
            <Link
              href="/research"
              className="text-xs font-bold uppercase tracking-[0.1em] text-jal-text-secondary hover:text-jal-red transition-colors duration-200 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px] select-none">lock</span>
              Research
            </Link>
          </li>
        </ul>

        {/* Login Button (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="btn-secondary interactive-press text-[10px] uppercase tracking-widest font-bold py-2 px-4 rounded border border-jal-border"
          >
            <span className="material-symbols-outlined text-[14px] select-none">login</span>
            ログイン
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2 rounded hover:bg-jal-bg transition-colors"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-jal-dark transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-jal-dark transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-jal-dark transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-jal-border-light animate-fade-in shadow-lg">
          <ul className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-xs font-bold uppercase tracking-[0.1em] text-jal-text-secondary hover:text-jal-red transition-colors border-b border-jal-border-light"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/research"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-1 py-3 text-xs font-bold uppercase tracking-[0.1em] text-jal-text-secondary hover:text-jal-red transition-colors border-b border-jal-border-light"
              >
                <span className="material-symbols-outlined text-[14px] select-none">lock</span>
                Research
              </Link>
            </li>
            <li className="pt-3">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="btn-primary text-xs py-2.5 justify-center w-full rounded font-bold uppercase tracking-[0.1em]"
              >
                <span className="material-symbols-outlined text-[16px] select-none">login</span>
                ログイン
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
