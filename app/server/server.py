from flask import Flask, render_template,redirect,request
import requests
from urlparse import parse_qs
from urllib import urlencode

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
app.config['CLIENT_ID'] = 'b8b55a398f9ccbfb603d'
app.config['CLIENT_SECRET'] = 'fa57ad5bbeb1202997f6c5cd5574b2d7f1c4be1a'
app.config['CODE_URL'] = 'https://github.com/login/oauth/authorize/?'
app.config['TOKEN_URL'] = 'https://github.com/login/oauth/access_token/?'
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/hello")
def get_hello():
    return "yoyoyo"

@app.route("/auth/login")
def send_to_git():
    return redirect(app.config['CODE_URL'] +urlencode({"client_id" : app.config['CLIENT_ID'] }))

@app.route("/login/oauth/callback")
def return_from_git():
    code = request.args.get('code')
    postData = {
        'client_id':app.config['CLIENT_ID'],
        'client_secret': app.config['CLIENT_SECRET'],
        'code': code
    }
    x = requests.post(app.config['TOKEN_URL'],data = postData)
    result = parse_qs(x.text)
    return "we done good"


if __name__ == "__main__":
    #app.run(host="0.0.0.0")
    app.run()

