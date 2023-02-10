import { Comment } from '../../../news/comments/comments.service';

function renderCommentsBlock(comment: Comment) {
  return `
  <li id="${comment.id}" newsId="${comment.idNews}">
  Author: ${comment.author}
  <br>
  Message: ${comment.message}
</li>
  `;
}

export function CommentListView(comments: Comment[]) {
  let html = '';
  for (const item of comments) {
    if (item.idAnswer) {
      html += `<ul style="list-style: none; margin-left: 50px">`;
      const subComment = comments.find((i) => i.idAnswer == item.idAnswer);
      html += `
              <li id="${subComment.id}" newsId="${subComment.idNews}">
        Author: ${subComment.author}
        <br>
        Message: ${subComment.message}
      </li>
      `;
      html += `</ul>`;
    } else {
      html += renderCommentsBlock(item);
    }
  }
  return `<ul style="list-style: none">
  ${html}
  </ul>
`;
}
