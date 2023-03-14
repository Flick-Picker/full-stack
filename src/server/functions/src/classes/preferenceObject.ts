class PreferenceObject {
  constructor(
    public likedGenres: string[],
    public dislikedGenres: string[],
    public preferredRatings: number,
    public moviePreference: number,
    public tvShowPreference: number,
    public animePreference: number,
  ) {
    this.likedGenres = likedGenres;
    this.dislikedGenres = dislikedGenres;
    this.preferredRatings = preferredRatings;
    this.moviePreference = moviePreference;
    this.tvShowPreference = tvShowPreference;
    this.animePreference = animePreference;
  }
}

export default PreferenceObject;
