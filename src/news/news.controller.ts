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
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { News, NewsService } from './news.service';
import { CommentsService } from './comments/comments.service';
import { renderTemplate } from '../views/template';
import { NewsPage } from '../views/news/news';
import { CommentListView } from '../views/news/comments/coments';
import { CreateNewsDto } from './dto/create.news.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { HelperFileLoader } from '../utils/HelperFileLoad';
import { diskStorage } from 'multer';
import { EditNewsDto } from './dto/edit.news.dto';
import { MailService } from '../mail/mail.service';

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

  @Get('/create/view')
  @Render('create-news')
  @HttpCode(200)
  createView() {
    return {};
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

  @Patch('/api')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: HelperFileLoader.destinationPath,
        filename: HelperFileLoader.customFileName,
      }),
    }),
  )
  @HttpCode(200)
  edit(
    @Body() news: EditNewsDto,
    @UploadedFile() cover: Express.Multer.File,
  ): News[] {
    console.log('isRunning');
    if (cover?.filename) {
      news.cover = '/' + cover.filename;
    }
    return this.newsService.edit(news);
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
  ): Promise<News> {
    if (cover?.filename) {
      news.cover = '/' + cover.filename;
    }
    const createdNews = this.newsService.create(news);
    await this.mailService.sendNewNewsForAdmins(
      ['mag20102009@gmail.com'],
      createdNews,
    );
    return response.redirect(`/news`);
  }

  @Delete('/api/:id')
  @HttpCode(200)
  delete(@Param('id') idOrig: string): string {
    const isRemoved = this.newsService.remove(parseInt(idOrig));
    return isRemoved ? 'Новость удалена' : 'Передан неверный id';
  }
}
