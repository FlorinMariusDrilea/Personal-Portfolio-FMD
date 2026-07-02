import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { getProjectsWithGithub } from "@/lib/github";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";
import { Hobbies } from "@/components/sections/hobbies";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

const divider = (
  <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
);

export default async function Home() {
  const projects = await getProjectsWithGithub();

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-4xl px-6">
        <Hero />
        {divider}
        <Reveal>
          <About />
        </Reveal>
        {divider}
        <Reveal>
          <Experience />
        </Reveal>
        {divider}
        <Reveal>
          <Projects projects={projects} />
        </Reveal>
        {divider}
        <Skills />
        {divider}
        <Reveal>
          <Education />
        </Reveal>
        {divider}
        <Reveal>
          <Hobbies />
        </Reveal>
        {divider}
        <Reveal>
          <Contact />
        </Reveal>
        <Footer />
      </main>
    </>
  );
}
