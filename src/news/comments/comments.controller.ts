import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create.comment.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Post('/api/:idNews')
  @UseGuards(JwtAuthGuard)
  create(
    @Param('idNews', ParseIntPipe) idNews: number,
    @Body() comment: CreateCommentDto,
    @Req() req,
  ) {
    const jwtUserId = req.user.userId;
    return this.commentService.create(idNews, comment.message, jwtUserId);
  }

  @Put('/api/:idComment')
  @UseGuards(JwtAuthGuard)
  edit(@Param('idComment', ParseIntPipe) idComment: number, @Body() comment) {
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
