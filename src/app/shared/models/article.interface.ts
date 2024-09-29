import {Profile} from './profile.interface';

export interface ArticleRequest {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}

export interface ArticleResponse {
  article: Article;
}

export interface Article {
  title: string;
  description: string;
  body?: string;
  tagList: PopularTag[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  author: Profile;
}

export type PopularTag = string;
