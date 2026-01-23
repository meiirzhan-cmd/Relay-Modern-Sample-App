import { graphql } from "relay-runtime";
import { FilmCard } from "./FilmCard";
import { usePreloadedQuery, type PreloadedQuery } from "react-relay";
import type { FilmsListQuery } from "./__generated__/FilmsListQuery.graphql";

const filmsQuery = graphql`
  query FilmsListQuery {
    allFilms {
      films {
        id
        ...FilmCard_film
      }
    }
  }
`;

type Props = {
  queryRef: PreloadedQuery<FilmsListQuery>;
};

export const FilmsList = (props: Props) => {
  const data = usePreloadedQuery<FilmsListQuery>(filmsQuery, props.queryRef);

  const films =
    data?.allFilms?.films?.filter(
      (film): film is NonNullable<typeof film> => film != null,
    ) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {films.map((film) => (
        <FilmCard key={film.id} film={film} />
      ))}
    </div>
  );
};

export default FilmsList;
