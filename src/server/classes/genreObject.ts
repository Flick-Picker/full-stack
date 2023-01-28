import AnimeGenre from './animeGenre';

class GenreObject {
  constructor(public genres: AnimeGenre[]) {
    this.genres = genres;
  }
}

export default GenreObject;
