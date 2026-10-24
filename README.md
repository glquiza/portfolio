# Gary Luis Alquiza — Portfolio v1

A responsive personal developer portfolio showcasing interactive React applications, modern UI components, and GSAP-powered animations.

> **Live Demo:** [https://garyalquiza-portfolio.vercel.app](https://garyalquiza-portfolio.vercel.app) *(Deploy to Vercel/Netlify)*  
> **Repository:** [https://github.com/garyalquiza/portfolio](https://github.com/garyalquiza/portfolio)

---

## 📸 Preview

![Portfolio Preview](https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80)

---

## 🚀 Features

- **Hero Section:** Personal branding, intro tagline, custom avatar, and quick-action CTA buttons.
- **About Section:** Bio, current learning focus, geographic location, and categorized technical skills.
- **Featured Projects:** Minimum 3 project cards showcasing Q1 React & GSAP applications with live preview links, source code links, and tech stack tags.
- **Contact Hub:** Direct `mailto:` email action, plus active links to GitHub and LinkedIn profiles.
- **Responsive Navigation & Mobile Drawer:** Seamless navigation across mobile, tablet, and desktop viewports.
- **GSAP Entrance Animation:** Staggered entrance timeline powered by GreenSock (`gsap` and `@gsap/react`).
- **Scalable Architecture:** Structured with React Router for future multipage expansion.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **Routing:** React Router v7 (`react-router-dom`)
- **Styling:** Tailwind CSS
- **Animations:** GSAP (`gsap`, `@gsap/react`)
- **Icons:** Lucide React (`lucide-react`) + SVG Icons
- **Deployment Target:** Vercel / Netlify

---

## 📦 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/garyalquiza/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open your browser to the URL displayed in the terminal (typically `http://localhost:5173`).

### Building for Production

To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 📂 Project Structure

```text
portfolio/
├── public/                 # Static assets & favicon
├── src/
│   ├── components/         # Reusable UI modules
│   │   ├── Navbar.jsx      # Sticky responsive navigation
│   │   ├── Hero.jsx        # Landing hero with GSAP entrance timeline
│   │   ├── About.jsx       # Bio, location, and technical badges
│   │   ├── Projects.jsx    # Projects showcase section
│   │   ├── ProjectCard.jsx # Reusable project card
│   │   ├── Contact.jsx     # Email & social reach-out section
│   │   ├── Footer.jsx      # Dynamic copyright & social links
│   │   └── Icons.jsx       # SVG brand icons
│   ├── data/
│   │   └── projectsData.js # Single source of truth for portfolio content
│   ├── pages/
│   │   └── Home.jsx        # Composed landing page
│   ├── App.jsx             # React Router configuration
│   ├── index.css           # Tailwind directives & global styling
│   └── main.jsx            # Application entry point
├── package.json
└── README.md
```

---

## 📄 License

This project is licensed under the MIT License.
