import Hero from "./components/Hero"
import WearYourStory from "./components/WearYourStory"
import PortfolioGrid from "./components/PortfolioGrid"
import Marquee from "./components/Marquee"
import ContactForm from "./components/ContactForm"
import ClosingCTA from "./components/ClosingCTA"

export default function Home() {
  return (
    <>
      <Hero />
      <WearYourStory />
      <PortfolioGrid />
      <Marquee />
      <div className="relative w-full overflow-hidden">
        <div className="relative z-10">
          <ClosingCTA />
          <ContactForm />
        </div>
      </div>
    </>
  )
}
