<template>
    <p>{{route.params.id}}</p>
    <form @submit.prevent="updateTarea(tarea)">
        <Input :tarea="tarea" />
    </form>
</template>

<script>
import {useRoute} from 'vue-router';
import {mapState, mapActions} from 'vuex';
import Input from '../components/Input';

export default {
    name: "Edita",
    components: {
        Input
    },
    created(){
        this.setTarea(this.route.params.id);
    },
    data(){
        return{
            route: useRoute(),
        }
    },
    methods:{
        ...mapActions(['setTarea', 'updateTarea'])
    },
    computed: {
        ...mapState(['tarea'])
    }
}
</script>

<style>

</style>