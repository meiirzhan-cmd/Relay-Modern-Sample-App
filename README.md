# Star Wars Relay Explorer

A React application demonstrating Relay Modern features using the Star Wars API (SWAPI).

## Purpose

This project was created for **learning purposes only**, to explore and understand Relay Modern's core concepts and patterns.

## Features Demonstrated

| Feature | Implementation |
|---------|----------------|
| Query Fragments | FilmCard, CharacterCard, PlanetCard, StarshipCard - each defines its own data requirements with `useFragment` |
| Declarative Data Fetching | FilmsList, CharactersList, PlanetsList, StarshipsList - use `useLazyLoadQuery` |
| Mutations | FavoritesList - demonstrates the mutation pattern (simulated since SWAPI is read-only) |
| Colocation | Each component's GraphQL fragment lives alongside its UI code |
| Query Variables | Pagination support with `$first` variable |
| Suspense Integration | Automatic loading states with React Suspense |

## Tech Stack

- React 19
- Relay Modern 20
- Vite 7
- TypeScript
- Tailwind CSS 4
- shadcn/ui components

## Getting Started

```bash
# Install dependencies
npm install

# Run Relay compiler
npm run relay

# Start development server
npm run dev
```

## References

Official documentation used while building this project:

- [Relay Quick Start](https://relay.dev/docs/getting-started/quick-start/)
- [Relay Documentation](https://relay.dev/docs/)
- [shadcn/ui Vite Installation](https://ui.shadcn.com/docs/installation/vite)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
