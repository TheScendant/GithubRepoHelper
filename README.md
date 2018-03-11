# GithubRepoHelper

Provides the main details of your github repos after authenticating with GitHub OAuth.

### Front-end setup
#### Install and build with npm
```
  cd app/static
  npm install
  npm run build
```

### Back-end setup
#### Install python requirements
```
python app/server/requirements.txt
```

#### Set-up DB
From the Flask_Alchemy Docs:

To create the initial database, just import the db object from an interactive Python shell and run the SQLAlchemy.create_all()
method to create the tables and database:
```
>>> from sever import db
>>> db.create_all()
```
#### Run server
  ```
  python server.py
  ```
