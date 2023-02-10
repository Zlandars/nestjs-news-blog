import { News } from '../../news/news.service';
import { Comment } from '../../news/comments/comments.service';

export function NewsPage(news: News, comments: string) {
  return `<div class="row">
    	<div class="col-sm" style="text-align: center; background-color: #ffe; display: flex; flex-direction: column">
    	<h3><a href="/news" class="card-link">${news.title}</a></h3>
    	<img src="${news.cover}" alt="">
    	<span>Описание: ${news.description}</span>
    	<span>Просмотров: ${news.countView}</span>
    	<span>Автор: ${news.author}</span>
            <a href="/news" class="card-link">Card link</a>
</div>
<div class="col-sm">
  ${comments}
  <form action="/comments/api/" method="post">
  <input style="display:none;" name="idNews" value="${news.id}" readonly>
  <input name="author" placeholder="Author">
  <input name="message" type="text" placeholder="Message">
  <button>Отправить сообщение</button>
</form>
</div>
</div>
    `;
}
