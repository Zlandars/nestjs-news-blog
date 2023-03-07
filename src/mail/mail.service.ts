import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { News } from '../news/news.service';
import { NewsEntity } from '../news/news.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendTest() {
    console.log('Отправляется письмо установки');
    return await this.mailerService
      .sendMail({
        to: 'mag20102009@gmail.com',
        subject: '🤩 Наше первое письмо!',
        template: './test',
      })
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  async sendNewNewsForAdmins(emails: string[], news: NewsEntity) {
    console.log('Отправляются письма о новой новости администрации ресурса');
    console.log(news);
    for (const email of emails) {
      await this.mailerService
        .sendMail({
          to: email,
          subject: `Создана новая новость: ${news.title}`,
          template: './new-news',
          context: { news },
        })
        .then((res) => {
          console.log('res', res);
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }

  async editedNewsForAdmin(emails: string[], news: NewsEntity, difference) {
    console.log({ news, difference });
    for (const email of emails) {
      await this.mailerService
        .sendMail({
          to: email,
          subject: `${
            difference.title
              ? `Была новость: ${news.title} > ${difference.title} `
              : `Отредактирована новая новость: ${news.title}`
          }`,
          template: './edited-news',
          context: { news: news, diff: difference },
        })
        .then((res) => {
          console.log('res', res);
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }
}
