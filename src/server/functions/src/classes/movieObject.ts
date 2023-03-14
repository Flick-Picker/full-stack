class MovieObject {
  constructor(
    public name: string,
    public genres: String[],
    public imageURL: string,
    public rating: number,
    public numberOfVotes: number,
    public popularity: number,
    public releaseDate: string,
  ) {
    this.name = name;
    this.genres = genres;
    this.imageURL = imageURL;
    this.rating = rating;
    this.numberOfVotes = numberOfVotes;
    this.popularity = popularity;
    this.releaseDate = releaseDate;
  }
}

export default MovieObject;
