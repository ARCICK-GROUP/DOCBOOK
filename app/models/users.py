from flask import Blueprint
from flask_security import Security, SQLAlchemySessionUserDatastore, auth_required, hash_password
from flask_security.models import fsqla_v3 as fsqla
from .. import db


fsqla.FsModels.set_db_info(db)

class Role(db.Model, fsqla.FsRoleMixin):
    pass

class User(db.Model, fsqla.FsUserMixin):
    pass

user_datastorage = SQLAlchemySessionUserDatastore(db, User, Role)
