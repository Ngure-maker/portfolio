# Ngure - Personal Portfolio Website

Premium creative agency-quality portfolio website showcasing dual expertise in Software Engineering and Creative Production.

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript, GSAP, Lenis, Swiper.js
- **Backend**: Node.js, Express.js, EJS
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: JWT with bcrypt
- **Media**: Cloudinary (optional)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up PostgreSQL database and update `DATABASE_URL` in `.env`
4. Run database migrations:
   ```bash
   npm run db:push
   ```
5. Seed the database:
   ```bash
   npm run db:seed
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```
7. Visit `http://localhost:3000`

## Admin Panel

- URL: `/auth/login`
- Default credentials: `admin@ngure.dev` / `admin123`

## Project Structure

```
portfolio/
├── public/          # Static assets (CSS, JS, images, etc.)
├── views/           # EJS templates
│   ├── layouts/     # Main layout
│   ├── partials/    # Reusable components
│   └── pages/       # Page templates
├── routes/          # Express routes
├── controllers/     # Route handlers
├── middleware/       # Auth middleware
├── config/          # Database & Cloudinary config
├── utils/           # Utility functions
├── prisma/          # Schema & migrations
└── server.js        # Entry point
```

## Features

- Dual-career presentation (Software Engineer + Visual Storyteller)
- Premium dark theme with cinematic animations
- Responsive design (mobile to ultra-wide)
- GSAP animations and smooth scrolling
- Admin dashboard for content management
- Contact form with database storage
- Blog system with categories
- Project case studies
- SEO optimized
- Performance optimized

## License

All rights reserved.
