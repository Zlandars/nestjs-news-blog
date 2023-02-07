import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { News, NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/all')
  @HttpCode(200)
  allNews(): News[] {
    return this.newsService.allNews();
  }

  @Get('/:id')
  @HttpCode(200)
  get(@Param('id') idOrig: string): News {
    const id = parseInt(idOrig);
    return this.newsService.find(id);
  }

  @Post()
  @HttpCode(200)
  create(@Body() news: News): News[] {
    return this.newsService.create(news);
  }

  @Delete('/:id')
  @HttpCode(200)
  delete(@Param('id') idOrig: string): string {
    const id = parseInt(idOrig);
    const isRemoved = this.newsService.remove(id);
    return isRemoved ? 'Новость удалена' : 'Передан неверный id';
  }
}
