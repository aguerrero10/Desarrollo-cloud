const usuario={template:`
<div>

<div class="p-2 w-50 bd-highlight">
    <div class="input-group mb-3">
        <span class="input-group-text">Email</span>
        <input type="text" class="form-control" v-model="UsuarioEmail">
    </div>

    <div class="input-group mb-3">
        <span class="input-group-text">Contraseña</span>
        <input type="password" class="form-control" v-model="UsuarioContrasena">
    </div>

</div>

<button type="button"
class="btn btn-primary m-2 fload-end"
@click="loginClick()">
 Iniciar sesión
</button>

<button type="button"
class="btn btn-secondary m-2 fload-end"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
@click="addClick()">
 Registrarse
</button>


<div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-lg modal-dialog-centered">
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"
        aria-label="Close"></button>
    </div>

    <div class="modal-body">
    
        <div class="input-group mb-3">
            <span class="input-group-text">Nombre</span>
            <input type="text" class="form-control" v-model="NuevoUsuarioNombre">
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Email</span>
            <input type="text" class="form-control" v-model="NuevoUsuarioEmail">
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Contraseña</span>
            <input type="password" class="form-control" v-model="NuevoUsuarioContrasena">
        </div>

        <button type="button" @click="createClick()"
        v-if="UsuarioId==0" class="btn btn-primary">
        Registrarse
        </button>

        <button type="button" @click="updateClick()"
        v-if="UsuarioId!=0" class="btn btn-primary">
        Actualizar usuario
        </button>

    </div>

</div>
</div>
</div>


</div>


`,

data(){
    return{
        eventos:[],
        usuarios:[],
        modalTitle:"",
        UsuarioId:0,
        UsuarioNombre:"",
        UsuarioEmail:"",
        UsuarioContrasena:"",
        usuario:[]
    }
},
methods:{
    refreshData(){
        /*axios.get(variables.API_URL+"usuario")
        .then((response)=>{
            this.usuarios=response.data;
        });

        axios.get(variables.API_URL+"evento")
        .then((response)=>{
            this.eventos=response.data;
        });*/
    },
    loginClick(){
        axios.post(variables.API_URL+"login",{
            email:this.UsuarioEmail,
            contrasena:this.UsuarioContrasena
        })
        .then((response)=>{
            //this.refreshData();
            //alert(response.data);
            sessionStorage.setItem('usuario', response.data.id);
            this.usuario=response.data
            this.$router.push("/evento");
        });
    },
    addClick(){
        this.modalTitle="Nuevo usuario";
        this.NuevoUsuarioId=0;
        this.NuevoUsuarioNombre="";
        this.NuevoUsuarioEmail="",
        this.NuevoUsuarioContrasena=""
    },
    editClick(emp){
        this.modalTitle="Actualizar Usuario";
        this.NuevoUsuarioId=emp.id;
        this.NuevoUsuarioNombre=emp.nombre;
        this.NuevoUsuarioEmail=emp.email,
        this.NuevoUsuarioContrasena=emp.contrasena
    },
    createClick(){
        axios.post(variables.API_URL+"signin",{
            nombre:this.NuevoUsuarioNombre,
            email:this.NuevoUsuarioEmail,
            contrasena:this.NuevoUsuarioContrasena
        })
        .then((response)=>{
            //this.refreshData();
            alert(response.data);
        });
    },
    updateClick(){
        axios.put(variables.API_URL+"signin",{
            nombre:this.NuevoUsuarioNombre,
            contrasena:this.NuevoUsuarioContrasena
        })
        .then((response)=>{
            //this.refreshData();
            alert(response.data);
        });
    },
    deleteClick(id){
        if(!confirm("Está seguro de eliminar el usuario?")){
            return;
        }
        axios.delete(variables.API_URL+"signin/"+id)
        .then((response)=>{
            //this.refreshData();
            alert(response.data);
        });
    }

},
mounted:function(){
    this.refreshData();
}

}