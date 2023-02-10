import { News } from '../../news/news.service';

function renderNewsBlock(news: News) {
  return `
    <div class="card" style="width: 18rem; text-align: center">
        <a href="/news/${news.id}" class="card-link">
${
  news.cover
    ? `<img src="${news.cover}" style="object-fit: cover; height: 200px;" class="card-img-top" alt="...">`
    : ''
}
        <div class="card-body">
            <h5 class="card-title">${news.title}</h5>
            <p class="card-text">${news.author}</p>
            <p class="card-text">${news.description}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">An item</li>
        </ul>
        <div class="card-body">
        </div></a>
    </div>
  `;
}

export function renderNewsAll(news: News[]) {
  let html = '';
  for (const newsItem of news) {
    html += renderNewsBlock(newsItem);
  }
  return `<h1>Список новостей:</h1>
  <div class="row">${html}</div>
`;
}
