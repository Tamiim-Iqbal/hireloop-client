import { BriefcaseBusiness, MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"

const trendingSearches = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

// Background (globe, glow, stars) now lives in <HeroStage /> as globe.png.
export function Hero() {
  return (
    // Figma: badge starts 176px below the navbar; stats section starts ~286px below the trending row
    <section className="relative px-4 pt-20 pb-24 text-white sm:px-6 lg:pt-44 lg:pb-[286px]">
      <div className="mx-auto flex max-w-[784px] flex-col items-center text-center">
        {/* Badge: 48px pill with 64px fading rules on both sides */}
        <div className="flex items-center justify-center">
          <span
            aria-hidden="true"
            className="hidden h-px w-16 [background-image:linear-gradient(90deg,#010123,#a8a8a8)] opacity-70 sm:block"
          />
          <div className="inline-flex h-12 items-center gap-3 rounded-3xl border border-transparent px-5 shadow-[inset_0_0_6px_6px_rgba(0,0,0,0.1)] [background:linear-gradient(180deg,#1b1b1b,#010102)_padding-box,linear-gradient(180deg,rgba(168,168,168,0.3),rgba(153,153,153,0))_border-box] sm:gap-4 sm:px-6">
            <BriefcaseBusiness className="size-6 shrink-0 text-[#d4defc]" />
            <span className="font-[family-name:var(--font-space-mono)] text-sm leading-[1.2] text-white sm:text-xl">
              50,000+ new jobs this month
            </span>
          </div>
          <span
            aria-hidden="true"
            className="hidden h-px w-16 [background-image:linear-gradient(90deg,#a8a8a8,#010123)] opacity-70 sm:block"
          />
        </div>

        <h1 className="mt-8 font-[family-name:var(--font-manrope)] text-[40px] leading-[1.15] font-bold tracking-[-0.02em] sm:text-5xl lg:text-[56px]">
          Find Your Dream Job Today
        </h1>
        <p className="mt-4 max-w-[784px] font-[family-name:var(--font-manrope)] text-base leading-[1.6] text-white/70 sm:text-xl">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar: 784 x 64, #101010, 1px white/20, radius 16 */}
        <form className="mt-12 flex w-full flex-col gap-1 rounded-2xl border border-white/20 bg-[#101010] p-2 sm:h-16 sm:flex-row sm:items-center sm:gap-6 sm:py-2 sm:pr-2 sm:pl-6">
          <label className="flex min-w-0 flex-1 items-center gap-2 px-3 py-3 text-left sm:p-0">
            <Search
              className="size-6 shrink-0 text-white"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <input
              type="text"
              name="query"
              placeholder="Job title, skill or company"
              className="min-w-0 flex-1 bg-transparent font-[family-name:var(--font-satoshi,var(--font-manrope))] text-base leading-[1.7] text-white/80 outline-none placeholder:text-white/80"
              aria-label="Job title, skill or company"
            />
          </label>
          <div
            aria-hidden="true"
            className="mx-3 h-px bg-white/20 sm:mx-0 sm:h-[23px] sm:w-px"
          />
          <label className="flex min-w-0 flex-1 items-center gap-2 px-3 py-3 text-left sm:p-0">
            <MapPin
              className="size-6 shrink-0 text-white"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <input
              type="text"
              name="location"
              placeholder="Location or Remote"
              className="min-w-0 flex-1 bg-transparent font-[family-name:var(--font-satoshi,var(--font-manrope))] text-base leading-[1.7] text-white/80 outline-none placeholder:text-white/80"
              aria-label="Location or Remote"
            />
          </label>
          <Button
            type="submit"
            size="icon"
            className="mt-1 h-12 w-full shrink-0 rounded-xl bg-[#5c53fe] text-white hover:bg-[#4f46f0] sm:mt-0 sm:size-12"
            aria-label="Search jobs"
          >
            <Search className="size-6" />
          </Button>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <span className="font-[family-name:var(--font-manrope)] text-base leading-[1.3] text-white/70">
            Trending Position
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {trendingSearches.map((item) => (
              <button
                key={item}
                type="button"
                className="rounded-3xl border border-white/10 bg-[#1a1a1b] px-3 py-1.5 font-[family-name:var(--font-manrope)] text-sm leading-[1.5] text-white transition-colors hover:border-[#5c53fe]/60"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
