import Image from "next/image"
import type { ReactNode } from "react"

/**
 * Shared dark stage for Navbar + Hero + JobSeekersStats.
 * globe.png (1440x1882) sits behind all three, on the #010103 page background.
 *
 * NOTE: the exported globe.png has a magenta glow baked into its top ~600px
 * (rows 0-600, rgb ~220,0,206). The Figma frame doesn't show it, so we fade
 * the top of the image out with a vertical mask. The blue globe glow starts
 * at ~y=650, so nothing of the globe is lost.
 */
export function HeroStage({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate overflow-hidden bg-[#010103]">
      {/* vertical mask: hides the pink top, reveals the globe */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent_0,transparent_28%,black_37%)]"
      >
        {/* horizontal mask: soft left/right edges */}
        <div className="flex justify-center [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <Image
            src="/resources/images/globe.png"
            alt=""
            width={1440}
            height={1882}
            priority
            sizes="(min-width: 1024px) 1440px, 1100px"
            className="h-auto w-[900px] max-w-none sm:w-[1100px] lg:w-[1440px]"
          />
        </div>
      </div>
      {/* fades the lower edge of the artwork into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-[#010103]"
      />
      {children}
    </div>
  )
}