/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Backgrounds (iOS Dark Theme)
        'bg-primary': '#1A1919',
        'bg-secondary': '#2C2C2E',
        'bg-tertiary': '#3A3A3C',
        'bg-quaternary': '#484848',
        'bg-code': '#000000',
        'bg-dojo': '#0F0F12',

        // Text
        'text-primary': '#FFFFFF',
        'text-secondary': '#8E8E93',
        'text-tertiary': '#636366',

        // Status colors
        'success': '#30D158',
        'success-dark': '#088201',
        'error': '#FF453A',
        'warning': '#FF9500',

        // Accent (général)
        'accent': '#30D158',        // Vert principal
        'accent-light': '#5EE07E',   // Vert clair
        'accent-dark': '#088201',    // Vert foncé

        // Couleurs spécifiques par composant (modifie ici)
        'btn-primary': '#30D158',    // Boutons principaux
        'btn-primary-hover': '#5EE07E',
        'icon-accent': '#FF9500',    // Icônes (orange)
        'badge-accent': '#FF9500',   // Badges (orange)

        // Logo ReadKode
        'logo-slash': '#30D158',     // "/" dans Read/Kode
        'logo-bracket': '#FF9500',   // "<" dans Read/<ode

        // Texte "ReadKode change la donne"
        'tagline-read': '#FFFFFF',       // "Read"
        'tagline-slash': '#30D158',      // "/"
        'tagline-bracket': '#FF9500',    // "<"
        'tagline-text': '#FFFFFF',       // "ode change la donne"
        'tagline-dot': '#8E8E93',        // "."

        // Cards "Pourquoi ReadKode" (5 cards)
        'card-icon-1': '#FF9500',    // Icône card 1 - Apprendre à LIRE
        'card-icon-2': '#30D158',    // Icône card 2 - Comprendre le code IA
        'card-icon-3': '#6366f1',    // Icône card 3 - Gamification
        'card-icon-4': '#f59e0b',    // Icône card 4 - Cours structuré
        'card-icon-5': '#ec4899',    // Icône card 5 - Mobile-first
        'card-title-1': '#FF9500',   // Titre card 1
        'card-title-2': '#30D158',   // Titre card 2
        'card-title-3': '#6366f1',   // Titre card 3
        'card-title-4': '#f59e0b',   // Titre card 4
        'card-title-5': '#ec4899',   // Titre card 5
        'card-glow-1': '#FF9500',    // Glow card 1
        'card-glow-2': '#30D158',    // Glow card 2
        'card-glow-3': '#6366f1',    // Glow card 3
        'card-glow-4': '#f59e0b',    // Glow card 4
        'card-glow-5': '#ec4899',    // Glow card 5

        // Steps "Comment ça marche" (4 steps)
        'step-1': '#8B5CF6',         // Violet
        'step-2': '#FF9500',         // Orange
        'step-3': '#30D158',         // Vert
        'step-4': '#FF453A',         // Rouge

        // Belts (Difficulty)
        'belt-white': '#E5E7EB',
        'belt-yellow': '#FCD34D',
        'belt-red': '#EF4444',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Monaco', '"Courier New"', 'monospace'],
        display: ['"Jersey 25"', 'cursive'],
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'sm': '10px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
      },
      boxShadow: {
        'glow-success': '0 0 20px rgba(48, 209, 88, 0.4)',
        'glow-accent': '0 0 20px rgba(48, 209, 88, 0.4)',
        'glow-warning': '0 0 20px rgba(255, 149, 0, 0.3)',
        'glow-error': '0 0 20px rgba(255, 69, 58, 0.4)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.5)',
        // Glow par card
        'glow-card-1': '0 0 20px rgba(255, 149, 0, 0.4)',    // Orange
        'glow-card-2': '0 0 20px rgba(48, 209, 88, 0.4)',    // Vert
        'glow-card-3': '0 0 20px rgba(99, 102, 241, 0.4)',   // Indigo
        'glow-card-4': '0 0 20px rgba(245, 158, 11, 0.4)',   // Amber
        'glow-card-5': '0 0 20px rgba(236, 72, 153, 0.4)',   // Pink
      },
      backgroundImage: {
        'gradient-success': 'linear-gradient(135deg, #30D158 0%, #088201 100%)',
        'gradient-accent': 'linear-gradient(135deg, #30D158 0%, #088201 100%)',
        'gradient-btn': 'linear-gradient(135deg, #30D158 0%, #088201 100%)',
        'gradient-card': 'linear-gradient(135deg, #202020 0%, #242426 100%)',
        'gradient-hero': 'radial-gradient(ellipse at center top, #2C2C2E 0%, #1A1919 50%, #0F0F12 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(48, 209, 88, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(48, 209, 88, 0.6)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
