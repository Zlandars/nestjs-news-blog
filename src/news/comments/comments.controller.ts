import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Comment, CommentsService, EditComment } from './comments.service';
import { EditCommentDto } from './dto/edit.comment.dto';
import { CreateCommentDto } from './dto/create.comment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from '../../utils/HelperFileLoad';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Patch('/api/:idNewsParam/:idCommentParam')
  edit(
    @Param('idNewsParam') idNewsParam: string,
    @Param('idCommentParam') idCommentParam: string,
    @Body() comment: EditCommentDto,
  ) {
    const idNews = parseInt(idNewsParam);
    const idComment = parseInt(idCommentParam);
    return this.commentService.edit(idNews, idComment, comment);
  }

  @Post('/api')
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: HelperFileLoader.destinationPath,
        filename: HelperFileLoader.customFileName,
      }),
    }),
  )
  create(
    @Body('idNews') idNewsParam: string,
    @Body() comment: CreateCommentDto,
    @UploadedFile() logo: Express.Multer.File,
    @Req() headers,
    @Res() res,
  ) {
    if (logo?.filename) {
      comment.logo = '/' + logo.filename;
    }
    const idNews = parseInt(idNewsParam);
    this.commentService.create(idNews, comment);
    return res.redirect(`${headers.headers.referer}`);
  }

  @Get('/api/:idNews')
  get(@Param('idNews') idNews: string): Comment[] {
    const id = parseInt(idNews);
    return this.commentService.find(id);
  }

  @Delete('/api/:idNewsParam/:idCommentParam')
  remove(
    @Param('idNewsParam') idNewsParam: string,
    @Param('idCommentParam') idCommentParam: string,
  ) {
    const idNews = parseInt(idNewsParam);
    const idComment = parseInt(idCommentParam);
    return this.commentService.remove(idNews, idComment);
  }
}
