<template>
{{tareas}}
    <table class="table table-striped table-dark">
        <thead>
            <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Categorias</th>
            <th scope="col">Estado</th>
            <th scope="col">Numero</th>
            <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="tarea in tareas" :key="tarea.id">
                <th scope="row">{{tarea.id}}</th>
                <td>{{tarea.nombre}}</td>
                <td>
                    <span>{{tarea.categorias.join(', ')}}</span>
                   <!-- <span v-for="(categoria, index) in tarea.categorias" :key="index">
                       {{tarea.categorias.length === index + 1 ? categoria : categoria + ', '}}
                   </span> -->
                </td>
                <td>{{tarea.estado}}</td>
                <td>{{tarea.numero}}</td>
                <td>
                    <button class="btn btn-warning mx-2">Editar</button>
                    <button class="btn btn-danger mx-2">Eliminar</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import {mapState} from 'vuex';
export default {
    computed: {
        ...mapState(['tareas'])
    }
}
</script>
