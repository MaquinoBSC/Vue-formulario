<template>
  <h1>Formulario con Vue JS</h1>
  <form @submit.prevent="procesarFormulario">
    <Input :tarea="tarea" />
  </form>
  <hr>
  <p>
    {{tarea}}
  </p>
</template>

<script>
const shortid= require('shortid');
import Input from '../components/Input.vue';
import {mapActions} from 'vuex';

export default {
  name: 'Home',
  components: {
    Input
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
    ...mapActions(['setTareas']),
    procesarFormulario(){
      if(this.tarea.nombre.trim() === ""){
        console.log("Campo vacio");
        return
      }

      //Generar ID
      this.tarea.id= shortid.generate()

      //Enviar datos a Vuex
      this.setTareas(this.tarea);

      
      this.tarea= {
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0,
      }
    }
  },
}
</script>
