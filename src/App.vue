<template>
  <Navbar />
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import {mapActions} from 'vuex';

export default {
  components: {
    Navbar
  },
  created(){
    this.cargarLocalStorage();
  },
  methods: {
    ...mapActions(['cargarLocalStorage'])
  }
}
</script>

