"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

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
          // Figma: Geist Regular 16px, line-height 1.8, tracking -0.2px, white
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

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    // Figma: 1320 x 56, #222222, radius 16, 24px from top, no border/shadow
    <header className="relative z-20 mx-auto mt-6 w-[calc(100%-2rem)] max-w-[1320px] rounded-2xl bg-[#222222] text-white sm:w-[calc(100%-3rem)]">
      <nav
        className="flex h-14 items-center justify-between pr-2 pl-6"
        aria-label="Main navigation"
      >
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
            className="h-9 w-auto"
          />
        </Link>

        {/* links 40px apart, then 24px gap, divider, 24px gap, buttons 16px apart */}
        <div className="hidden items-center gap-6 pr-0 lg:flex">
          <div className="flex items-center gap-10">
            <NavigationLinks />
          </div>
          <span className="h-6 w-px bg-[#a8a8a8]" aria-hidden="true" />
          <div className="flex items-center gap-4">
            <Button
              render={<Link href="/login" />}
              variant="ghost"
              className="h-auto rounded-xl px-6 py-2 font-[family-name:var(--font-manrope)] text-lg leading-[1.45] font-semibold text-[#5c53fe] hover:bg-white/5 hover:text-[#7a73ff]"
            >
              Sign In
            </Button>
            <Button
              render={<Link href="/signup" />}
              className="h-10 rounded-xl border border-[#090a15]/10 bg-[#5c53fe] px-[22.5px] font-[family-name:var(--font-instrument-sans)] text-lg leading-[1.45] font-medium text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#4f46f0]"
            >
              Get Started
            </Button>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="mr-2 text-white hover:bg-white/10 hover:text-white lg:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </nav>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 px-6 py-5 lg:hidden"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4">
              <NavigationLinks onNavigate={closeMenu} />
            </div>
            <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row">
              <Button
                render={<Link href="/login" onClick={closeMenu} />}
                variant="ghost"
                className="h-10 justify-start rounded-xl px-0 font-[family-name:var(--font-manrope)] text-lg font-semibold text-[#5c53fe] hover:bg-white/5 hover:text-[#7a73ff] sm:justify-center sm:px-6"
              >
                Sign In
              </Button>
              <Button
                render={<Link href="/signup" onClick={closeMenu} />}
                className="h-10 rounded-xl bg-[#5c53fe] px-6 font-[family-name:var(--font-instrument-sans)] text-lg font-medium text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#4f46f0]"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}