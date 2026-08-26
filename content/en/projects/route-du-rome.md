---
title: "Modernisation of an Interactive Web Application"
intro: "As part of my Application Designer-Developer training, I modernised La Route du Rome, an interactive web application built by France Travail Ille-et-Vilaine. The existing application worked but relied on unstructured, untested and hard-to-maintain monolithic code. My mission was to fully refactor the codebase without changing anything for the user, applying a layered architecture, SOLID principles, TypeScript and a testing strategy. The project ran from June to August 2026."
teamWork: "I carried out this project solo, from the analysis and conception phase through to implementation, testing and delivery. I also wrote the entire technical documentation for the project."
image: "/images/projects/rdr/route-du-rome-en.webp"
status: "completed"

technologies:
  - "Language: TypeScript"
  - "Build: Vite"
  - "Tests: Vitest"
  - "Linting & formatting: Biome"
  - "Interactive map: Leaflet"
  - "PWA: vite-plugin-pwa"
  - "Deployment: Vercel"
  - "IDE: VS Code"
  - "Other notable tools: GitHub, PlantUML"

live: "https://route-du-rome-delta.vercel.app/"

screenshots:
  - title: "Hero selection screen"
    image: "/images/projects/rdr/selection-heros.webp"
    description: ""

  - title: "Interactive map of Ille-et-Vilaine"
    image: "/images/projects/rdr/carte.webp"
    description: ""

  - title: "NPC dialogue"
    image: "/images/projects/rdr/dialogue.webp"
    description: ""

  - title: "Logbook"
    image: "/images/projects/rdr/carnet-de-bord.webp"
    description: ""

features:
  - title: "Domain / UI layered architecture"
    description: "The code is structured into two layers decoupled by TypeScript interfaces. The domain holds pure business logic (characters, quests, progression, badges) and has no knowledge of the DOM. The UI consumes the domain through its interfaces without ever instantiating a concrete class. This decoupling makes the domain fully testable independently of the display layer."

  - title: "Leaflet interactive map"
    description: "The Ille-et-Vilaine map lets the player explore the region and meet 9 professionals across the territory. Markers are keyboard-navigable, and the paths between the player and NPCs update visually with progression (dashed before a quest, solid coloured after). OSM tiles are served locally for offline support."

  - title: "Dialogue and quest system"
    description: "Each NPC offers a 3-question dialogue illustrated by a job presentation video. Completing a quest unlocks a badge in the logbook, awards experience to the player and visually updates the NPC on the map. Quest completion logic is protected against double-call."

  - title: "Logbook and progression"
    description: "The logbook centralises player progression: experience bar, current level, unlocked job badges. It depends solely on the IBadges interface — not EtatDesQuetes — illustrating the Interface Segregation Principle (ISP)."

  - title: "Composite pattern audio architecture"
    description: "The audio module groups three distinct source types: looping music tracks (PisteAudio), randomised ambient sound (Mouettes) and Web Audio API synthesised effects (Sfx). A GestionnaireAudio implementing IAudio[] coordinates all of them and exposes a single entry point to the Topbar mute button."

  - title: "Installable offline PWA"
    description: "The application is installable on mobile and desktop via vite-plugin-pwa. The service worker caches HTML, CSS, JavaScript, images and audio. OSM tiles benefit from a separate cache-first runtime cache, available offline after a first online load. Videos are excluded from the cache to avoid saturating device storage."

  - title: "Vitest testing strategy"
    description: "40 tests cover the entire domain: unit tests on every public method (nominal and edge cases), an integration test on the full quest completion flow, and a UI component test with interface mock on CarnetDeBord. Final coverage: 100% domain, 80% global."

  - title: "Accessibility and quality"
    description: "Aria-labels on all interactive elements, full keyboard navigation (Escape, Enter/Space on Leaflet markers, focus on overlay open), manual WCAG contrast audit. Final Lighthouse scores: Performance 100 desktop / 99 mobile, Accessibility 98, SEO 91."

otherInfo:
  year: "2026"
  duration: "10 weeks"
  team: "Solo"
  role: "Application Designer-Developer"
  client: "France Travail Ille-et-Vilaine"

  challenges:
    - "The main challenge was fully refactoring a working codebase without introducing any regression visible to the user. Every component had to reproduce the original behaviour exactly while conforming to the new architecture."
    - "Designing the layered architecture before writing a single line of code was a demanding exercise: defining interfaces, anticipating dependencies and settling on each component's responsibilities without an existing structured codebase to lean on."
    - "Setting up offline support via PWA required distinguishing several caching strategies depending on the nature of the resources: precache for static assets, runtime cache for dynamically-URL'd OSM tiles, exclusion of videos too large to cache."
    - "Several architecture decisions evolved during implementation compared to the initial design — introduction of ModalManager, audio module refactored into a Composite pattern, removal of callbacks that became dead code — all documented as ADRs."

  results:
    - "Lighthouse Performance score: 65 → 100 desktop, 79 → 99 mobile"
    - "Total payload reduced from 3,514 KiB to under 500 KiB"
    - "100% test coverage on the domain"
    - "Installable PWA working fully offline"
    - "0 TypeScript errors, 0 Biome errors at delivery"
---