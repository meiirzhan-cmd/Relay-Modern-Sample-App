import { graphql, usePreloadedQuery, type PreloadedQuery } from "react-relay";
import StarshipCard from "./StarshipCard";
import type { StarshipsListQuery } from "./__generated__/StarshipsListQuery.graphql";

export const StarshipsListQueryNode = graphql`
  query StarshipsListQuery($first: Int) {
    allStarships(first: $first) {
      starships {
        id
        ...StarshipCard_starship
      }
      totalCount
    }
  }
`;

interface Props {
  queryReference: PreloadedQuery<StarshipsListQuery>;
}

const StarshipsList = ({ queryReference }: Props) => {
  const data = usePreloadedQuery<StarshipsListQuery>(
    StarshipsListQueryNode,
    queryReference,
  );

  const starships =
    data?.allStarships?.starships?.filter(
      (starship): starship is NonNullable<typeof starship> => starship != null,
    ) || [];

  return (
    <div>
      <div className="mb-4 text-sm text-gray-400">
        Showing {starships.length} of {data?.allStarships?.totalCount || 0}{" "}
        starships
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {starships.map((starship) => (
          <StarshipCard key={starship.id} starship={starship} />
        ))}
      </div>
    </div>
  );
};

export default StarshipsList;
