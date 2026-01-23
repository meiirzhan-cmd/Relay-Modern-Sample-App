import { graphql, useFragment } from "react-relay";
import type { CharacterCard_person$key } from "./__generated__/CharacterCard_person.graphql";
import { User, MapPin, Ruler, Scale } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";

const CharacterCardFragment = graphql`
  fragment CharacterCard_person on Person {
    id
    name
    birthYear
    gender
    height
    mass
    eyeColor
    hairColor
    skinColor
    homeworld {
      name
    }
  }
`;

interface CharacterCardProps {
  person: CharacterCard_person$key;
}

export function CharacterCard({ person }: Readonly<CharacterCardProps>) {
  const data = useFragment(CharacterCardFragment, person);

  const getGenderStyle = (gender: string | null | undefined) => {
    switch (gender?.toLowerCase()) {
      case "male":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "female":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      default:
        return "";
    }
  };

  return (
    <Card className="group relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-sw-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div>
            <CardDescription className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-sw-blue" />
              Character
            </CardDescription>
            <CardTitle className="text-xl tracking-wider text-sw-blue">
              {data.name}
            </CardTitle>
          </div>
          <Badge
            variant="outline"
            className={`shrink-0 capitalize ${getGenderStyle(data.gender)}`}
          >
            {data.gender || "Unknown"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-gray-500" />
            <span className="text-gray-400">Height:</span>
            <span className="text-white">
              {data.height ? `${data.height}cm` : "Unknown"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-gray-500" />
            <span className="text-gray-400">Mass:</span>
            <span className="text-white">
              {data.mass ? `${data.mass}kg` : "Unknown"}
            </span>
          </div>
        </div>

        {data.homeworld?.name && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-sw-green" />
            <span className="text-gray-400">Homeworld:</span>
            <span className="text-sw-green font-medium">
              {data.homeworld.name}
            </span>
          </div>
        )}

        <div className="text-sm text-gray-400">
          Born:{" "}
          <span className="text-white">{data.birthYear || "Unknown"}</span>
        </div>
      </CardContent>

      <CardFooter className="relative flex flex-wrap gap-2">
        {data.eyeColor && data.eyeColor !== "unknown" && (
          <Badge variant="secondary" className="text-xs">
            👁 {data.eyeColor}
          </Badge>
        )}
        {data.hairColor &&
          data.hairColor !== "n/a" &&
          data.hairColor !== "none" && (
            <Badge variant="secondary" className="text-xs">
              💇 {data.hairColor}
            </Badge>
          )}
        {data.skinColor && (
          <Badge variant="secondary" className="text-xs">
            🎨 {data.skinColor}
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
}
