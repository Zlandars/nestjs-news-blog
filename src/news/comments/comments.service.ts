import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsEntity } from './comments.entity';
import { Repository } from 'typeorm';
import { NewsService } from '../news.service';
import { UsersService } from '../../users/users.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventsComment } from './EventsComment.enum';

export type Comment = {
  id?: number;
  message: string;
  author: string;
  logo?: string;
  idNews: number;
  idAnswer?: number;
};

export type CommentEdit = Partial<Comment>;

export type Comments = Record<string, Comment[]>;

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly commentsRepository: Repository<CommentsEntity>,
    private readonly newsService: NewsService,
    private readonly userService: UsersService,
    private readonly eventEmmiter: EventEmitter2,
  ) {}

  async create(
    idNews: number,
    message: string,
    idUser: number,
  ): Promise<CommentsEntity> {
    const _news = await this.newsService.findById(idNews);
    if (!_news) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Новость не найдена',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const _user = await this.userService.findById(idUser);
    if (!_user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Пользователь не найден',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const commentEntity = new CommentsEntity();
    commentEntity.news = _news;
    commentEntity.user = _user;
    commentEntity.message = message;

    return this.commentsRepository.save(commentEntity);
  }

  async edit(idComment: number, comment: CommentEdit): Promise<CommentsEntity> {
    const _comment = await this.commentsRepository.findOne({
      where: { id: idComment },
      relations: ['news', 'user'],
    });
    if (!_comment) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Комментарий не найден',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    _comment.message = comment.message;
    const commentary = await this.commentsRepository.save(_comment);
    this.eventEmmiter.emit(EventsComment.edit, {
      commentId: commentary.id,
      newsId: commentary.news.id,
      comment: commentary.message,
    });
    return commentary;
  }

  async find(idNews: number): Promise<CommentsEntity[]> {
    return this.commentsRepository.find({
      where: { news: { id: idNews } },
      relations: ['user'],
    });
  }

  async remove(idComment: number): Promise<CommentsEntity> {
    const _comment = await this.commentsRepository.findOne({
      where: { id: idComment },
      relations: ['news', 'user'],
    });
    if (!_comment) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Комментарий не найден',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const comment = await this.commentsRepository.remove(_comment);
    this.eventEmmiter.emit('comment.remove', {
      newsId: comment.news.id,
      commentId: idComment,
    });
    return comment;
  }
}
