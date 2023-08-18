from os import environ
from dotenv import load_dotenv


load_dotenv()

SECRET_KEY = environ.get('SECRET_KEY')
SECURITY_PASSWORD_SALT = environ.get('SECURITY_PASSWORD_SALT', 276620620449364760643331585814251026763)
SQLALCHEMY_DATABASE_URI = environ.get('')
SQLALCHEMY_ENGINE_OPTIONS = {
    "pool_pre_ping" : True,
}
SQLALCHEMY_TRACK_MODIFICATION = False