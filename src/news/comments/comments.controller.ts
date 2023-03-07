import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { EditCommentDto } from './dto/edit.comment.dto';
import { CreateCommentDto } from './dto/create.comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post('/api/:idNews')
  create(
    @Param('idNews', ParseIntPipe) idNews: number,
    @Body() comment: CreateCommentDto,
  ) {
    // const jwtUserId = req.user.userId;
    const jwtUserId = 2;
    return this.commentService.create(idNews, comment.message, jwtUserId);
  }

  @Put('/api/:idComment')
  edit(
    @Param('idComment', ParseIntPipe) idComment: number,
    @Body() comment: EditCommentDto,
  ) {
    return this.commentService.edit(idComment, comment);
  }

  @Get('/api/details/:idNews')
  get(@Param('idNews', ParseIntPipe) idNews: number) {
    return this.commentService.find(idNews);
  }

  @Delete('/api/details/:idComment')
  remove(@Param('idComment', ParseIntPipe) idComment: number) {
    return this.commentService.remove(idComment);
  }
}
