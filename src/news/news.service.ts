import { Injectable } from '@nestjs/common';

export interface News {
  id: number;
  title: string;
  description: string;
  author: string;
  countView: number;
}

@Injectable()
export class NewsService {
  private readonly news: News[] = [
    {
      id: 1,
      title: 'First',
      description: 'First news description',
      author: 'Eugen',
      countView: 1,
    },
  ];

  create(news: News): News[] {
    if (this.find(news.id) == undefined) {
      this.news.push(news);
      return this.news;
    }
    return this.edit(news);
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

  private edit(news: News): News[] {
    const indexRemove = this.news.findIndex((item) => item.id === news.id);
    if (indexRemove !== -1) {
      this.news[indexRemove] = {
        ...news,
        title: news.title,
        description: news.description,
        author: news.author,
        countView: news.countView,
      };
      return this.news;
    }
    return this.news;
  }

  allNews(): News[] {
    console.log('allNews');
    return this.news;
  }
}
