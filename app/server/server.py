from flask import Flask, render_template,redirect

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/hello")
def get_hello():
    return "yoyoyo"

@app.route("/auth/login")
def send_to_git():
    return redirect("https://github.com/login/oauth/authorize?client_id=b8b55a398f9ccbfb603d?redirect_uri=/login/oauth/callback")

@app.route("/login/oauth/callback")
def return_from_git():
    return "Holy shit i got something back"


if __name__ == "__main__":
    #app.run(host="0.0.0.0")
    app.run()

