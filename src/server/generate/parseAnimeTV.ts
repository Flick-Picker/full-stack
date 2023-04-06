import * as fs from 'fs';
import animeTV from '../api-json/anime_tv_batch.json';
import AnimeTvObject from '../classes/animeTvObject';

/**
 * Parses the genre(s) of an anime tv show into an array
 * @param genres the genre(s) of the anime from the external API
 */
function parseAnimeTvGenre(genres: { name: string; }[]) {
  const returnGenres = new Set<String>();
  genres.forEach((genre: { name: string; }) => {
    returnGenres.add(genre.name.toLowerCase());
  });
  return Array.from(returnGenres);
}

/**
 * Parses the anime tv api-json and creates anime tv objects. The goal is to
 * reduce the amount of data present by only including needed data. Some data requires
 * some separate mapping (see parseAnimeTvGenre).
 */
export const getAnimeTv = async () => {
  const anime: AnimeTvObject[] = [];
  animeTV.forEach((show) => {
    let name = show.title;
    if (show.title_english != null) {
      name = show.title_english;
    }
    anime.push(
      new AnimeTvObject(
        parseAnimeTvGenre(show.genres),
        name,
        show.mal_id,
        show.images.jpg.large_image_url,
        show.score,
        show.scored_by,
        Number.parseInt(show.duration.replace(/\D*/, ''), 10),
        show.aired.prop.from.year,
      ),
    );
  });

  fs.writeFile('../static/anime_tv.json', JSON.stringify(anime), (err: any) => {
    if (err) console.log(err);
  });
};
