import { Injectable } from '@nestjs/common';
import { getRandomInt } from '../news.service';

export type Comment = {
  id?: number;
  message: string;
  author: string;
  idNews: number;
  answer?: Comment[];
};

export type EditComment = {
  id: number;
  message: string;
  author: string;
  idNews: number;
  answer?: Comment[];
};

@Injectable()
export class CommentsService {
  private readonly comments = {
    '1': [
      { idNews: '1', author: 'qwe', message: '123', id: 1 },
      { idNews: '1', author: 'qwe', message: '123', id: 2 },
      { idNews: '1', author: 'qwe', message: '123', id: 3, idAnswer: 1 },
    ],
  };

  create(idNews: number, comment: Comment) {
    if (idNews === undefined && comment.idNews) {
      idNews = comment.idNews;
    }
    if (this.comments[idNews] === undefined) {
      this.comments[idNews] = [];
    }
    this.comments[idNews].push({
      ...comment,
      id: getRandomInt(),
    });
    console.log(this.comments);
    return this.comments[idNews];
  }

  find(idNews: number): Comment[] {
    return this.comments[idNews] || undefined;
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