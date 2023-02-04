const evento={template:`
<div>

<button type="button"
class="btn btn-primary m-2 fload-end"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
@click="addClick()">
 Nuevo Evento
</button>

<table class="table table-striped">
<thead>
    <tr>
        <th>
            Id
        </th>
        <th>
            Evento
        </th>
        <th>
            Categoria
        </th>
        <th>
            Lugar
        </th>
        <th>
            Direccion
        </th>
        <th>
            Fecha inicio
        </th>
        <th>
            Fecha fin
        </th>
        <th>
            Tipo
        </th>
        <th>
            Opciones
        </th>
    </tr>
</thead>
<tbody>
    <tr v-for="dep in eventos">
        <td>{{dep.id}}</td>
        <td>{{dep.nombre}}</td>
        <td>{{dep.categoria.llave}}</td>
        <td>{{dep.lugar}}</td>
        <td>{{dep.direccion}}</td>
        <td>{{dep.fecha_inicio}}</td>
        <td>{{dep.fecha_fin}}</td>
        <td>{{dep.tipo}}</td>
        <td>
            <button type="button"
            class="btn btn-light mr-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="editClick(dep)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </button>
            <button type="button" @click="deleteClick(dep.id)"
            class="btn btn-light mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

        </td>
    </tr>
</tbody>
</thead>
</table>


<div>
<button type="button"
class="btn btn-secondary m-2 fload-end"
@click="signupClick()">
 Cerrar sesión
</button>
</div>

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
            <span class="input-group-text">Evento</span>
            <input type="text" class="form-control" v-model="EventoName">
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Categoria</span>
            <select class="form-select" v-model="EventoCategoria">
                <option value="CONFERENCIA">Conferencia</option>
                <option value="SEMINARIO">Seminario</option>
                <option value="CONGRESO">Congreso</option>
                <option value="CURSO">Curso</option>
            </select>
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Lugar</span>
            <input type="text" class="form-control" v-model="EventoLugar">
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Direccion</span>
            <input type="text" class="form-control" v-model="EventoDireccion">
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Fecha inicio</span>
            <input type="date" class="form-control" v-model="EventoInicio">
        </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Fecha fin</span>
            <input type="date" class="form-control" v-model="EventoFin">
        </div> 
        
        <div class="input-group mb-3">
            <span class="input-group-text">Tipo</span>
            <select class="form-select" v-model="EventoTipo">
                <option value="Presencial">Presencial</option>
                <option value="Virtual">Virtual</option>
            </select>

        </div>

        <button type="button" @click="createClick()"
        v-if="EventoId==0" class="btn btn-primary">
        Crear evento
        </button>
        <button type="button" @click="updateClick()"
        v-if="EventoId!=0" class="btn btn-primary">
        Actualizar evento
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
        modalTitle:"",
        EventoName:"",
        EventoId:0,
        EventoCategoria:"",
        EventoLugar:"",
        EventoDireccion:"",
        EventoInicio:"",
        EventoFin:"",
        EventoTipo:"",
        usuario:0,

        EventoNameFilter:"",
        EventoIdFilter:"",
        eventosWithoutFilter:[]
    }
},
methods:{
    refreshData(){
        axios.get(variables.API_URL+"usuario/"+sessionStorage.getItem('usuario')+"/eventos")
        .then((response)=>{
            this.eventos=response.data;
            this.eventosWithoutFilter=response.data;
        });
    },
    addClick(){
        this.modalTitle="Nuevo Evento";
        this.EventoId=0;
        this.EventoName="";
        this.EventoCategoria="";
        this.EventoLugar="";
        this.EventoDireccion="";
        this.EventoInicio="";
        this.EventoFin="";
        this.EventoTipo="";
    },
    editClick(dep){
        this.modalTitle="Modificar Evento";
        this.EventoId=dep.id;
        this.EventoName=dep.nombre;
        this.EventoCategoria=dep.categoria.llave;
        this.EventoLugar=dep.lugar;
        this.EventoDireccion=dep.direccion;
        this.EventoInicio=dep.fecha_inicio;
        this.EventoFin=dep.fecha_fin;
        this.EventoTipo=dep.tipo;
    },
    createClick(){
        axios.post(variables.API_URL+"usuario/"+sessionStorage.getItem('usuario')+"/eventos",{
            nombre:this.EventoName,
            categoria:this.EventoCategoria,
            lugar:this.EventoLugar,
            direccion:this.EventoDireccion,
            fecha_inicio:this.EventoInicio,
            fecha_fin:this.EventoFin,
            tipo:this.EventoTipo
        })
        .then((response)=>{
            this.refreshData();
            //alert(response.data);
            alert("Evento creado.");
        });
    },
    updateClick(){
        axios.put(variables.API_URL+"evento/"+this.EventoId,{
            nombre:this.EventoName,
            categoria:this.EventoCategoria,
            lugar:this.EventoLugar,
            direccion:this.EventoDireccion,
            fecha_inicio:this.EventoInicio,
            fecha_fin:this.EventoFin,
            tipo:this.EventoTipo
        })
        .then((response)=>{
            this.refreshData();
            //alert(response.data);
            alert("Evento modificado.");
        });
    },
    deleteClick(id){
        if(!confirm("Está seguro de eliminar el evento?")){
            return;
        }
        axios.delete(variables.API_URL+"evento/"+id)
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });
    },
    signupClick(){
        sessionStorage.setItem('usuario', 0);
        this.$router.push("/usuario");
    },
    sortResult(prop, asc){
        this.eventos=this.eventosWithoutFilter.sort(function(a, b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        })
    }

},
mounted:function(){
    this.refreshData();
}

}