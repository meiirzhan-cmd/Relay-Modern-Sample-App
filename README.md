# Star Wars Relay Explorer

A modern React application demonstrating Relay Modern patterns and best practices using the Star Wars GraphQL API (SWAPI).

## Overview

This project serves as a **learning resource** for developers looking to understand Relay Modern's core concepts, including fragments, declarative data fetching, colocation, and Suspense integration.

## Tech Stack

| Technology    | Version |
| ------------- | ------- |
| React         | 19.2    |
| Relay Modern  | 20.1    |
| Vite          | 7.2     |
| TypeScript    | 5.9     |
| Tailwind CSS  | 4.1     |
| shadcn/ui     | Latest  |

## Features Demonstrated

### Query Fragments

Each card component (`FilmCard`, `CharacterCard`, `PlanetCard`, `StarshipCard`) defines its own data requirements using `useFragment`, ensuring components only request the data they need.

### Declarative Data Fetching

List components (`FilmsList`, `CharactersList`, `PlanetsList`, `StarshipsList`) use `useLazyLoadQuery` to declaratively fetch data with automatic loading and error states.

### Colocation

GraphQL fragments are colocated with their components - each component's data requirements live alongside its UI code.

### Suspense Integration

React Suspense provides automatic loading states while data is being fetched.

### Mutations (Simulated)

`FavoritesList` demonstrates the mutation pattern. Since SWAPI is read-only, mutations are simulated locally.

## Project Structure

```text
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── __generated__/   # Relay compiler output
│   ├── FilmCard.tsx
│   ├── FilmsList.tsx
│   ├── CharacterCard.tsx
│   ├── CharactersList.tsx
│   ├── PlanetCard.tsx
│   ├── PlanetsList.tsx
│   ├── StarshipCard.tsx
│   ├── StarshipsList.tsx
│   ├── FavoritesList.tsx
│   └── Loading.tsx
├── lib/
│   └── utils.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/meiirzhan-cmd/Relay-Modern-Sample-App.git
cd relay-modern-sample-app

# Install dependencies
npm install
```

### Development

```bash
# Run Relay compiler (generates type-safe artifacts)
npx relay-compiler

# Start development server
npm run dev
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## Learning Resources

- [Relay Quick Start Guide](https://relay.dev/docs/getting-started/quick-start/)
- [Relay Documentation](https://relay.dev/docs/)
- [shadcn/ui Installation Guide](https://ui.shadcn.com/docs/installation/vite)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [SWAPI GraphQL](https://swapi-graphql.netlify.app/)

## License

This project is for educational purposes only.
