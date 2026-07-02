import type { IconType } from "react-icons";
import { FaAws, FaJava } from "react-icons/fa";
import {
  SiApachekafka,
  SiCouchbase,
  SiDocker,
  SiGit,
  SiGraphql,
  SiHibernate,
  SiJenkins,
  SiJsonwebtokens,
  SiJunit5,
  SiKubernetes,
  SiLiquibase,
  SiNextdotjs,
  SiOpenapiinitiative,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiScala,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

// Shared brand-icon lookup used by the Skills chips and Project card covers.
export const techIcons: Record<string, IconType> = {
  Java: FaJava,
  Scala: SiScala,
  Python: SiPython,
  "Spring Boot": SiSpringboot,
  JPA: SiHibernate,
  GraphQL: SiGraphql,
  Redis: SiRedis,
  PostgreSQL: SiPostgresql,
  Couchbase: SiCouchbase,
  Liquibase: SiLiquibase,
  React: SiReact,
  ReactJS: SiReact,
  Kafka: SiApachekafka,
  Jenkins: SiJenkins,
  Kubernetes: SiKubernetes,
  Docker: SiDocker,
  Git: SiGit,
  AWS: FaAws,
  OpenAPI: SiOpenapiinitiative,
  "OAuth2/JWT": SiJsonwebtokens,
  JUnit: SiJunit5,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
};

// First stack entry that has a matching brand icon — used for the card cover.
export function primaryIcon(stack: string[]): IconType | undefined {
  for (const tech of stack) {
    if (techIcons[tech]) return techIcons[tech];
  }
  return undefined;
}
