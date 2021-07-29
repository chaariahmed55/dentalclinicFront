import {User} from './user';

export class Article {
  id: number;
  description: string;
  imagepath: string;
  date: string;
  title: string;
  user: User;
}
