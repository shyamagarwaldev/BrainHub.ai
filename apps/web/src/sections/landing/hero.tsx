import Container from "@/components/shared/container";
import HeroContent from "./hero-content";
import HeroIllustration from "./hero-illustration";

export default function Hero() {
  return (
    <section className="py-20">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <HeroContent />

          <HeroIllustration />
        </div>
      </Container>
    </section>
  );
}
