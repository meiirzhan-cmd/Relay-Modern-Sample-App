import { Rocket, Users, Gauge, DollarSign } from "lucide-react";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Badge } from "./ui/badge";
import type { StarshipCard_starship$key } from "./__generated__/StarshipCard_starship.graphql";

const StarshipCardFragment = graphql`
  fragment StarshipCard_starship on Starship {
    id
    name
    model
    starshipClass
    manufacturers
    costInCredits
    length
    crew
    passengers
    maxAtmospheringSpeed
    hyperdriveRating
    MGLT
  }
`;

interface StarshipCardProps {
  starship: StarshipCard_starship$key;
}

const StarshipCard = ({ starship }: StarshipCardProps) => {
  const data = useFragment(StarshipCardFragment, starship);

  const formatCredits = (credits: number | null | undefined) => {
    if (!credits) return "Unknown";
    if (credits >= 1e9) return `${(credits / 1e9).toFixed(1)}B`;
    if (credits >= 1e6) return `${(credits / 1e6).toFixed(1)}M`;
    if (credits >= 1e3) return `${(credits / 1e3).toFixed(1)}K`;
    return credits.toLocaleString();
  };

  return (
    <Card className="group relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-sw-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div>
            <CardDescription className="flex items-center gap-2 mb-2">
              <Rocket className="h-4 w-4 text-sw-cyan" />
              {data.starshipClass || "Starship"}
            </CardDescription>
            <CardTitle className="text-xl tracking-wider text-sw-cyan">
              {data.name}
            </CardTitle>
          </div>
          {data.hyperdriveRating && (
            <Badge variant="cyan" className="shrink-0">
              Hyperdrive: {data.hyperdriveRating}
            </Badge>
          )}
        </div>
        {data.model && (
          <p className="text-sm text-gray-400 mt-1">{data.model}</p>
        )}
      </CardHeader>

      <CardContent className="relative space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-gray-400">Crew:</span>
            <span className="text-white">{data.crew || "Unknown"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-sw-blue" />
            <span className="text-gray-400">Passengers:</span>
            <span className="text-white">{data.passengers || "Unknown"}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-sw-yellow" />
            <span className="text-gray-400">Speed:</span>
            <span className="text-white">
              {data.maxAtmospheringSpeed
                ? `${data.maxAtmospheringSpeed} km/h`
                : "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-sw-green" />
            <span className="text-gray-400">Cost:</span>
            <span className="text-white">
              {formatCredits(data.costInCredits)} credits
            </span>
          </div>
        </div>

        {data.length && (
          <div className="text-sm">
            <span className="text-gray-400">Length:</span>
            <span className="text-white ml-2">
              {data.length.toLocaleString()} m
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="relative flex flex-wrap gap-2">
        {data.manufacturers?.slice(0, 2).map((manufacturer, index) => (
          <Badge
            key={manufacturer + " " + index}
            variant="secondary"
            className="text-xs"
          >
            {manufacturer}
          </Badge>
        ))}
        {data.MGLT && (
          <Badge
            variant="outline"
            className="text-xs border-sw-cyan/30 text-sw-cyan/80"
          >
            {data.MGLT} MGLT
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};

export default StarshipCard;
