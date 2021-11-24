<template>
  <div class="navbar navbar-dark bg-dark px-5">
      <router-link to="/" class="navbar-brand">
        Formularios
      </router-link>
      <div class="d-flex">
<<<<<<< HEAD
          <router-link 
            v-if="usuarioAutenticado"
            class="btn btn-dark" 
            to="/"
          >
            Tareas
          </router-link>
          <router-link 
            v-if="!usuarioAutenticado"
            class="btn btn-dark" 
            to="/ingreso"
          >
            Ingresar
          </router-link>
          <router-link 
            v-if="!usuarioAutenticado"
            class="btn btn-dark" 
            to="/registro"
          >
            Registrar
          </router-link>
          <button 
            v-if="usuarioAutenticado"
            class="btn btn-info mx-2"
            @click="cerrarSesion()"
          >
            Cerrar Sesion
          </button>
=======
          <router-link class="btn btn-dark" to="/">
            Tareas
          </router-link>
>>>>>>> d186936a94fa45355f40c33a21c1f86dc069182d
      </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import { mapActions, mapGetters } from 'vuex'


export default {
  computed: {
    ...mapGetters(['usuarioAutenticado'])
  },
  methods: {
    ...mapActions(['cerrarSesion'])
  }
=======
export default {

>>>>>>> d186936a94fa45355f40c33a21c1f86dc069182d
}
</script>

<style>

</style>