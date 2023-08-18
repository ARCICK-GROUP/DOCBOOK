from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_mapping(
        REMEMBER_COOKIE_SAMESITE = "strict",
        SESSION_COOKIE_SAMESITE = "strict"
    )
    
    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    db.init_app(app)

    @app.get('/')
    def home_page():
        return jsonify({"message":"Welcome to DOCBOOK!"})

    return app