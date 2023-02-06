import fs from 'fs';
import animeTV from '../static/anime_tv_batch.json';
import AnimeTvObject from '../classes/animeTvObject';

function parseAnimeTvGenre(genres: { name: string; }[]) {
  const returnGenres = new Set<String>();
  genres.forEach((genre: { name: string; }) => {
    returnGenres.add(genre.name.toLowerCase());
  });
  return Array.from(returnGenres);
}

const getAnimeTv = async () => {
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
      ),
    );
  });

  fs.writeFile('../static/anime_tv.json', JSON.stringify(anime), (err) => {
    if (err) console.log(err);
  });
};

console.log('Parsing anime tv...');
getAnimeTv();
console.log('Finished parsing anime tv!');
