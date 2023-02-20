import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Render,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { News, NewsService } from './news.service';
import { CommentsService } from './comments/comments.service';
import { renderNewsAll } from '../views/news/news-all';
import { renderTemplate } from '../views/template';
import { NewsPage } from '../views/news/news';
import { CommentListView } from '../views/news/comments/coments';
import { CreateNewsDto } from './dto/create.news.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { HelperFileLoader } from '../utils/HelperFileLoad';
import { diskStorage } from 'multer';
import { EditNewsDto } from './dto/edit.news.dto';
import { DeleteNewsDto } from './dto/delete.news.dto';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentService: CommentsService,
  ) {}

  @Get('/')
  @Render('/')
  @HttpCode(200)
  allNewsView() {
    const news = this.newsService.allNews();
    console.log(news);
    // const content = renderNewsAll(news);
    return news;
  }

  @Get('/:id')
  @HttpCode(200)
  getNewsView(@Param('id') idOrig: string): string {
    const id = parseInt(idOrig);
    const news = this.newsService.find(id);
    // Чтобы функция не влияла на комменты
    const comments = [...this.commentService.find(id)] || [];
    const readyComments = CommentListView(comments);
    // Счетчик просмотров
    ++news.countView;
    const readyNews = NewsPage(news, readyComments);
    return renderTemplate(readyNews, {
      title: `Новость #${id}`,
      description: 'новости',
    });
  }

  @Get('/api/all')
  @HttpCode(200)
  allNews(): News[] {
    return this.newsService.allNews();
  }

  @Get('/api/:id')
  @HttpCode(200)
  get(@Param('id') idOrig: string): News {
    const id = parseInt(idOrig);
    const news = this.newsService.find(id);
    const comments = this.commentService.find(id);
    return {
      ...news,
      comments,
    };
  }

  @Patch('/api')
  edit(@Body() news: EditNewsDto): News[] {
    return this.newsService.edit(news);
  }

  @Post('/api')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: HelperFileLoader.destinationPath,
        filename: HelperFileLoader.customFileName,
      }),
    }),
  )
  @HttpCode(200)
  create(
    @Body() news: CreateNewsDto,
    @UploadedFile() cover: Express.Multer.File,
  ): News[] {
    if (cover?.filename) {
      news.cover = '/' + cover.filename;
    }
    return this.newsService.create(news);
  }

  @Delete('/api/:id')
  @HttpCode(200)
  delete(@Param('id') idOrig: DeleteNewsDto): string {
    // @ts-ignore
    const isRemoved = this.newsService.remove(parseInt(idOrig));
    return isRemoved ? 'Новость удалена' : 'Передан неверный id';
  }
}
