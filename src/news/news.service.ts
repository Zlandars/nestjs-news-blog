import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comments/comments.service';
import { NewsEntity } from './news.entity';
import { CreateNewsDto } from './dto/create.news.dto';
import { UsersService } from '../users/users.service';

export type News = {
  id?: number;
  title: string;
  description: string;
  author: string;
  countView?: number;
  cover?: string;
  comments?: Comment[];
};

export type NewsEdit = Partial<News>;

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private newsRepository: Repository<NewsEntity>,
    private usersService: UsersService,
  ) {}

  async create(news: CreateNewsDto): Promise<NewsEntity> {
    const newsEntity = new NewsEntity();
    newsEntity.title = news.title;
    newsEntity.description = news.description;
    newsEntity.cover = news.cover;
    newsEntity.user = await this.usersService.findById(news.userId);
    return this.newsRepository.save(newsEntity);
  }

  findById(id: News['id']): Promise<NewsEntity> {
    return this.newsRepository.findOne({
      where: { id },
      relations: ['user', 'comments', 'comments.user'],
    });
  }

  getAll(): Promise<NewsEntity[]> {
    return this.newsRepository.find({ relations: ['user'] });
  }

  async remove(id: number): Promise<NewsEntity | null> {
    const removeNews = await this.findById(id);
    console.log(removeNews);
    if (removeNews) {
      return this.newsRepository.remove(removeNews);
    }
    return null;
  }

  async edit(id: number, news: NewsEntity): Promise<NewsEntity | null> {
    const editedNews = await this.findById(id);
    if (editedNews) {
      editedNews.title = news.title || editedNews.title;
      editedNews.description = news.description || editedNews.description;
      editedNews.cover = news.cover || editedNews.cover;
      return await this.newsRepository.save(editedNews);
    }
    return null;
  }
}
