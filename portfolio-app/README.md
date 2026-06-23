# Arul S — Portfolio (Angular + Three.js)

Modern, interactive portfolio website built with **Angular 19** and **Three.js** particle animations.

## Features

- **Three.js hero background** — Interactive 3D particle field with mouse-reactive rings
- **Animated sections** — Scroll reveal, typewriter effect, floating skill badges
- **Download Resume** — Generates and downloads `Arul_S_Resume.pdf` from your resume data
- **Contact form** — EmailJS integration (or mailto fallback)
- **Fully responsive** — Mobile-friendly navigation and layout
- **Dark theme** — Modern cyan/purple gradient design

## Quick Start

```bash
cd portfolio-app
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200)

## Build for Production

```bash
npm run build
```

Output: `dist/portfolio-app/browser/`

## Deploy to Vercel

This repo includes `vercel.json` at the root. Push to GitHub and redeploy.

**Vercel project settings (recommended):**

| Setting | Value |
|---------|--------|
| Root Directory | `portfolio-app` |
| Build Command | `npm run build` |
| Output Directory | `dist/portfolio-app/browser` |
| Install Command | `npm install` |

If Root Directory is left empty, the root `vercel.json` handles the build automatically.

**Why the 404 happened:** Angular 19 puts the built site in `dist/portfolio-app/browser/`, not `dist/portfolio-app/`. Vercel was serving an empty/wrong folder.


For direct form sending without opening the email client:

1. Create a free account at [EmailJS](https://www.emailjs.com/)
2. Create a service, template, and get your public key
3. Update `src/environments/environment.ts`:

```typescript
emailJs: {
  serviceId: 'your_service_id',
  templateId: 'your_template_id',
  publicKey: 'your_public_key',
}
```

Until configured, the contact form opens your default email client with a pre-filled message.

## Project Structure

```
src/app/
├── components/
│   ├── header/          # Sticky navigation
│   ├── hero/            # Hero + Three.js background
│   ├── three-background/
│   ├── about/
│   ├── skills/
│   ├── experience/
│   ├── projects/
│   └── contact/         # Contact form + footer
├── data/portfolio.data.ts   # All resume content (edit here)
└── services/
    ├── email.service.ts
    └── resume.service.ts
```

## Customize Content

Edit `src/app/data/portfolio.data.ts` to update your name, skills, experience, projects, and contact info.

## Profile Photo

Replace `public/assets/profile.jpg` with your photo.
