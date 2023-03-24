class TVObject {
  constructor(
    public name: string,
    public genres: String[],
    public imageURL: string,
    public rating: number,
    public numberOfVotes: number,
    public popularity: number,
    public year: number,
    public runtime: number,
  ) {
    this.name = name;
    this.genres = genres;
    this.imageURL = imageURL;
    this.rating = rating;
    this.numberOfVotes = numberOfVotes;
    this.popularity = popularity;
    this.year = year;
    this.runtime = runtime;
  }
}

export default TVObject;
