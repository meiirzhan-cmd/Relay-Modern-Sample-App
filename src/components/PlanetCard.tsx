import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Globe, Users, Droplets, Mountain } from "lucide-react";
import { Badge } from "./ui/badge";
import type { PlanetCard_planet$key } from "./__generated__/PlanetCard_planet.graphql";

const PlanetCardFragment = graphql`
  fragment PlanetCard_planet on Planet {
    id
    name
    diameter
    gravity
    population
    climates
    terrains
    surfaceWater
    orbitalPeriod
    rotationPeriod
  }
`;

interface PlanetCardProps {
  planet: PlanetCard_planet$key;
}

const PlanetCard = ({ planet }: PlanetCardProps) => {
  const data = useFragment(PlanetCardFragment, planet);
  const formatPopulation = (pop: number | null | undefined) => {
    if (!pop) return "Unknown";
    if (pop >= 1e12) return `${(pop / 1e12).toFixed(1)}T`;
    if (pop >= 1e9) return `${(pop / 1e9).toFixed(1)}B`;
    if (pop >= 1e6) return `${(pop / 1e6).toFixed(1)}M`;
    if (pop >= 1e3) return `${(pop / 1e3).toFixed(1)}K`;
    return pop.toString();
  };

  return (
    <Card className="group relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-sw-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div>
            <CardDescription className="flex items-center gap-2 mb-2">
              <Globe className="h-4 w-4 text-sw-green" />
              Planet
            </CardDescription>
            <CardTitle className="text-xl tracking-wider text-sw-green">
              {data.name}
            </CardTitle>
          </div>
          <Badge variant="green" className="shrink-0">
            {data.diameter ? `${data.diameter.toLocaleString()} km` : "Unknown"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-gray-400">Population:</span>
            <span className="text-white">
              {formatPopulation(data.population)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-sw-cyan" />
            <span className="text-gray-400">Water:</span>
            <span className="text-white">
              {data.surfaceWater ? `${data.surfaceWater}%` : "Unknown"}
            </span>
          </div>
        </div>

        {data.gravity && (
          <div className="text-sm">
            <span className="text-gray-400">Gravity:</span>
            <span className="text-white ml-2">{data.gravity}</span>
          </div>
        )}

        <div className="text-sm text-gray-400">
          <span>Orbital Period:</span>
          <span className="text-white ml-2">
            {data.orbitalPeriod ? `${data.orbitalPeriod} days` : "Unknown"}
          </span>
        </div>
      </CardContent>

      <CardFooter className="relative flex flex-col gap-2 items-start">
        {data.climates && data.climates.length > 0 && (
          <div className="flex flex-wrap gap-1">
            <Mountain className="h-4 w-4 text-gray-500 mr-1" />
            {data.climates.slice(0, 3).map((climate, index) => (
              <Badge
                key={climate + " " + index}
                variant="secondary"
                className="text-xs capitalize"
              >
                {climate}
              </Badge>
            ))}
          </div>
        )}
        {data.terrains && data.terrains.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {data.terrains.slice(0, 3).map((terrain, index) => (
              <Badge
                key={terrain + " " + index}
                variant="outline"
                className="text-xs capitalize border-sw-green/30 text-sw-green/80"
              >
                {terrain}
              </Badge>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PlanetCard;
