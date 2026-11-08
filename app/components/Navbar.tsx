"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { useSession, signOut } from "@/lib/auth-client"

const navigation = [
  { label: "Browse Jobs", href: "#jobs" },
  { label: "Company", href: "#company" },
  { label: "Pricing", href: "#pricing" },
]

function NavigationLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="font-[family-name:var(--font-geist)] text-base leading-[1.8] font-normal tracking-[-0.2px] text-white transition-colors hover:text-white/70"
          onClick={onNavigate}
        >
          {item.label}
        </Link>
      ))}
    </>
  )
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLElement>(null)
  const { data: session } = useSession()

  function closeMenu() {
    setIsMenuOpen(false)
  }

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev)
  }

  // Close menu on outside click and Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu()
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      closeMenu()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <header
      ref={menuRef}
      className="relative z-50 mx-auto mt-6 w-[calc(100%-2rem)] max-w-[1320px] rounded-2xl bg-[#222222] text-white sm:w-[calc(100%-3rem)]"
    >
      <nav
        className="flex h-14 items-center justify-between pr-2 pl-6"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 rounded-sm focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"
          aria-label="Hireloop home"
          onClick={closeMenu}
        >
          <Image
            src="/resources/images/logo.png"
            alt="Hireloop"
            width={154}
            height={44}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          <div className="flex items-center gap-10">
            <NavigationLinks />
          </div>

          <span className="h-6 w-px bg-[#a8a8a8]" aria-hidden="true" />

          <div className="flex items-center gap-4">
            {session?.user ? (
              <>
              <span className="max-w-48 truncate px-3 font-[family-name:var(--font-manrope)] text-lg font-semibold text-white">
                {session.user.name}
              </span>
              <Button
                onClick={handleSignOut}
                  nativeButton={false}
                  className="cursor-pointer h-10 rounded-xl border border-[#090a15]/10 bg-[#5c53fe] px-[22.5px] font-[family-name:var(--font-instrument-sans)] text-lg leading-[1.45] font-medium text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#4f46f0]"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  nativeButton={false}
                  render={<Link href="/signin" />}
                  variant="ghost"
                  className="h-auto rounded-xl px-6 py-2 font-[family-name:var(--font-manrope)] text-lg leading-[1.45] font-semibold text-[#5c53fe] hover:bg-white/5 hover:text-[#7a73ff]"
                >
                  Sign In 
                </Button>

                <Button
                  nativeButton={false}
                  render={<Link href="/signup" />}
                  className="h-10 rounded-xl border border-[#090a15]/10 bg-[#5c53fe] px-[22.5px] font-[family-name:var(--font-instrument-sans)] text-lg leading-[1.45] font-medium text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#4f46f0]"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={toggleMenu}
          className="mr-1 flex size-10 shrink-0 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none lg:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 px-6 py-5 lg:hidden"
        >
          <div className="flex flex-col gap-5">
            {/* Navigation Links */}
            <div className="flex flex-col gap-4">
              <NavigationLinks onNavigate={closeMenu} />
            </div>

            {/* Auth Buttons */}
            <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row">
              {session?.user ? (
                <span className="px-0 font-[family-name:var(--font-manrope)] text-lg font-semibold text-white">
                  {session.user.name}
                </span>
              ) : (
                <>
                  <Button
                    nativeButton={false}
                    render={<Link href="/signin" onClick={closeMenu} />}
                    variant="ghost"
                    className="h-10 justify-start rounded-xl px-0 font-[family-name:var(--font-manrope)] text-lg font-semibold text-[#5c53fe] hover:bg-white/5 hover:text-[#7a73ff] sm:justify-center sm:px-6"
                  >
                    Sign In
                  </Button>

                  <Button
                    nativeButton={false}
                    render={<Link href="/signup" onClick={closeMenu} />}
                    className="h-10 rounded-xl bg-[#5c53fe] px-6 font-[family-name:var(--font-instrument-sans)] text-lg font-medium text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#4f46f0]"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
