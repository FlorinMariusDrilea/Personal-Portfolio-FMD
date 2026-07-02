export const profile = {
  name: "Florin Marius Drilea",
  role: "Software Engineer — Backend Focused",
  // Cycled by the hero typewriter; `role` above stays as the static
  // title for metadata and OG tags.
  roles: ["Backend Engineer", "Full-Stack Engineer", "Java Engineer"],
  location: "Bucharest, Romania and Sheffield, United Kingdom",
  tagline:
    "Backend engineer with 4+ years building scalable, high-performance systems in Java, Scala, and Spring Boot. Comfortable across the stack — from event-driven services and data pipelines to CI/CD, Kubernetes, and AWS. Also have experience using ReactJS for creating and connecting frontend components.",
  email: "marius.drilea2016@gmail.com",
  github: "https://github.com/FlorinMariusDrilea",
  linkedin: "https://www.linkedin.com/in/florin-marius-drilea/",
  cvPath: "/cv/Florin-Marius-Drilea-CV.pdf",
  openToRelocation: true,
} as const;

// Public site URL, used for metadata, OG tags, canonical links, and the sitemap.
// Resolution order:
//   1. NEXT_PUBLIC_SITE_URL — set this once you have a custom domain.
//   2. VERCEL_PROJECT_PRODUCTION_URL — auto-provided by Vercel; always points at
//      the production deployment (even on preview builds), which is what canonical
//      tags should reference.
//   3. localhost — local development fallback.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    role: "Software Engineer",
    company: "Zenitech Development",
    location: "Remote, Romania",
    period: "Nov 2025 — Present",
    bullets: [
      "Developing a scalable healthcare management application using Java, Spring Boot, GraphQL, Kafka and Redis.",
      "Enhanced system reliability and observability by implementing Kubernetes orchestration and monitoring.",
    ],
    stack: ["Java", "Spring Boot", "GraphQL", "PostgreSQL", "JWT", "Kafka", "Redis", "Kubernetes"],
  },
  {
    role: "Software Engineer",
    company: "Sky Betting & Gaming",
    location: "Leeds, UK",
    period: "Oct 2021 — Sep 2025",
    bullets: [
      "Developed and deployed customer-facing bet promotions in Java and Scala, contributing to a 10–20% engagement lift per promotion.",
      "Migrated critical legacy Jenkins CI pipelines to a modern platform, reducing deployment friction across teams.",
      "Moved customer data into Redis to accelerate access in latency-sensitive processes.",
      "Handled on-call duties and drove maintenance improvements that reduced call-outs by 50%.",
    ],
    stack: ["Java", "Scala", "Kafka", "Spring Boot", "Kubernetes", "Jenkins", "Redis", "Microservices"],
  },
  {
    role: "Graduate Software Engineer",
    company: "The Hut Group",
    location: "Manchester, UK",
    period: "Feb 2021 — Sep 2021",
    bullets: [
      "Built Java Spring Boot microservices with TDD in an Agile environment — reduced latency by ~25%.",
      "Developed an internal tool to track language translator contractors, boosting productivity by 30%.",
    ],
    stack: ["Java", "Spring Boot", "TDD", "Couchbase"],
  },
  {
    role: "Junior Java Developer",
    company: "UniCredit Services",
    location: "Iași, Romania",
    period: "Jul 2019 — Oct 2019",
    bullets: [
      "Contributed data extraction and processing features for an OCR-driven project using Java 8.",
    ],
    stack: ["Java 1.8", "Spring Boot", "JSON"],
  },
];

export type Project = {
  name: string;
  title: string;
  description: string;
  repo: string;
  // Live/deployed URL, shown as a "Live" link when present.
  homepage?: string;
  // Optional cover screenshot in /public (e.g. "/projects/foo.png"). When
  // absent, the card renders a generated cover from the primary tech.
  image?: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    name: "football-scouting-app",
    title: "Football Scouting App",
    description:
      "Application featuring robust backend architecture and data ingestion pipelines to scrape online football data, presented through a frontend dashboard with interactive filters and graphs.",
    homepage: "https://football-scouting-manager.vercel.app/",
    image: "/projects/football-scouting-app.png",
    repo: "https://github.com/FlorinMariusDrilea/football-scouting-app",
    stack: ["Java", "Spring Boot", "Data Scraping", "Frontend Dashboard", "ReactJS"],
  },
  {
    name: "Movie-Rating-Scraper",
    title: "Movie Rating Scraper Dashboard",
    description:
      "A movie scraping app with a frontEnd dashboard used for searching imdb and rotten tomatoes ratings.",
    repo: "https://github.com/FlorinMariusDrilea/Movie-Rating-Scraper",
    image: "/projects/movie-rating-scraper.png",
    stack: ["Python", "FastAPI", "PostgreSQL", "ReactJS", "Playwright"],
  },
  {
    name: "live-sports-tracking-system",
    title: "Live Sports Tracking System",
    description:
      "Java + Spring Boot microservice that ingests and exposes live sports data. Designed with clean service boundaries and testability in mind.",
    repo: "https://github.com/FlorinMariusDrilea/live-sports-tracking-system",
    stack: ["Java", "Spring Boot", "REST"],
  },
  {
    name: "Personal-Portfolio-FMD",
    title: "Personal Portfolio",
    description:
      "The site you're on — a backend engineer's portfolio built with the Next.js App Router and Tailwind, featuring light/dark theming, scroll-in animations, and an intro loader. Deployed on Vercel.",
    repo: "https://github.com/FlorinMariusDrilea/Personal-Portfolio-FMD",
    homepage: "https://personal-portfolio-fmd.vercel.app",
    image: "/projects/personal-portfolio-fmd.png",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "OnlineFootballManager",
    title: "Online Football Manager",
    description:
      "A simulation-style football manager written in Java — squad management, match simulation, and season progression.",
    repo: "https://github.com/FlorinMariusDrilea/OnlineFootballManager",
    image: "/projects/online-football-manager.png",
    stack: ["Java", "Spring Boot", "ReactJS", "PostgreSQL"],
  },
  {
    name: "DataScrapingScala",
    title: "Data Scraping in Scala",
    description:
      "Compact Scala scraper built to explore functional data extraction and transformation pipelines.",
    repo: "https://github.com/FlorinMariusDrilea/DataScrapingScala",
    stack: ["Scala", "Functional"],
  },
  {
    name: "Chess-Scala",
    title: "Chess in Scala",
    description:
      "Chess engine written in Scala — models pieces, moves, and game state using idiomatic functional patterns.",
    repo: "https://github.com/FlorinMariusDrilea/Chess-Scala",
    stack: ["Scala", "Domain modelling"],
  },
  {
    name: "WorldCup-Bet-Guesser",
    title: "World Cup Bet Guesser",
    description:
      "Java app that lets you predict World Cup match outcomes and scores your guesses against real results.",
    repo: "https://github.com/FlorinMariusDrilea/WorldCup-Bet-Guesser",
    image: "/projects/guesser-football.png",
    stack: ["Java", "ReactJS"],
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Java", "Scala", "Python"],
  },
  {
    label: "Frameworks & Data",
    items: [
      "Spring Boot",
      "JPA",
      "GraphQL",
      "Redis",
      "PostgreSQL",
      "Couchbase",
      "Liquibase",
      "React",
    ],
  },
  {
    label: "Infra & DevOps",
    items: [
      "Kafka",
      "Jenkins",
      "Kubernetes",
      "Docker",
      "Git",
      "AWS",
      "OpenAPI",
      "OAuth2/JWT",
    ],
  },
  {
    label: "Testing & Quality",
    items: ["Testcontainers", "JUnit", "WireMock", "SonarQube"],
  },
];

export type Hobby = { name: string };

export const hobbies: Hobby[] = [
  { name: "Football" },
  { name: "Gym" },
  { name: "Running" },
  { name: "Music" },
];

export const education = {
  degree: "B.Sc. Computer Science",
  school: "University of Sheffield",
  location: "United Kingdom",
  period: "2017 — 2020",
  notes: "Web officer of the Romanian Society · Student Ambassador · Mentor",
};

export const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2025",
  },
];
