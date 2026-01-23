import { graphql, useLazyLoadQuery } from "react-relay";
import type { PlanetsListQuery } from "./__generated__/PlanetsListQuery.graphql";
import PlanetCard from "./PlanetCard";

const planetsQuery = graphql`
  query PlanetsListQuery($first: Int) {
    allPlanets(first: $first) {
      planets {
        id
        ...PlanetCard_planet
      }
      totalCount
    }
  }
`;

interface PlanetsListProps {
  count?: number;
}

export const PlanetsList = ({ count = 12 }: PlanetsListProps) => {
  const data = useLazyLoadQuery<PlanetsListQuery>(planetsQuery, {
    first: count,
  });

  const planets =
    data?.allPlanets?.planets?.filter(
      (planet): planet is NonNullable<typeof planet> => planet != null,
    ) || [];

  return (
    <div>
      <div className="mb-4 text-sm text-gray-400">
        Showing {planets.length} of {data?.allPlanets?.totalCount || 0} planets
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {planets.map((planet) => (
          <PlanetCard key={planet.id} planet={planet} />
        ))}
      </div>
    </div>
  );
};
