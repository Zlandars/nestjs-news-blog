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
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { News, NewsService } from './news.service';
import { CommentsService } from './comments/comments.service';
import { CreateNewsDto } from './dto/create.news.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { HelperFileLoader } from '../utils/HelperFileLoad';
import { diskStorage } from 'multer';
import { MailService } from '../mail/mail.service';
import { NewsEntity } from './news.entity';

function difference(newNews: NewsEntity, oldNews: NewsEntity) {
  const result = {};
  Object.keys(oldNews).map((key) => {
    if (oldNews[key] != newNews[key]) {
      result[key] = newNews[key];
    }
  });
  return result;
}

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentService: CommentsService,
    private readonly mailService: MailService,
  ) {}

  @Get('/')
  @Render('news-list')
  @HttpCode(200)
  allNewsView() {
    return { news: this.newsService.allNews(), title: 'Список новостей' };
  }

  @Get('/:id')
  @Render('news')
  @HttpCode(200)
  getNewsView(@Param('id') idOrig: string): any {
    const id = parseInt(idOrig);
    const news = this.newsService.find(id);
    // Чтобы функция не влияла на комменты
    const comments = [...this.commentService.find(id)] || [];
    // const readyComments = CommentListView(comments);
    // Счетчик просмотров
    ++news.countView;
    // const readyNews = NewsPage(news, readyComments);
    return {
      news: news,
      comments: comments,
    };
  }

  @Get('/create/view')
  @Render('create-news')
  @HttpCode(200)
  createView() {
    return {};
  }

  @Get('/:id/edit')
  @Render('news-edit')
  @HttpCode(200)
  editNewsView(@Param('id') id: string) {
    return {
      news: this.newsService.find(parseInt(id)),
      title: `Новость ${id}`,
    };
  }

  @Get('/api/all')
  @HttpCode(200)
  createNewsView(): News[] {
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

  @Post('/api/create')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: HelperFileLoader.destinationPath,
        filename: HelperFileLoader.customFileName,
      }),
    }),
  )
  @HttpCode(200)
  async create(
    @Body() news: CreateNewsDto,
    @UploadedFile() cover: Express.Multer.File,
    @Res() response,
  ): Promise<NewsEntity> {
    if (cover?.filename) {
      news.cover = '/' + cover.filename;
    }
    const createdNews = await this.newsService.create(news);
    await this.mailService.sendNewNewsForAdmins(
      ['mag20102009@gmail.com'],
      createdNews,
    );
    return response.redirect(`/news`);
  }

  @Post('/api/:id/edit')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: HelperFileLoader.destinationPath,
        filename: HelperFileLoader.customFileName,
      }),
    }),
  )
  @HttpCode(200)
  async edit(
    @Body() news: NewsEntity,
    @UploadedFile() cover: Express.Multer.File,
    @Res() response,
    @Param('id') id: string,
  ): Promise<News[]> {
    const oldNews = await this.newsService.find(parseInt(id));
    if (oldNews) {
      if (cover?.filename) {
        news.cover = '/' + cover.filename;
      }
      const editedNews = this.newsService.edit(id, news);
      const diff = difference(editedNews, oldNews);
      await this.mailService.editedNewsForAdmin(
        ['mag20102009@gmail.com'],
        oldNews,
        diff,
      );
    }
    return response.redirect(`/news/${editedNews.id}`);
  }

  @Delete('/api/:id')
  @HttpCode(200)
  delete(@Param('id') id: string): string {
    const isRemoved = this.newsService.remove(parseInt(id));
    return isRemoved ? 'Новость удалена' : 'Передан неверный id';
  }
}
