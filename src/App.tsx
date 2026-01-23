import { Suspense, useEffect } from "react";
import { useQueryLoader } from "react-relay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ScrollArea } from "./components/ui/scroll-area";
import { GridSkeleton } from "./components/Loading";
import { Film, Users, Globe, Rocket, Star, Sparkles } from "lucide-react";
import FilmsList, { FilmsListQueryNode } from "./components/FilmsList";
import StarshipsList, {
  StarshipsListQueryNode,
} from "./components/StarshipsList";
import { PlanetsList } from "./components/PlanetsList";
import CharactersList, {
  CharactersListQueryNode,
} from "./components/CharactersList";
import FavoritesList from "./components/FavoritesList";
import type { FilmsListQuery } from "./components/__generated__/FilmsListQuery.graphql";
import type { CharactersListQuery } from "./components/__generated__/CharactersListQuery.graphql";
import type { StarshipsListQuery } from "./components/__generated__/StarshipsListQuery.graphql";

function App() {
  const [filmsQueryRef, loadFilmsQuery] =
    useQueryLoader<FilmsListQuery>(FilmsListQueryNode);
  const [charactersQueryRef, loadCharactersQuery] =
    useQueryLoader<CharactersListQuery>(CharactersListQueryNode);
  const [starshipsQueryRef, loadStarshipsQuery] =
    useQueryLoader<StarshipsListQuery>(StarshipsListQueryNode);

  useEffect(() => {
    loadFilmsQuery({});
    loadCharactersQuery({ first: 10 });
    loadStarshipsQuery({ first: 12 });
  }, [loadFilmsQuery, loadCharactersQuery, loadStarshipsQuery]);

  return (
    <div className="min-h-screen bg-space-black star-field">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-linear-to-br from-space-black via-space-dark to-space-black opacity-90 pointer-events-none" />

      {/* Header */}
      <header className="relative border-b border-space-light/30 backdrop-blur-sm bg-space-black/50 top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Sparkles className="h-10 w-10 text-sw-yellow animate-pulse-slow" />
                <div className="absolute inset-0 blur-lg bg-sw-yellow/30 animate-pulse-slow" />
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold tracking-widest text-sw-yellow">
                  STAR WARS
                </h1>
                <p className="text-sm text-gray-400 tracking-[0.3em] uppercase">
                  Relay Explorer
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
              <span className="px-3 py-1 rounded-full bg-space-gray/50 border border-space-light/30">
                Powered by GraphQL
              </span>
              <span className="px-3 py-1 rounded-full bg-sw-yellow/10 border border-sw-yellow/30 text-sw-yellow">
                Relay Modern
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-4 py-8">
        <Tabs defaultValue="films" className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-5 w-full max-w-2xl">
              <TabsTrigger value="films" className="gap-2 cursor-pointer">
                <Film className="h-4 w-4" />
                <span className="hidden sm:inline">Films</span>
              </TabsTrigger>
              <TabsTrigger value="characters" className="gap-2 cursor-pointer">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Characters</span>
              </TabsTrigger>
              <TabsTrigger value="planets" className="gap-2 cursor-pointer">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">Planets</span>
              </TabsTrigger>
              <TabsTrigger value="starships" className="gap-2 cursor-pointer">
                <Rocket className="h-4 w-4" />
                <span className="hidden sm:inline">Starships</span>
              </TabsTrigger>
              <TabsTrigger value="favorites" className="gap-2 cursor-pointer">
                <Star className="h-4 w-4" />
                <span className="hidden sm:inline">Favorites</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[calc(100vh-240px)]">
            <TabsContent value="films" className="mt-0">
              <div className="mb-6">
                <h2 className="text-2xl font-display font-semibold text-white mb-2">
                  Star Wars Films
                </h2>
                <p className="text-gray-400">
                  Explore the complete Star Wars saga. Data fetched using{" "}
                  <code className="text-sw-yellow bg-space-gray px-1 rounded">
                    usePreloadedQuery
                  </code>{" "}
                  with colocated fragments.
                </p>
              </div>
              <Suspense fallback={<GridSkeleton count={6} />}>
                {filmsQueryRef && <FilmsList queryRef={filmsQueryRef} />}
              </Suspense>
            </TabsContent>

            <TabsContent value="characters" className="mt-0">
              <div className="mb-6">
                <h2 className="text-2xl font-display font-semibold text-white mb-2">
                  Characters
                </h2>
                <p className="text-gray-400">
                  Meet the heroes and villains of the galaxy. Each card uses a{" "}
                  <code className="text-sw-blue bg-space-gray px-1 rounded">
                    useFragment
                  </code>{" "}
                  for colocated data dependencies.
                </p>
              </div>
              <Suspense fallback={<GridSkeleton count={8} />}>
                {charactersQueryRef && (
                  <CharactersList queryRef={charactersQueryRef} />
                )}
              </Suspense>
            </TabsContent>

            <TabsContent value="planets" className="mt-0">
              <div className="mb-6">
                <h2 className="text-2xl font-display font-semibold text-white mb-2">
                  Planets
                </h2>
                <p className="text-gray-400">
                  Discover worlds across the galaxy far, far away. Demonstrates
                  query variables for pagination.
                </p>
              </div>
              <Suspense fallback={<GridSkeleton count={8} />}>
                <PlanetsList count={12} />
              </Suspense>
            </TabsContent>

            <TabsContent value="starships" className="mt-0">
              <div className="mb-6">
                <h2 className="text-2xl font-display font-semibold text-white mb-2">
                  Starships
                </h2>
                <p className="text-gray-400">
                  Browse iconic vessels from X-wings to Star Destroyers. Each
                  component defines its own data requirements.
                </p>
              </div>
              <Suspense fallback={<GridSkeleton count={6} />}>
                {starshipsQueryRef && (
                  <StarshipsList queryReference={starshipsQueryRef} />
                )}
              </Suspense>
            </TabsContent>

            <TabsContent value="favorites" className="mt-0">
              <div className="mb-6">
                <h2 className="text-2xl font-display font-semibold text-white mb-2">
                  Favorites
                </h2>
                <p className="text-gray-400">
                  Manage your favorite items. This tab demonstrates the{" "}
                  <code className="text-sw-yellow bg-space-gray px-1 rounded">
                    useMutation
                  </code>{" "}
                  pattern with local state simulation.
                </p>
              </div>
              <FavoritesList />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-space-light/30 bg-space-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>Built with React, Relay Modern, Tailwind CSS & shadcn/ui</p>
            <p>
              Data from{" "}
              <a
                href="https://swapi-graphql.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sw-cyan hover:text-sw-cyan/80 transition-colors"
              >
                SWAPI GraphQL
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
