import {Article} from '../../models/article.interface';

export interface GetFeedResponseInterface {
  articles: Article[];
  articlesCount: number;
}
