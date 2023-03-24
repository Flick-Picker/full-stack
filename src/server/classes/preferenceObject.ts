class PreferenceObject {
  constructor(
    public likedGenres: string[],
    public dislikedGenres: string[],
    public preferredRatings: number,
    public moviePreference: number,
    public tvShowPreference: number,
    public animePreference: number,
    public runtimePreference: number,
    public recentReleasePreference: number,
    public yearRangePreference: number[],
    public popularityPreference: number,
  ) {
    this.likedGenres = likedGenres;
    this.dislikedGenres = dislikedGenres;
    this.preferredRatings = preferredRatings;
    this.moviePreference = moviePreference;
    this.tvShowPreference = tvShowPreference;
    this.animePreference = animePreference;
    this.runtimePreference = runtimePreference;
    this.recentReleasePreference = recentReleasePreference;
    this.yearRangePreference = yearRangePreference;
    this.popularityPreference = popularityPreference;
  }
}

export default PreferenceObject;
