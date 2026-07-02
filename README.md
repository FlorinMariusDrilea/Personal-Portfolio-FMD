# Personal-Portfolio-FMD

Personal portfolio website of **me** — a backend-focused software
engineer working mostly in Java, Scala, and Spring Boot. It presents a short bio,
work experience, selected projects, skills, and education, with a downloadable CV
and links to GitHub and LinkedIn.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4
- Local shadcn-style UI primitives (`components/ui`)
- [next-themes](https://github.com/pacocoursey/next-themes) for dark/light mode
- [lucide-react](https://lucide.dev) for icons
- Deployed on [Vercel](https://vercel.com)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Editing content

All site content — profile, experience, projects, skills, and education — lives in a
single file: [`lib/data.ts`](lib/data.ts). Edit it and every section updates
automatically. Colours and theme tokens are defined as CSS variables in
[`app/globals.css`](app/globals.css).

## Configuration

Set `NEXT_PUBLIC_SITE_URL` to the production domain so canonical URLs, Open Graph
tags, and the sitemap resolve correctly (e.g. as a Vercel project environment
variable).

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint
