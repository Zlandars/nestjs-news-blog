('use strict');

const e = React.createElement;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      message: '',
    };
    this.idNews = parseInt(window.location.href.split('/').reverse()[0]);
    const bearerToken = Cookies.get('authorization');
    this.socket = io(`localhost:3003`, {
      query: {
        newsId: this.idNews,
      },
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: 'Bearer ' + bearerToken,
          },
        },
      },
    });
  }

  componentDidMount() {
    this.getAllComments();

    this.socket.on('newComment', (message) => {
      const comments = this.state.comments;
      comments.push(message);
      this.setState(comments);
    });
    this.socket.on('removeComment', (payload) => {
      const { id } = payload;
      const comments = this.state.comments.filter((c) => c.id !== id);
      this.setState({ comments });
    });
    this.socket.on('editComment', (payload) => {
      const { id, comment } = payload;
      const comments = [...this.state.comments];
      const indexEdit = comments.findIndex((c) => c.id === id);
      if (indexEdit !== -1) {
        comments[indexEdit].message = comment;
      }
      this.setState({ comments });
    });
  }

  getAllComments = async () => {
    const response = await fetch(
      `http://localhost:3003/comments/api/details/${this.idNews}`,
      {
        method: 'GET',
      },
    );

    if (response.ok) {
      const comments = await response.json();
      this.setState({ comments });
    }
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  sendMessage = () => {
    this.socket.emit('addComment', {
      idNews: this.idNews,
      message: this.state.message,
    });
  };

  editViewComment = (id, message) => {
    let area = document.querySelector(
      `html.h-100 body.d-flex.flex-column.h-100 main.flex-shrink-0 div.container div.row div#app div div div.form-floating.mb-1 textarea.form-control`,
    );
    let btn = document.querySelector(`button[name="${id}"]`);

    btn.innerText = 'Сохранить';
    btn.onclick = () => {
      axios({
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        data: { message: this.state.message },
        url: `/comments/api/${id}`,
      })
        .then(() => {
          btn.innerText = 'Редактировать';
        })
        .catch((err) => console.log(err));
    };
    area.value = message;
  };

  removeComment = (idComment) => {
    fetch(`http://localhost:3003/comments/api/details/${idComment}`, {
      method: 'DELETE',
    });
  };

  render() {
    const userId = parseInt(getCookie('userId'));
    const role = getCookie('role');
    return (
      <div>
        {this.state.comments.map((comment, index) => {
          return (
            <div key={comment + index} className="card mb-1">
              <div className="card-body">
                <strong>{comment.user.firstName}</strong>
                <div id={comment.id}>{comment.message}</div>
                <div>
                  {comment.user.id === userId || role === 'admin' ? (
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => this.removeComment(comment.id)}
                    >
                      Удалить
                    </button>
                  ) : null}
                  {comment.user.id === userId || role === 'admin' ? (
                    <button
                      name={comment.id}
                      className="btn btn-outline-danger btn-sm"
                      onClick={() =>
                        this.editViewComment(comment.id, comment.message)
                      }
                    >
                      Редактировать
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
        <hr />
        <div>
          <h6 className="lh-1 mt-3">Форма добавления комментариев</h6>
          <div className="form-floating mb-1">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              value={this.state.message}
              name="message"
              onChange={this.onChange}
            ></textarea>
            <label htmlFor="floatingmessagearea2">Комментарий</label>
          </div>
          <button
            onClick={this.sendMessage}
            className="btn btn-outline-info btn-sm px-4 me-sm-3 fw-bold"
          >
            Send
          </button>
        </div>
      </div>
    );
  }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(e(Comments), domContainer);
