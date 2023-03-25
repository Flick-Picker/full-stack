class AnimeMovieObject {
  constructor(
    public genres: String[],
    public name: string,
    public malID: number,
    public imageURL: string,
    public rating: number,
    public numberOfVotes: number,
    public runtime: number,
    public year: number,
  ) {
    this.name = name;
    this.genres = genres;
    this.malID = malID;
    this.imageURL = imageURL;
    this.rating = rating;
    this.numberOfVotes = numberOfVotes;
    this.runtime = runtime;
    this.year = year;
  }
}

export default AnimeMovieObject;
