import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default async function Home() {

  return (

    <>
      <AuroraBackground>
        <Hero />
        <Features />
      </AuroraBackground>
      <Footer />
    </>
  )
}