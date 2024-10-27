export interface IVideogame extends IItems {
  companies: string[];
  platforms: string[];
}
export interface IMovie extends IItems {
  runtime: number;
  director: string;
  cast: string[];
}
export interface IBook extends IItems {
  numPages: number;
  authors: string[];
  numEditions: number;
}
export interface IItems {
  id: number;
  name: string;
  rating: number;
  release_date: Date;
  description: string;
  image_url: string;
}
export type itemType = IVideogame | IMovie | IBook;
export interface IItemState {
  userItems: itemType[];
  searchedItems: itemType[];
  selectedItems: itemType[];
  currentItemDetails: itemType | null;
}
interface IFilterTerms {
  value: string;
  allowExternalFilter: boolean;
}
const ItemFilterKeys = [
  { value: "title", allowExternalFilter: true },
  { value: "rating", allowExternalFilter: false },
  { value: "release_date", allowExternalFilter: false },
] as IFilterTerms[];
const GameFilterKeys = [
  { value: "Company", allowExternalFilter: false },
  { value: "platform", allowExternalFilter: false },
] as IFilterTerms[];
const BookFilterKeys = [
  { value: "page count", allowExternalFilter: false },
  { value: "author", allowExternalFilter: true },
  { value: "edition count", allowExternalFilter: false },
];
const MovieFilterKeys = [
  { value: "runtime", allowExternalFilter: false },
  { value: "director", allowExternalFilter: true },
  { value: "cast member", allowExternalFilter: true },
];

export const ItemGameFilterKeys = [...ItemFilterKeys,...GameFilterKeys] as IFilterTerms[];
export const ItemMovieFilterKeys = [
  ...ItemFilterKeys,
  ...MovieFilterKeys,
] as IFilterTerms[];
export const ItemBookFilterKeys = [
  ...ItemFilterKeys,
  ...BookFilterKeys,
] as IFilterTerms[];