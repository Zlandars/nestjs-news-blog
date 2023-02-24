import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comments/comments.service';
import { getRandomInt } from '../utils/utils';
import { NewsEntity } from './news.entity';
import { CreateNewsDto } from './dto/create.news.dto';

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
  constructor(
    @InjectRepository(NewsEntity)
    private newsRepository: Repository<NewsEntity>,
  ) {}

  async create(news: CreateNewsDto): Promise<NewsEntity> {
    const newsEntity = new NewsEntity();
    newsEntity.title = news.title;
    newsEntity.description = news.description;
    newsEntity.cover = news.cover;
    return this.newsRepository.save(newsEntity);
  }

  async find(id: number): Promise<NewsEntity> {
    return await this.newsRepository.findOne(id);
  }

  async getAll(): Promise<NewsEntity[]> {
    return await this.newsRepository.find({});
  }

  remove(id: number) {
    // const indexRemove = this.news.findIndex((item) => item.id === id);
    // if (indexRemove !== -1) {
    //   this.news.splice(indexRemove, 1);
    //   return true;
    // }
    return false;
  }

  async edit(id: number, news: NewsEntity): Promise<NewsEntity | null> {
    const editedNews = await this.find(id);
    if (editedNews) {
      const newsEntity = new NewsEntity();
      newsEntity.title = news.title || editedNews.title;
      newsEntity.description = news.description || editedNews.description;
      newsEntity.cover = news.cover || editedNews.cover;
      return await this.newsRepository.save(newsEntity);
    }
    return null;
  }
}
