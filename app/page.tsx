import { Hero } from "./components/Hero";
import { HeroStage } from "./components/HeroStage";
import { JobSeekersStats } from "./components/JobSeekers";
import { Navbar } from "./components/Navbar";


export default function Home() {
  return (
    <main className="bg-[#010103]">
      <HeroStage>
        <Navbar />
        <Hero />
        <JobSeekersStats />
      </HeroStage>
      {/* next sections */}
    </main>
  )
}