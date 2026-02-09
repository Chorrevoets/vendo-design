"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { GetInTouchDialog } from "@/components/get-in-touch-dialog";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Approach", href: "#approach" },
  { label: "Case Studies", href: "/case-studies" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGetInTouchDialogOpen, setIsGetInTouchDialogOpen] = useState(false);
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? "bg-background/95 backdrop-blur-sm"
            : "bg-transparent"
          }`}
      >
        <div className="px-6 md:px-12 lg:px-24 flex items-center justify-between">
          {/* Logo */}
          {isHomePage ? (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:opacity-70 transition-opacity overflow-hidden rounded-b-[10px]"
            >
            <Image
              src="/logo.png"
              alt="Cen Logo"
              width={140}
              height={70}
              className="h-[70px] w-auto"
            />
          </a>
          ) : (
            <Link
              href="/"
              className="hover:opacity-70 transition-opacity overflow-hidden rounded-b-[10px]"
            >
              <Image
                src="/logo.png"
                alt="Cen Logo"
                width={140}
                height={70}
                className="h-[70px] w-auto"
              />
            </Link>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              ) : isHomePage ? (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={`/#${item.href.slice(1)}`}
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
            <Button
              size="sm"
              onClick={() => setIsGetInTouchDialogOpen(true)}
            >
              Get in touch
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-background border-b border-border px-6 py-6 flex flex-col gap-4">
            {navItems.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left text-muted-foreground hover:text-accent transition-colors py-2"
                >
                  {item.label}
                </Link>
              ) : isHomePage ? (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-muted-foreground hover:text-accent transition-colors py-2"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={`/#${item.href.slice(1)}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left text-muted-foreground hover:text-accent transition-colors py-2"
                >
                  {item.label}
                </Link>
              )
            )}
            <Button
              size="sm"
              className="w-fit mt-2"
              onClick={() => {
                setIsGetInTouchDialogOpen(true);
                setIsMobileMenuOpen(false);
              }}
            >
              Get in touch
            </Button>
          </nav>
        )}
      </header>
      <GetInTouchDialog open={isGetInTouchDialogOpen} onOpenChange={setIsGetInTouchDialogOpen} />
    </>
  );
}
