<template>
    <h1 class="my-5">Ingreso de usuarios</h1>
    <div class="alert alert-danger" v-if="error.tipo !== null">
        {{ error.mensaje }}
    </div>

    <form @submit.prevent="procesarFormulario()">
        <input 
            type="email" 
            placeholder="Email"
            class="form-control my-2"
            v-model.trim="email"
            :class="[error.tipo === 'email' ? 'is-invalid' : '' ]"
        >
        <input 
            type="password" 
            placeholder="Password"
            class="form-control my-2"
            v-model.trim="password"
            :class="[error.tipo === 'password' ? 'is-invalid' : '' ]"
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
import { mapActions, mapState } from 'vuex';

export default {
    data(){
        return{
            email: '',
            password: '',
        }
    },
    methods: {
        ...mapActions(['ingresoUser']),
        async procesarFormulario(){
            await this.ingresoUser({email: this.email, password: this.password});
            if(this.error.tipo !== null){
                return
            }
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
        },
        ...mapState(['error'])
    }
}
</script>