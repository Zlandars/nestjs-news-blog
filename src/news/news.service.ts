import { Injectable } from '@nestjs/common';
import { Comment } from './comments/comments.service';
import { getRandomInt } from '../utils/utils';
import { DeleteNewsDto } from './dto/delete.news.dto';

export type News = {
  id?: number;
  title: string;
  description: string;
  author: string;
  countView: number;
  comments?: Comment[];
  cover?: string;
};

export type NewsEdit = Partial<News>;

@Injectable()
export class NewsService {
  private readonly news: News[] = [
    {
      id: 1,
      title: 'First',
      description: 'First news description',
      author: 'Eugen',
      countView: 1,
      comments: [],
      cover:
        'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
    },
  ];

  create(news: News): News[] {
    // if (this.find(news.id) == undefined) {
    this.news.push({
      ...news,
      id: getRandomInt(),
    });
    return this.news;
    // }
    // return this.edit(news);
  }

  find(id: number) {
    return this.news.find((item) => item.id === id);
  }

  remove(id: number) {
    const indexRemove = this.news.findIndex((item) => item.id === id);
    if (indexRemove !== -1) {
      this.news.splice(indexRemove, 1);
      return true;
    }
    return false;
  }

  edit(news: NewsEdit): News[] {
    const indexRemove = this.news.findIndex((item) => item.id === news.id);
    if (indexRemove !== -1) {
      this.news[indexRemove] = {
        ...this.news[indexRemove],
        ...news,
      };
    }
    return this.news;
  }

  allNews(): News[] {
    return this.news;
  }
}
