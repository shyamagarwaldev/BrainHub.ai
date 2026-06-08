import Container from "@/components/shared/container";
import HeroContent from "./hero-content";
import HeroIllustration from "./hero-illustration";

export default function Hero() {
  return (
    <section className="py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <HeroContent />

          <HeroIllustration />
        </div>
      </Container>
    </section>
  );
}
