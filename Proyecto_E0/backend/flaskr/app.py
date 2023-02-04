from flaskr import create_app
from flask_restful import Api
from .modelos import db
from .vistas import VistaSignIn, VistaLogIn, VistaEvento, VistaEventosUsuario
from .vistas import VistaUsuarios, VistaEventos
from flask_cors import CORS

app = create_app('default')
app_context = app.app_context()
app_context.push()

db.init_app(app)
db.create_all()

cors = CORS(app)

api = Api(app)
api.add_resource(VistaUsuarios, '/usuarios') ###
api.add_resource(VistaEventos, '/eventos') ###
#api.add_resource(VistaSignIn, '/signin/<int:id_usuario>') ###
api.add_resource(VistaSignIn, '/signin')
api.add_resource(VistaLogIn, '/login')
api.add_resource(VistaEventosUsuario, '/usuario/<int:id_usuario>/eventos')
api.add_resource(VistaEvento, '/evento/<int:id_evento>')