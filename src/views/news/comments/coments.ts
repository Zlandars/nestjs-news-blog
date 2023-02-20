import { Comment } from '../../../news/comments/comments.service';

function renderCommentsBlock(comment: Comment) {
  return `
  <li id="${comment.id}">
  ${
    comment.logo
      ? `<img src="${comment.logo}" style="border-radius: 25%; height: 100px">`
      : ''
  }
  Author: ${comment.author}
  <br>
  Message: ${comment.message}
  <br>
  <button id="${comment.id}" onclick="replyComment(event)">Reply</button>
  <script>
  function replyComment(e) {
       const form = document.querySelector("#comments");
       form.idAnswer.value = e.target.id;
  }
</script>
</li>
  `;
}

export function CommentListView(comments: Comment[], margin = 0) {
  let html = '';
  for (const item of comments) {
    const arrSub = comments.filter((i) => {
      const boolean = item.id == i.idAnswer;
      if (boolean) {
        const index = comments.findIndex((it) => it.id === item.id);
        if (index == -1) {
          return null;
        }
        comments.splice(index, 1);
      }
      return boolean;
    });
    html += renderCommentsBlock(item);
    if (arrSub.length != 0) {
      html += CommentListView(arrSub, margin + 50);
    }
  }
  return `<ul style="list-style: none; margin-left: ${margin}px">
  ${html}
  </ul>
`;
}
