<template>
  <form @submit.prevent="procesarFormulario">
    <input 
      type="text"
      class="form-control my-2"
      placeholder="Ingrese nombre"
      v-model.trim="tarea.nombre"
    >
    <div class="form-check form-check-inline">
      <input 
        type="checkbox"
        id="check-1"
        class="form-check-input"
        v-model="tarea.categorias"
        value="javascript"
      >
      <label for="check-1" class="form-check-label">Javascript</label>
    </div>
    <div class="form-check form-check-inline">
      <input 
        type="checkbox"
        id="check-2"
        class="form-check-input"
        v-model="tarea.categorias"
        value="nodejs"
      >
      <label for="check-2" class="form-check-label">Nose JS</label>
    </div>
    <div class="mt-2">
      <div class="form-check form-check-inline">
        <input 
          type="radio" 
          id="radio-1"
          class="form-check-input"
          value="urgente"
          v-model="tarea.estado"
        >
        <label for="radio-1" class="form-check-label">Urgente</label>
      </div>
      <div class="form-check form-check-inline">
        <input 
          type="radio" 
          id="radio-2"
          class="form-check-input"
          value="relax"
          v-model="tarea.estado"
        >
        <label for="radio-2" class="form-check-label">Relax</label>
      </div>
    </div>
    <div class="mt-2">
      <input 
        type="number" 
        v-model.number="tarea.numero"
        class="form-control"
      >
    </div>
    <button 
      class="btn btn-dark mt-2 btn-block" 
      type="submit"
      :disabled="setDisabled"
    >
      Procesar
    </button>
  </form>
  <hr>
  <p>
    {{tarea}}
  </p>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return{
      tarea: {
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
  computed: {
    setDisabled(){
      return this.tarea.nombre.trim() === "" ? true : false; 
    }
  }
}
</script>
