export interface Preference {
  uid: string;
  likedGenres: string[];
  dislikedGenres: string[];
  preferredRatings: number;
  moviePreference: number;
  tvShowPreference: number;
  animePreference: number;
  runtimePreference: number;
  recentReleasePreference: number;
  yearRangePreference: number[];
  popularityPreference: number;
}
