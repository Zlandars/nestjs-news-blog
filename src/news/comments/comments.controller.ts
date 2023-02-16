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
} from '@nestjs/common';
import { Comment, CommentsService, EditComment } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Patch('/api/:idNewsParam/:idCommentParam')
  edit(
    @Param('idNewsParam') idNewsParam: string,
    @Param('idCommentParam') idCommentParam: string,
    @Body() comment: EditComment,
  ) {
    const idNews = parseInt(idNewsParam);
    const idComment = parseInt(idCommentParam);
    return this.commentService.edit(idNews, idComment, comment);
  }

  @Post('/api')
  create(
    @Body('idNews') idNewsParam: string,
    @Body() comment: Comment,
    @Req() headers,
    @Res() res,
  ) {
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
