import fs from 'fs';
import animeTV from '../static/anime_tv_batch.json';
import AnimeTvObject from '../classes/animeTvObject';

function parseAnimeTvGenre(genres: { name: string; }[]) {
  const returnGenres = new Set<String>();
  genres.forEach((genre: { name: string; }) => {
    returnGenres.add(genre.name.toLowerCase());
  });
  return returnGenres;
}

const getAnimeTv = async () => {
  const anime: AnimeTvObject[] = [];
  animeTV.forEach((show) => {
    let name = show.title;
    if (show.title_english != null) {
      name = show.title_english;
    }
    const malID = show.mal_id;
    const rating = show.score;
    const imageURL = show.images.jpg.image_url;
    const genres = parseAnimeTvGenre(show.genres);
    anime.push(new AnimeTvObject(Array.from(genres.values()), name, malID, imageURL, rating));
  });

  fs.writeFile('../static/anime_tv.json', JSON.stringify(anime), (err) => {
    if (err) console.log(err);
  });
};

console.log('Parsing anime tv...');
getAnimeTv();
console.log('Finished parsing anime tv!');
