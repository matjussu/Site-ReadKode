# ReadKode Landing Page

## Project Overview

Landing page pour **ReadKode**, une application mobile qui enseigne aux développeurs à **LIRE** le code (70% du temps de dev est consacré à la lecture de code).

- **URL Production:** https://readkode.app
- **Langues:** Français (défaut), Anglais (/en)

## Stack Technique

| Technologie | Version | Usage |
|-------------|---------|-------|
| Astro | 5.x | SSG (Static Site Generation) |
| React | 19.x | Composants interactifs |
| TypeScript | strict | Typage |
| Tailwind CSS | 3.x | Styling utility-first |
| Framer Motion | 12.x | Animations scroll |

## Structure du Projet

```
src/
├── components/
│   ├── animated/      # Composants React + Framer Motion
│   │   ├── CounterAnimation.tsx   # Animation de nombres
│   │   ├── FloatingElement.tsx    # Éléments flottants
│   │   ├── ParallaxImage.tsx      # Effet parallax
│   │   ├── PhoneMockup.tsx        # Mockup iPhone 3D
│   │   └── ScrollReveal.tsx       # Révélation au scroll
│   ├── layout/
│   │   ├── Layout.astro           # Layout principal + SEO
│   │   └── Navbar.astro           # Navigation fixe
│   ├── sections/      # Sections de la page
│   │   ├── Hero.astro
│   │   ├── Problem.astro
│   │   ├── Features.astro
│   │   ├── HowItWorks.astro
│   │   ├── AppPreview.astro
│   │   ├── CTA.astro
│   │   └── Footer.astro
│   └── ui/            # Composants atomiques
│       ├── Button.astro
│       ├── Card.astro
│       └── Badge.astro
├── i18n/              # Internationalisation
│   ├── index.ts       # Utilitaires i18n
│   ├── fr.json        # Traductions FR
│   └── en.json        # Traductions EN
├── pages/
│   ├── index.astro    # Page FR (/)
│   └── en/index.astro # Page EN (/en)
└── styles/
    └── global.css     # Tailwind + utilitaires custom
```

## Commandes

```bash
npm run dev      # Serveur de développement (:4321)
npm run build    # Build production → ./dist/
npm run preview  # Preview du build
```

## Conventions de Code

### Composants Astro (.astro)

- Sections et UI statiques
- Props typées en TypeScript dans le frontmatter
- Styles avec classes Tailwind

```astro
---
interface Props {
  title: string;
  variant?: 'primary' | 'secondary';
}
const { title, variant = 'primary' } = Astro.props;
---
<div class="bg-background text-text-primary">
  {title}
</div>
```

### Composants React (.tsx)

- Uniquement pour les animations et interactions
- Utiliser `client:visible` pour le lazy loading
- Framer Motion pour les animations scroll

```tsx
// Exemple d'usage dans un fichier .astro
<ScrollReveal client:visible>
  <Content />
</ScrollReveal>
```

### Internationalisation (i18n)

```typescript
import { t, getLocale } from '../i18n';

// Dans un composant
const locale = getLocale(Astro.url);
const text = t('hero.title', locale);
```

Structure des fichiers JSON :
```json
{
  "hero": {
    "title": "Apprends à LIRE le code",
    "subtitle": "..."
  }
}
```

### Couleurs (Theme iOS Dark)

```
background:       #1A1919  (fond principal)
background-secondary: #2C2C2E
accent:           #30D158  (vert iOS)
warning:          #FF9500  (orange)
error:            #FF453A  (rouge)
text-primary:     #FFFFFF
text-secondary:   #8E8E93
```

### Classes Tailwind Personnalisées

```css
/* Ombres */
shadow-glow-accent  /* Lueur verte */
shadow-card         /* Ombre carte */
shadow-card-hover   /* Ombre survol */

/* Animations */
animate-float       /* Flottement */
animate-pulse-glow  /* Pulsation */
animate-slide-up    /* Glissement haut */
animate-fade-in     /* Fondu */
```

## Patterns d'Animation

### Révélation au scroll
```astro
<ScrollReveal client:visible delay={0.2}>
  <Card />
</ScrollReveal>
```

### Compteur animé
```astro
<CounterAnimation client:visible target={70} suffix="%" />
```

### Parallax
```astro
<PhoneMockup client:visible imageSrc="/images/screenshot.png" />
```

## Formulaire (CTA)

Le formulaire utilise FormSubmit.co :
- Endpoint: `https://formsubmit.co/ajax/{email}`
- Méthode: POST avec fetch
- Protection spam: honeypot field

## SEO

Configuré dans `Layout.astro` :
- Meta tags (title, description)
- Open Graph
- Twitter Cards
- Sitemap auto-généré
- Favicon

## Déploiement

- **Plateforme:** Vercel
- **Build:** Automatique sur push
- **Headers:** Sécurité (X-Frame-Options, etc.)
- **Cache:** 1 an pour /images/ et /_astro/

## Choses à Éviter

1. **Ne pas** ajouter de dépendances sans raison valable
2. **Ne pas** utiliser `client:load` - préférer `client:visible`
3. **Ne pas** modifier les couleurs sans respecter le thème iOS
4. **Ne pas** oublier les traductions dans les deux fichiers JSON
5. **Ne pas** créer de nouveaux composants React pour du contenu statique

## Fichiers de Configuration Importants

| Fichier | Description |
|---------|-------------|
| `astro.config.mjs` | Config Astro, i18n, intégrations |
| `tailwind.config.mjs` | Thème, couleurs, animations |
| `vercel.json` | Déploiement, headers, cache |
| `tsconfig.json` | TypeScript strict |

## Assets

```
public/
├── images/
│   ├── logo.png, long_logo.png, full_logo.png
│   ├── Mascotte*.svg     # Mascottes animées
│   └── screenshots/      # Captures de l'app
├── favicon.png
└── favicon.svg
```

## Workflow de Développement

1. Créer/modifier les traductions dans `src/i18n/fr.json` et `src/i18n/en.json`
2. Créer les composants UI statiques en `.astro`
3. Ajouter des animations avec des composants React + `client:visible`
4. Tester les deux langues (/ et /en)
5. Vérifier le responsive (mobile-first)
6. Build et preview avant push
