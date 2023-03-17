class RecommendationObject {
  constructor(
    public name: string,
    public imageURL: string,
    public algorithmRating: number,
  ) {
    this.name = name;
    this.imageURL = imageURL;
    this.algorithmRating = algorithmRating;
  }
}

export default RecommendationObject;
