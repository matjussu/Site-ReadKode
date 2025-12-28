# ReadKode Landing Page

Landing page professionnelle pour l'application mobile ReadKode (Read<ode) - La première app pour apprendre à LIRE du code.

## Stack Technique

- **Astro 5** - Framework SSG
- **React 19** - Composants interactifs
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations avancées
- **TypeScript** - Type safety

## Structure

```
landing-page/
├── src/
│   ├── components/
│   │   ├── ui/           # Button, Card, Badge
│   │   ├── sections/     # Hero, Problem, Features, etc.
│   │   ├── animated/     # React + Framer Motion
│   │   └── layout/       # Layout, Navbar
│   ├── i18n/             # Traductions FR/EN
│   ├── pages/
│   │   ├── index.astro   # Page FR
│   │   └── en/           # Page EN
│   └── styles/
│       └── global.css    # Tailwind + custom styles
├── public/
│   └── images/           # Logos, screenshots, mascottes
├── tailwind.config.mjs   # Thème ReadCod
├── astro.config.mjs      # Config Astro
└── vercel.json           # Config déploiement
```

## Commandes

```bash
# Développement
npm run dev           # Serveur local :4321

# Production
npm run build         # Build dans ./dist/
npm run preview       # Preview du build
```

## Fonctionnalités

- Bilingue FR/EN avec toggle
- Animations scroll-triggered (Framer Motion)
- Counter animation pour les stats
- Parallax sur les mockups iPhone
- Formulaire waitlist (FormSubmit.co)
- SEO optimisé (Open Graph, Twitter Cards)
- Performance optimisée (Lighthouse 95+)

## Déploiement

Configuré pour Vercel :
1. Push sur GitHub
2. Connecter le repo à Vercel
3. Déploiement automatique

## Screenshots

Pour ajouter les screenshots de l'app :
1. Placer les images dans `public/images/screenshots/`
2. Nommer les fichiers : `home.png`, `exercise.png`, `lessons.png`, `profile.png`

## Personnalisation

### Couleurs (tailwind.config.mjs)
```javascript
colors: {
  'bg-primary': '#1A1919',
  'accent': '#00DDB3',
  'success': '#30D158',
  'warning': '#FF9500',
  'error': '#FF453A',
}
```

### Traductions (src/i18n/)
- `fr.json` - Français
- `en.json` - Anglais
