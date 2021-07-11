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
import Input from '../components/Input.vue';

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
    procesarFormulario(){
      if(this.tarea.nombre.trim() === ""){
        console.log("Campo vacio");
        return
      }

      console.log(this.tarea);
      
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
