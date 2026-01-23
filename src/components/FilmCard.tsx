import { graphql, useFragment } from "react-relay";
import type { FilmCard_film$key } from "./__generated__/FilmCard_film.graphql";

import { Calendar, Film, User } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";

const FilmCardFragment = graphql`
  fragment FilmCard_film on Film {
    id
    title
    episodeID
    director
    releaseDate
    openingCrawl
    producers
  }
`;

interface FilmCardProps {
  film: FilmCard_film$key;
}

export const FilmCard = ({ film }: Readonly<FilmCardProps>) => {
  const data = useFragment(FilmCardFragment, film);

  const truncatedCrawl = data.openingCrawl
    ? data.openingCrawl.slice(0, 150) + "..."
    : "";

  const episodeRoman = [
    "",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
  ];

  return (
    <Card className="group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sw-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div>
            <CardDescription className="flex items-center gap-2 mb-2">
              <Film className="h-4 w-4 text-sw-yellow" />
              Episode {episodeRoman[data.episodeID || 0] || data.episodeID}
            </CardDescription>
            <CardTitle className="text-2xl tracking-wider">
              {data.title}
            </CardTitle>
          </div>
          <Badge variant="outline" className="shrink-0">
            <Calendar className="h-3 w-3 mr-1" />
            {data.releaseDate?.split("-")[0]}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        <p className="text-gray-400 text-sm leading-relaxed italic">
          "{truncatedCrawl}"
        </p>

        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-sw-cyan" />
          <span className="text-gray-300">Directed by</span>
          <span className="text-sw-cyan font-medium">{data.director}</span>
        </div>
      </CardContent>

      <CardFooter className="relative flex flex-wrap gap-2">
        {data.producers?.slice(0, 2).map((producer, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {producer}
          </Badge>
        ))}
        {(data.producers?.length || 0) > 2 && (
          <Badge variant="secondary" className="text-xs">
            +{(data.producers?.length || 0) - 2} more
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};
