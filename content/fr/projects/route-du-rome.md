---
title: "Modernisation d'une application web interactive"
intro: "Dans le cadre de ma formation Concepteur Développeur d'Applications, j'ai modernisé La Route du Rome, une application web interactive réalisée par France Travail Ille-et-Vilaine. L'application existante fonctionnait mais reposait sur un code monolithique non structuré, non testé et difficile à maintenir. Ma mission a été de refondre entièrement le code sans rien changer pour l'utilisateur, en appliquant une architecture en couches, les principes SOLID, TypeScript et une stratégie de tests. Le projet s'est déroulé de juin à août 2026."
teamWork: "J'ai réalisé ce projet seul, de la phase d'analyse de l'existant et de conception à l'implémentation, des tests à la livraison. J'ai également rédigé l'intégralité de la documentation technique du projet."
image: "/images/projects/rdr/route-du-rome-fr.webp"
status: "completed"

technologies:
  - "Langage : TypeScript"
  - "Build : Vite"
  - "Tests : Vitest"
  - "Linting & formatage : Biome"
  - "Carte interactive : Leaflet"
  - "PWA : vite-plugin-pwa"
  - "Déploiement : Vercel"
  - "IDE : VS Code"
  - "Autres outils notables : GitHub, PlantUML"

live: "https://route-du-rome-delta.vercel.app/"

# Galerie de screenshots
screenshots:
  - title: "Écran de sélection du guide"
    image: "/images/projects/rdr/selection-heros.webp"
    description: ""

  - title: "Carte interactive d'Ille-et-Vilaine"
    image: "/images/projects/rdr/carte.webp"
    description: ""

  - title: "Dialogue avec un NPC"
    image: "/images/projects/rdr/dialogue.webp"
    description: ""

  - title: "Carnet de bord"
    image: "/images/projects/rdr/carnet-de-bord.webp"
    description: ""

# Fonctionnalités principales
features:
  - title: "Architecture en couches domaine / UI"
    description: "Le code est structuré en deux couches découplées par des interfaces TypeScript. Le domaine contient la logique métier pure (personnages, quêtes, progression, badges) et ne connaît pas le DOM. L'UI consomme le domaine via ses interfaces sans jamais instancier de classe concrète. Ce découplage rend le domaine testable indépendamment de l'affichage."

  - title: "Carte interactive Leaflet"
    description: "La carte de l'Ille-et-Vilaine permet au joueur d'explorer la région et de rencontrer 9 professionnels répartis sur le territoire. Les marqueurs sont navigables au clavier, les chemins entre le joueur et les NPC évoluent visuellement selon la progression (pointillés avant la quête, plein coloré après). Les tuiles OSM sont servies en local pour le fonctionnement hors-ligne."

  - title: "Système de dialogue et de quêtes"
    description: "Chaque NPC propose un dialogue en 3 questions illustré d'une vidéo de présentation du métier. La fin de quête déverrouille un badge dans le carnet de bord, attribue de l'expérience au joueur et met à jour visuellement le NPC sur la carte. La logique de fin de quête est protégée contre le double appel."

  - title: "Carnet de bord et progression"
    description: "Le carnet de bord centralise la progression du joueur : barre d'expérience, niveau atteint, badges métiers débloqués. Il dépend uniquement de l'interface IBadges — pas de EtatDesQuetes — ce qui illustre le principe de ségrégation des interfaces (ISP)."

  - title: "Architecture audio en pattern Composite"
    description: "Le module audio regroupe trois types de sources distincts : pistes musicales en boucle (PisteAudio), ambiance aléatoire (Mouettes) et effets synthétisés Web Audio API (Sfx). Un GestionnaireAudio implémentant IAudio[] coordonne l'ensemble et expose un point d'entrée unique au bouton mute de la Topbar."

  - title: "PWA installable et offline"
    description: "L'application est installable sur mobile et desktop via vite-plugin-pwa. Le service worker met en cache le HTML, le CSS, le JavaScript, les images et l'audio. Les tuiles OSM bénéficient d'un cache runtime cache-first, disponibles hors-ligne après un premier chargement en ligne. Les vidéos sont exclues du cache pour ne pas saturer le stockage de l'appareil."

  - title: "Stratégie de tests Vitest"
    description: "40 tests couvrent l'intégralité du domaine : tests unitaires sur chaque méthode publique (cas nominal et cas limite), test d'intégration sur le flux complet de fin de quête, test de composant UI avec mock d'interface sur CarnetDeBord. Couverture finale : 100% domaine, 80% global."

  - title: "Accessibilité et qualité"
    description: "Aria-label sur tous les éléments interactifs, navigation clavier complète (Échap, Entrée/Espace sur les marqueurs Leaflet, focus à l'ouverture des overlays), audit de contrastes WCAG manuel. Score Lighthouse final : Performance 100 desktop / 99 mobile, Accessibilité 98, SEO 91."

# Autres informations
otherInfo:
  year: "2026"
  duration: "10 semaines"
  team: "Solo"
  role: "Concepteur développeur d'applications"
  client: "France Travail Ille-et-Vilaine"

  challenges:
    - "Le principal défi de ce projet a été de refondre entièrement un code existant fonctionnel sans introduire de régression visible pour l'utilisateur. Chaque composant devait reproduire exactement le comportement de l'original tout en respectant la nouvelle architecture."
    - "La conception de l'architecture en couches avant d'écrire la moindre ligne de code a été un exercice exigeant : définir les interfaces, anticiper les dépendances et trancher sur les responsabilités de chaque composant sans pouvoir s'appuyer sur un code existant structuré."
    - "La mise en place du fonctionnement hors-ligne via PWA a nécessité de distinguer plusieurs stratégies de cache selon la nature des ressources : précache pour les assets statiques, cache runtime pour les tuiles OSM à URL dynamique, exclusion des vidéos trop lourdes."
    - "Plusieurs décisions d'architecture ont évolué en cours de route par rapport à la conception initiale — introduction de ModalManager, refonte du module audio en pattern Composite, retrait de callbacks devenus morts — toutes documentées sous forme d'ADR."

  results:
    - "Score Lighthouse Performance 65 → 100 desktop, 79 → 99 mobile"
    - "Payload total réduit de 3 514 KiB à moins de 500 KiB"
    - "100% de couverture de tests sur le domaine"
    - "Application PWA installable et fonctionnelle hors-ligne"
    - "0 erreur TypeScript, 0 erreur Biome en livraison"
---