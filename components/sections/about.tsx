import { SectionHeading } from "@/components/sections/section-heading";

export function About() {
  return (
    <section id="about" className="py-16">
      <SectionHeading eyebrow="01 · About"/>
      <div className="max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground">
        <p>
          I&apos;m a software engineer with over four years of experience
          building server-side systems — mostly Java and Scala on Spring
          Boot — and a long-standing interest in the infrastructure that
          keeps them running. My work sits at the intersection of
          application code and platform: message pipelines, caches, CI, and
          the observability layer that makes on-call bearable.
        </p>
        <p>
          I&apos;m currently at Zenitech, building a healthcare platform on
          Spring Boot, GraphQL, Kafka, and Redis, orchestrated on
          Kubernetes. Before that I spent four years at Sky Betting &amp;
          Gaming, shipping high-traffic promotions, migrating legacy CI
          pipelines, and carrying the pager for the systems I helped build.
        </p>
        <p>
          Outside the day job I like building small side projects — usually
          with a football angle, because as a lifelong Manchester United
          supporter the theme picks itself. They&apos;re a good excuse to
          try tools I don&apos;t get to use at work.
        </p>
      </div>
    </section>
  );
}
