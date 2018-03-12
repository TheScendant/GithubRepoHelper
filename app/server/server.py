from flask import Flask, render_template, redirect, request, url_for, render_template_string, g, session
from flask_github import GitHub
import json
from flask_sqlalchemy import SQLAlchemy
import config

DATABASE_URI = 'sqlite:////tmp/github-flask.db'
SECRET_KEY = 'development key'
GITHUB_CLIENT_ID = 'b8b55a398f9ccbfb603d'
GITHUB_CLIENT_SECRET = config.CLIENT_SECRET

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


@app.after_request
def after_request(response):
    return response

"""
Renders index page.
"""
@app.route('/')
def index():
    return render_template("index.html")

"""
Returns json if data if logged in.
Otherwise returns 'false'
"""
@app.route('/status')
def status():
    if g.user:
        result = {}
        result["repos"] = repos()
        result["user"] = user()
        result["logged_in"] = "true"
        if result["user"] == None or result["repos"] == None:
            #token expired
            session.pop('user_id', None)
            return "false"
        return json.dumps(result)
    else:
        return "false"

@github.access_token_getter
def token_getter():
    user = g.user
    if user is not None:
        return user.github_access_token

"""
Callback for github OAuth.
Renders success template or redirects to index
"""
@app.route('/login/oauth/callback')
@github.authorized_handler
def authorized(access_token):
    next_url = request.args.get('next') or url_for('index')
    if access_token is None:
        return redirect(next_url)
    user = User.query.filter_by(github_access_token=access_token).first()
    if user is None:
        user = User(access_token)
        db.session.add(user)
    user.github_access_token = access_token
    db.session.commit()
    session['user_id'] = user.id
    return render_template("success.html")

"""
Handles user login.
If OAuth alreaday authorized, sends to main page
"""
@app.route('/login')
def login():
    if session.get('user_id', None) is None:
        return github.authorize()
    else:
        return render_template("success.html")

"""
Handles logging a user out.
@return 'loggedout' to tell front end the user session ended
"""
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return "loggedout"

"""
Gets the user data.
@return user JSON as a string
"""
@app.route('/user')
def user():
    try:
        user = github.get('user')
        return json.dumps(user)
    except:
        return None

"""
Gets the repos for the user. Makes additional requests for the languages,
contributors, tags and topics.
@return repo JSON as a string
"""
@app.route('/repos')
def repos():
    try:
        repos = github.get('user/repos')
        for repo in repos:
            repo["languages"] = github.get(repo["languages_url"])
            repo["contributors"] = github.get(repo["contributors_url"])
            repo["tags"] = github.get(repo["tags_url"])
            #topics is in beta so need custom 'Accept' header
            headers = {"Accept": "application/vnd.github.mercy-preview+json"}
            repo["topics"] = github.get("/repos/"+repo["owner"]["login"]+"/"+repo["name"]+"/topics",headers=headers)
        return json.dumps(repos)
    except:
        return None


def init_db():
    db.create_all()

if __name__ == '__main__':
    app.run(host="0.0.0.0")
