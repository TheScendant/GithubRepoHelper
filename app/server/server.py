from flask import Flask, render_template, redirect, request, url_for, render_template_string, g, session
from flask_github import GitHub
import requests, json
from urlparse import parse_qs
from urllib import urlencode
from flask_sqlalchemy import SQLAlchemy

DATABASE_URI = 'sqlite:////tmp/github-flask.db'
SECRET_KEY = 'development key'
GITHUB_CLIENT_ID = 'b8b55a398f9ccbfb603d'
GITHUB_CLIENT_SECRET = 'fa57ad5bbeb1202997f6c5cd5574b2d7f1c4be1a'

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
app.config.from_object(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
github = GitHub(app)

db = SQLAlchemy(app)

class User(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(200))
    github_access_token = db.Column(db.String(200))

    def __init__(self, github_access_token):
        self.github_access_token = github_access_token


@app.before_request
def before_request():
    g.user = None
    if 'user_id' in session:
        g.user = User.query.get(session['user_id'])
    else:
        print "no userid in session"


@app.after_request
def after_request(response):
    return response


@app.route('/')
def index():
    return render_template("index.html")
    if g.user:
        t = 'Hello! <a href="{{ url_for("user") }}">Get user</a> ' \
            '<a href="{{ url_for("logout") }}">Logout</a>'
    else:
        t = 'Hello! <a href="{{ url_for("login") }}">Login</a>'

    return render_template_string(t)


@github.access_token_getter
def token_getter():
    user = g.user
    if user is not None:
        return user.github_access_token


@app.route('/login/oauth/callback')
@github.authorized_handler
def authorized(access_token):
    print " called back"
    next_url = request.args.get('next') or url_for('index')
    print "next url",next_url
    if access_token is None:
        return redirect(next_url)

    user = User.query.filter_by(github_access_token=access_token).first()
    if user is None:
        user = User(access_token)
        db.session.add(user)
    user.github_access_token = access_token
    db.session.commit()
    session['user_id'] = user.id
    return redirect(next_url)


@app.route('/login')
def login():
    if session.get('user_id', None) is None:
        return github.authorize()
    else:
        return render_template("success.html")
        redirect(url_for("user"))


@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('index'))


@app.route('/user')
def user():
    user = github.get('user')
    repos = github.get('user/repos')

    return render_template("success.html")
    return "You have "+str(user['public_repos']) + " public repos"


if __name__ == '__main__':
    init_db()
    app.run(debug=True)
# app.config['CLIENT_ID'] = 'b8b55a398f9ccbfb603d'
# app.config['CLIENT_SECRET'] = 'fa57ad5bbeb1202997f6c5cd5574b2d7f1c4be1a'
# app.config['CODE_URL'] = 'https://github.com/login/oauth/authorize/?'
# app.config['TOKEN_URL'] = 'https://github.com/login/oauth/access_token/?'
# @app.route("/")
# def index():
#     return render_template("index.html")

# @app.route("/hello")
# def get_hello():
#     return "yoyoyo"

# @app.route("/auth/login")
# def send_to_git():
#     return redirect(app.config['CODE_URL'] +urlencode({"client_id" : app.config['CLIENT_ID'] }))

# @app.route("/login/oauth/callback")
# def return_from_git():
#     postData = {
#         'client_id':app.config['CLIENT_ID'],
#         'client_secret': app.config['CLIENT_SECRET'],
#         'code': request.args.get('code')
#     }
#     response = requests.post(app.config['TOKEN_URL'],data = postData)
#     result = parse_qs(response.text)
#     access_token = result['access_token']
#     return "we done good"


# if __name__ == "__main__":
#     #app.run(host="0.0.0.0")
#     app.run()

