class AnimeTvObject {
  constructor(
    public genres: String[],
    public name: string,
    public malID: number,
    public imageURL: string,
    public rating: number,
    public numberOfVotes: number,
  ) {
    this.name = name;
    this.genres = genres;
    this.malID = malID;
    this.imageURL = imageURL;
    this.rating = rating;
    this.numberOfVotes = numberOfVotes;
  }
}

export default AnimeTvObject;
