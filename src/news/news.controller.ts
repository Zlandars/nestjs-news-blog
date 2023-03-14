import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Render,
  Res,
  UploadedFile,
  UseGuards,
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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../auth/role/role.enum';
import { Roles } from '../auth/role/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

// function difference(newNews: NewsEntity, oldNews: NewsEntity) {
//   const result = {};
//   Object.keys(oldNews).map((key) => {
//     if (oldNews[key] != newNews[key]) {
//       result[key] = newNews[key];
//     }
//   });
//   return result;
// }

@ApiBearerAuth()
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
  async allNewsView() {
    const news = await this.newsService.getAll();
    return { news: news, title: 'Список новостей' };
  }

  @Get('/:id')
  @Render('news')
  @HttpCode(200)
  async getNewsView(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<NewsEntity> {
    const news = await this.newsService.findById(id);
    if (!news) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Новость была не найдена',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return news;
  }

  @Get('/:id/edit')
  @Render('news-edit')
  @HttpCode(200)
  async editNewsView(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<NewsEntity> {
    const news = await this.newsService.findById(id);
    if (!news) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Новость была не найдена',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return news;
  }

  @Get('/api/all')
  @HttpCode(200)
  createNewsView(): Promise<NewsEntity[]> {
    return this.newsService.getAll();
  }

  @Get('/api/:id')
  @HttpCode(200)
  get(@Param('id', ParseIntPipe) id: number): Promise<NewsEntity> {
    const news = this.newsService.findById(id);
    if (!news) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Новость была не найдена',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return news;
  }

  @ApiOperation({ summary: 'Создание новости' })
  @ApiResponse({
    status: 200,
    description: 'Новость успешно создалась',
    type: NewsEntity,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.Moderator)
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
    @Body() news: any,
    @UploadedFile() cover: Express.Multer.File,
    @Res() response,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<News[]> {
    const oldNews = await this.newsService.findById(id);
    if (!oldNews) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Новость была не найдена',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    // if (oldNews) {
    if (cover?.filename) {
      news.cover = '/' + cover.filename;
    }
    // const editedNews = await this.newsService.edit(id, news);
    // const diff = difference(editedNews, oldNews);
    // await this.mailService.editedNewsForAdmin(
    //   ['mag20102009@gmail.com'],
    //   oldNews,
    //   diff,
    // );
    // }
    await this.newsService.edit(id, news);
    return response.redirect(`/news/${id}`);
  }

  @Delete('/api/:id')
  @HttpCode(200)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const isRemoved = await this.newsService.remove(id);
    throw new HttpException(
      {
        status: HttpStatus.OK,
        error: isRemoved ? 'Новость удалена' : 'Передан неверный идентификатор',
      },
      HttpStatus.OK,
    );
  }
}
