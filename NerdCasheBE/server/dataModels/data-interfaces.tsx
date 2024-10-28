interface IUsers {
  Username: string;
  Password: string;
}
interface IVideogames {
  Title: string;
  YearReleased: Date;
  Consoles: string;
  TotalRating: number;
  RatingCount: number;
  ImageURL: string;
  Companies: string;
  Description: string;
}

interface IUsersVideogames {
  UserId: number;
  GameId: number;
  UserRating: number | undefined;
  UserConsoles: string | undefined;
}
