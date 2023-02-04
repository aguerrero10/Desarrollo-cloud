from flask import request
from ..modelos import db, Usuario, UsuarioSchema, Evento, EventoSchema
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

usuario_schema = UsuarioSchema()
evento_schema = EventoSchema()

#----- Usuario -----
class VistaUsuarios(Resource):
    def get(self):
        return [usuario_schema.dump(usuario) for usuario in Usuario.query.all()]

#----- Evento -----
class VistaEventos(Resource):
    def get(self):
        return [evento_schema.dump(evento) for evento in Evento.query.all()]


class VistaLogIn(Resource):
    def post(self):
        u_email = request.json["email"]
        u_contrasena = request.json["contrasena"]
        usuario = Usuario.query.filter_by(email=u_email, contrasena = u_contrasena).first()
        if usuario:
            #return 'Inicio de sesión exitoso', 200
            return usuario_schema.dump(usuario)
        else:
            return 'Correo o contraseña incorrectos', 401


class VistaSignIn(Resource):    
    def post(self):
        nuevo_usuario = Usuario(nombre=request.json["nombre"], email=request.json["email"], contrasena=request.json["contrasena"])
        db.session.add(nuevo_usuario)
        db.session.commit()
        return 'Usuario creado exitosamente', 201

    def put(self, id_usuario):
        usuario = Usuario.query.get_or_404(id_usuario)
        usuario.contrasena = request.json.get("contrasena",usuario.contrasena)
        db.session.commit()
        return usuario_schema.dump(usuario)

    def delete(self, id_usuario):
        usuario = Usuario.query.get_or_404(id_usuario)
        db.session.delete(usuario)
        db.session.commit()
        return '',204


class VistaEventosUsuario(Resource):
    def post(self, id_usuario):
        nuevo_evento = Evento(nombre=request.json["nombre"], categoria=request.json["categoria"], lugar=request.json["lugar"], direccion=request.json["direccion"],
                            fecha_inicio=request.json["fecha_inicio"], fecha_fin=request.json["fecha_fin"], tipo=request.json["tipo"])
        usuario = Usuario.query.get_or_404(id_usuario)
        usuario.eventos.append(nuevo_evento)

        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            return 'El usuario ya tiene un evento con dicho nombre', 409

        return evento_schema.dump(nuevo_evento)

    def get(self, id_usuario):
        usuario = Usuario.query.get_or_404(id_usuario)
        return [evento_schema.dump(ev) for ev in usuario.eventos]


class VistaEvento(Resource):
    def get(self, id_evento):
        return evento_schema.dump(Evento.query.get_or_404(id_evento))

    def put(self, id_evento):
        evento = Evento.query.get_or_404(id_evento)
        evento.nombre = request.json.get("nombre", evento.nombre)
        evento.categoria = request.json.get("categoria", evento.categoria)
        evento.lugar = request.json.get("lugar", evento.lugar)
        evento.direccion = request.json.get("direccion", evento.direccion)
        evento.fecha_inicio = request.json.get("fecha_inicio", evento.fecha_inicio)
        evento.fecha_fin = request.json.get("fecha_fin", evento.fecha_fin)
        evento.tipo = request.json.get("tipo", evento.tipo)
        db.session.commit()
        return evento_schema.dump(evento)

    def delete(self, id_evento):
        evento = Evento.query.get_or_404(id_evento)
        db.session.delete(evento)
        db.session.commit()
        return '', 204