import {User} from './user';
import {Article} from './Article';

export class Rating {
  id: number;
  likes = 0;
  dislikes = 0;
  article: Article;
  user: User;
}
