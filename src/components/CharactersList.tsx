import { graphql } from "relay-runtime";
import { usePreloadedQuery, type PreloadedQuery } from "react-relay";
import { CharacterCard } from "./CharacterCard";
import type { CharactersListQuery } from "./__generated__/CharactersListQuery.graphql";

export const CharactersListQueryNode = graphql`
  query CharactersListQuery($first: Int) {
    allPeople(first: $first) {
      people {
        id
        ...CharacterCard_person
      }
      totalCount
    }
  }
`;

interface CharactersListProps {
  queryRef: PreloadedQuery<CharactersListQuery>;
}

const CharactersList = ({ queryRef }: CharactersListProps) => {
  const data = usePreloadedQuery<CharactersListQuery>(
    CharactersListQueryNode,
    queryRef,
  );

  const people =
    data?.allPeople?.people?.filter(
      (person): person is NonNullable<typeof person> => person != null,
    ) || [];

  return (
    <div>
      <div className="mb-4 text-sm text-gray-400">
        Showing {people.length} of {data?.allPeople?.totalCount || 0} characters
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {people.map((person) => (
          <CharacterCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default CharactersList;
