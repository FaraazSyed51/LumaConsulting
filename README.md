# Luma Consulting

A modern, interactive website for Luma Consulting - a student-led consulting initiative by the Muslim Tech Collaborative (MTC) at Ohio State University.

## Features

- 🎨 **Beautiful UI** - Modern, professional design with OSU color scheme
- ✨ **Interactive Animations** - Smooth animations and transitions using Framer Motion
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎯 **Clear Sections** - Hero, About, Process, For Businesses, For Students, and Interest Form
- 🚀 **Fast Performance** - Built with Next.js 14 and optimized for speed

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icon library

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── globals.css      # Global styles and Tailwind config
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main page
├── components/
│   ├── Navigation.tsx   # Navigation bar
│   ├── Hero.tsx         # Hero section
│   ├── About.tsx        # About section
│   ├── Process.tsx      # How it works section
│   ├── ForBusinesses.tsx # Businesses section
│   ├── ForStudents.tsx  # Students section
│   ├── InterestForm.tsx # Interest form
│   └── Footer.tsx       # Footer
└── public/              # Static assets
```

## Color Scheme

The website uses Ohio State University's official colors:
- **Scarlet**: #BA0C2F (Primary)
- **Gray**: #A7B1B7 (Secondary)
- Various shades and tints for design flexibility

## Deployment

The site can be deployed to Vercel, Netlify, or any other Next.js-compatible hosting platform.

```bash
npm run build
npm start
```

## License

Private project for Luma Consulting / Muslim Tech Collaborative at OSU.
