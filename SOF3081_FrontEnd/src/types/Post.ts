import type { IUser } from "./User";

export interface IPost {
  id?: number;
  title: string;
  content: string;
  image?: string;

  user?: IUser;
}
