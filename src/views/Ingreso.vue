<template>
  <h1 class="my-5">Ingreso de usuarios</h1>
  <form @submit.prevent="procesarFormulario()">
        <input 
            type="email" 
            placeholder="Email"
            class="form-control my-2"
            v-model.trim="email"
        >
        <input 
            type="password" 
            placeholder="Password"
            class="form-control my-2"
            v-model.trim="password"
        >
        <button 
            type="submit"
            class="btn btn-primary block"
            :disabled="bloquear"
        >
            Ingresar
        </button>
  </form>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    data(){
        return{
            email: '',
            password: '',
        }
    },
    methods: {
        ...mapActions(['ingresoUser']),
        procesarFormulario(){
            this.ingresoUser({email: this.email, password: this.password});
            this.email= "";
            this.password= "";
        }
    },
    computed: {
        bloquear(){
            if(!this.email.includes('@')){
                return true
            }
            if(this.password.length < 6){
                return true
            }
            return false
        }
    }
}
</script>