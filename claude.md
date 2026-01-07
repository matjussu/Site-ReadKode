# ReadKode Landing Page

## Project Overview

Landing page pour **ReadKode**, une application mobile révolutionnaire qui enseigne aux développeurs à **LIRE** le code.
Partant du constat que 70% du temps de développement est consacré à la lecture, ReadKode gamifie cet apprentissage.

- **URL Production:** https://readkode.app
- **Langues:** Français (défaut), Anglais (/en)

## Stack Technique

| Technologie | Version | Usage |
|-------------|---------|-------|
| **Astro** | 5.16+ | Framework SSG (Static Site Generation) principal |
| **React** | 19.x | Composants interactifs & Animations complexes |
| **TypeScript** | Strict | Typage statique pour la robustesse |
| **Tailwind CSS** | 3.x | Styling utility-first & Design System |
| **Framer Motion** | 12.x | Moteur d'animations (scroll, interactions) |
| **Vite** | 5.x | Bundler rapide (sous le capot d'Astro) |

### Outils de Développement
- **Micromorph**: Transitions de pages douces
- **Pinegrow**: Intégration visuelle (plugin Astro)

## Structure du Projet

```text
src/
├── components/
│   ├── animated/          # Composants React + Framer Motion (Interactivité)
│   │   ├── CounterAnimation.tsx   # Compteur incrémental animé
│   │   ├── FloatingElement.tsx    # Animation de flottement continu
│   │   ├── ParallaxImage.tsx      # Effet de profondeur au scroll
│   │   ├── PhoneCarousel.tsx      # Carrousel de screenshots mobile
│   │   ├── PhoneMockup.tsx        # Mockup iPhone 3D
│   │   └── ScrollReveal.tsx       # Wrapper pour révéler le contenu
│   ├── layout/            # Structure globale
│   │   ├── Layout.astro           # <head>, SEO, styles globaux
│   │   └── Navbar.astro           # Navigation responsive
│   ├── sections/          # Blocs de contenu majeurs
│   │   ├── Hero.astro             # En-tête avec CTA principal
│   │   ├── Problem.astro          # Section "Le problème"
│   │   ├── Features.astro         # Grille de fonctionnalités
│   │   ├── HowItWorks.astro       # Étapes (Steps)
│   │   ├── AppPreview.astro       # Aperçu de l'interface
│   │   ├── CTA.astro              # Formulaire final
│   │   └── Footer.astro           # Pied de page
│   └── ui/                # Composants atomiques réutilisables
│       ├── Button.astro           # Boutons (Primary, Secondary, Accent)
│       ├── Card.astro             # Conteneur générique
│       └── Badge.astro            # Étiquettes
├── i18n/                  # Gestion des langues
│   ├── index.ts           # Logique de traduction & détection locale
│   ├── fr.json            # Base de texte FR
│   └── en.json            # Base de texte EN
├── pages/                 # Routes
│   ├── index.astro        # Page d'accueil FR (/)
│   ├── 404.astro          # Page non trouvée
│   └── en/                # Version Anglaise
│       └── index.astro    # Page d'accueil EN (/en)
└── styles/
    └── global.css         # Reset, @layer components, polices
```

## Design System

Le design vise une esthétique **"Premium Dark Mode"** (inspiré d'iOS et des IDE modernes).

### Couleurs (Tailwind Config)
| Token | Hex | Usage |
|-------|-----|-------|
| `bg-primary` | `#1A1919` | Fond principal |
| `bg-secondary` | `#2C2C2E` | Cartes, Sections alternées |
| `accent` | `#30D158` | Vert "Success" (Action principale) |
| `warning` | `#FF9500` | Orange (Accents secondaires) |
| `error` | `#FF453A` | Rouge (Erreurs, Belts) |
| `text-primary` | `#FFFFFF` | Titres, texte corps |
| `text-secondary` | `#8E8E93` | Sous-titres, détails |

### Typographie
- **Primaire (Corps/Headings):** `JetBrains Mono` (Monospace moderne, lisible pour le code)
- **Display (Fun/Rétro):** `Jersey 25` (Utilisé pour des touches stylistiques pixel/rétro)

### Classes Utilitaires Globales (`src/styles/global.css`)
- **Boutons**: `.btn-primary`, `.btn-secondary`, `.btn-accent` (incluent hover, active, transitions)
- **Cartes**: `.card`, `.card-glow` (avec ombres colorées)
- **Texte**: `.section-title`, `.section-subtitle`, `.gradient-text` (dégradé Orange->Jaune)
- **Effets**: `.glass` (Backdrop blur)

## Développement & Conventions

### 1. Composants Astro vs React
- **Utiliser Astro (.astro)** par défaut pour tout ce qui est statique (Layout, Texte, Images, Structure).
- **Utiliser React (.tsx)** UNIQUEMENT pour :
  - La gestion d'état (useState, useEffect).
  - Les animations interactives (Framer Motion).
  - Les carrousels ou éléments complexes (ex: `PhoneCarousel`).
- **Hydratation**: Toujours utiliser `client:visible` pour les composants React afin d'optimiser les performances (loading lazy).

### 2. Internationalisation (i18n)
Toute chaîne de texte visible DOIT passer par le système de traduction.
```typescript
import { t, getLocale } from '../i18n';
const locale = getLocale(Astro.url);
// Usage
{t('section.key', locale)}
```
*Ne jamais hardcoder de texte dans les fichiers .astro ou .tsx.*

### 3. Responsive & Mobile-First
- Le design doit être impeccable sur mobile (iPhone SE, `xs: 375px`).
- Utiliser les classes utilitaires `touch-manipulation` et `min-touch-target` pour l'accessibilité tactile.
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px).

### 4. SEO & Performance
- Les balises meta sont gérées dans `Layout.astro`.
- Les images sont dans `public/images` ou optimisées par Astro.
- `Astro.generator` est inclus dans les meta.

## Commandes

```bash
npm run dev      # Lancer le serveur local (http://localhost:4321)
npm run build    # Générer le site statique dans ./dist
npm run preview  # Tester le build localement
```

## Assets

Les assets statiques se trouvent dans `public/` :
- `images/Mascotte*.svg`: Animations SVG légères.
- `images/screenshots/`: Captures d'écran pour les mockups.
- `favicon.*`: Icônes du site.

## À Faire / Roadmap Rapide

1. **Ajout de Pages**: Si de nouvelles pages sont demandées (ex: Blog, Mentions Légales), créer un fichier `.astro` dans `src/pages/` et son équivalent dans `src/pages/en/`.
2. **Maintenance**: Vérifier régulièrement les traductions manquantes dans `fr.json` vs `en.json`.
3. **Optimisation**: Surveiller le poids du bundle JS (l'hydratation React doit rester minimale).

---
*Ce fichier sert de référence pour le contexte du projet. Mettez-le à jour si l'architecture change.*
