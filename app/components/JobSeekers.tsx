import { BriefcaseBusiness, Star, UserSearch } from "lucide-react"
import type { ReactNode } from "react"

// Matches the "ranking" podium icon in Figma
function RankingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 9h5v12H3zM8 3h8v18H8zM16 13h5v8h-5z" />
    </svg>
  )
}

const stats: { icon: ReactNode; value: string; label: string }[] = [
  {
    icon: <BriefcaseBusiness className="size-6" strokeWidth={1.5} />,
    value: "50K",
    label: "Active Jobs",
  },
  { icon: <RankingIcon />, value: "12K", label: "Companies" },
  {
    icon: <UserSearch className="size-6" strokeWidth={1.5} />,
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: <Star className="size-6" strokeWidth={1.5} />,
    value: "97%",
    label: "Satisfaction Rate", // Figma has the typo "Satisfication"
  },
]

export function JobSeekersStats() {
  return (
    // Figma: 72px top/bottom, 60px sides, 48px between title and cards
    <section
      aria-labelledby="job-seekers-heading"
      className="relative px-4 py-16 text-white sm:px-6 lg:px-[60px] lg:py-[72px]"
    >
      <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-12">
        <h2
          id="job-seekers-heading"
          className="max-w-[600px] text-center font-[family-name:var(--font-instrument-sans)] text-[28px] leading-[1.3] font-medium tracking-[-1px] text-white/70 sm:text-4xl lg:text-[40px]"
        >
          Assisting over 15,000 job seekers find their dream positions.
        </h2>

        <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            // Figma card: 312 x 254, radius 16, 1px white/10, dark gradient, 24px padding
            <li
              key={stat.label}
              className="flex flex-col gap-[72px] rounded-2xl border border-white/10 p-6 [background-image:linear-gradient(180deg,#010102_12%,#1b1b1b_100%)]"
            >
              {stat.icon}
              <div className="flex flex-col gap-4">
                <p className="font-[family-name:var(--font-plus-jakarta)] text-5xl leading-[1.15] font-semibold tracking-[-0.02em] lg:text-[56px]">
                  {stat.value}
                </p>
                <p className="font-[family-name:var(--font-inter-tight)] text-lg leading-[1.65]">
                  {stat.label}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}