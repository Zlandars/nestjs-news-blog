import { Injectable } from '@nestjs/common';
import { getRandomInt } from '../../utils/utils';

export type Comment = {
  id?: number;
  message: string;
  author: string;
  logo?: string;
  idNews: number;
  idAnswer?: number;
};

export type EditComment = Partial<Comment>;

export type Comments = Record<string, Comment[]>;

@Injectable()
export class CommentsService {
  private readonly comments: Comments = {
    '1': [
      { idNews: 1, author: 'First', message: 'First message 123', id: 1 },
      { idNews: 1, author: 'Second', message: 'Second message 123', id: 2 },
      {
        idNews: 1,
        author: 'first Answer',
        message: 'first Answer messsge123',
        id: 3,
        idAnswer: 1,
      },
      {
        idNews: 1,
        author: 'Secong answEugen',
        message: 'Second answer message',
        id: 4,
        idAnswer: 1,
      },
    ],
  };

  create(idNews: number, comment: Comment) {
    console.log('service');
    if (idNews === undefined && comment.idNews) {
      idNews = comment.idNews;
    }
    if (comment.id) {
      return this.edit(idNews, comment.id, comment);
    }
    if (this.comments[idNews] === undefined) {
      this.comments[idNews] = [];
    }
    this.comments[idNews].push({
      ...comment,
      id: getRandomInt(),
    });
    return this.comments[idNews];
  }

  find(idNews: number): Comment[] {
    if (!this.comments[idNews]) {
      this.comments[idNews] = [];
    }
    return this.comments[idNews];
  }

  remove(idNews: number, idComment: number): Comment[] | null {
    if (!this.comments[idNews]) {
      return null;
    }
    const indexComment = this.comments[idNews].findIndex(
      (item) => item.id === idComment,
    );
    if (indexComment == -1) {
      return null;
    }
    this.comments[idNews].splice(indexComment, 1);
    return this.comments[idNews];
  }

  edit(idNews: number, idComment: number, comment: EditComment) {
    const indexRemove = this.comments[idNews].findIndex(
      (item) => item.id === idComment,
    );
    if (indexRemove !== -1) {
      this.comments[idNews][indexRemove] = {
        ...this.comments[idNews][indexRemove],
        ...comment,
      };
    }
    return this.comments[idNews];
  }
}
