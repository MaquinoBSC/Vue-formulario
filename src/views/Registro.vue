<template>
  <h1 class="my-5">Registro de usuarios</h1>
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
        <input 
            type="password" 
            placeholder="Repeat Password"
            class="form-control my-2"
            v-model.trim="repeatPassword"
        >
        <button 
            type="submit"
            class="btn btn-primary block"
            :disabled="bloquear"
        >
            Registrar
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
            repeatPassword: ''
        }
    },
    methods: {
        ...mapActions(['registrarUser']),
        procesarFormulario(){
            this.registrarUser({email: this.email, password: this.password});
            this.email= "";
            this.password= "";
            this.repeatPassword= "";
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
            if(this.repeatPassword !== this.password){
                return true
            }

            return false
        }
    }
}
</script>

<style>

</style>