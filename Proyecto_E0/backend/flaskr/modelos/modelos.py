from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow import fields
import enum

db = SQLAlchemy()

class Categoria(enum.Enum):
   CONFERENCIA = 1
   SEMINARIO = 2
   CONGRESO = 3
   CURSO = 4

class Evento(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    nombre = db.Column(db.String(128))
    categoria = db.Column(db.Enum(Categoria))
    lugar = db.Column(db.String(50))
    direccion = db.Column(db.String(50))
    fecha_inicio = db.Column(db.String(50))
    fecha_fin = db.Column(db.String(50)) 
    tipo = db.Column(db.String(50)) 
    usuario = db.Column(db.Integer, db.ForeignKey("usuario.id"))

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))
    email = db.Column(db.String(128))
    contrasena = db.Column(db.String(50))
    eventos = db.relationship('Evento', cascade='all, delete, delete-orphan')


class EnumEDiccionario(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        if value is None:
            return None
        return {"llave": value.name, "valor": value.value}

class EventoSchema(SQLAlchemyAutoSchema):
    categoria = EnumEDiccionario(attribute=("categoria"))
    class Meta:
        model = Evento
        include_relationships = True
        load_instance = True

class UsuarioSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Usuario
        include_relationships = True
        load_instance = True