import fs from 'fs';
import AnimeGenre from '../classes/animeGenre';
import GenreObject from '../classes/genreObject';

const getAnimeGenres = async () => {
  try {
    const data = fs.readFileSync('../static/anime_tv_batch.json');
    const genres: AnimeGenre[] = [];
    let genreCounter = 1;
    const lines = data.toString().split('\n');
    for (let i = 0; i < lines.length; i += 1) {
      let line = lines[i];
      if (line.includes('genres')) {
        i += 1;
        line = lines[i];
        while (!line.includes(']')) {
          if (line.includes('"name":')) {
            const name = line.substring(line.indexOf(': "') + 3, line.lastIndexOf('"'));
            let add = true;
            for (let j = 0; j < genres.length; j += 1) {
              const curGenre = genres[j];
              if (curGenre.name.toLowerCase() === name.toLowerCase()) {
                add = false;
                break;
              }
            }
            if (add) {
              genres.push(new AnimeGenre(genreCounter.toString(), name.toLowerCase()));
              genreCounter += 1;
            }
          }
          i += 1;
          line = lines[i];
        }
      }
    }
    fs.writeFile('../static/anime_tv_genres.json', JSON.stringify(new GenreObject(genres)), (err) => {
      if (err) console.log(err);
    });
  } catch (e:any) {
    console.log(e.toString());
  }
};

console.log('Getting anime genres...');
getAnimeGenres();
console.log('Finished getting anime genres!');
