<template>
  <h1>Formulario con Vue JS</h1>
  <form @submit.prevent="procesarFormulario">
    <Input :tarea="tarea" />
  </form>
  <hr>
  <ListaTareas />
</template>

<script>
const shortid= require('shortid');
import {mapActions} from 'vuex';
import Input from '../components/Input.vue';
import ListaTareas from '../components/ListaTareas.vue';

export default {
  name: 'Home',
  components: {
    Input,
    ListaTareas,
  },
  created(){
    this.cargarLocalStorage();
  },
  data(){
    return{
      tarea: {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0,
      }
    }
  },
  methods: {
    ...mapActions(['setTareas', 'cargarLocalStorage']),
    procesarFormulario(){
      if(this.tarea.nombre.trim() === ""){
        console.log("Campo vacio");
        return
      }

      //Generar ID
      this.tarea.id= shortid.generate()

      //Enviar datos a Vuex
      this.setTareas(this.tarea);

      //Limpiar datos
      this.tarea= {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0,
      }
    }
  },
}
</script>
