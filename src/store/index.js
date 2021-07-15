import { createStore } from 'vuex';
import router from '../router';

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: '',
      categorias: [],
      estado: '',
      numero: 0,
    }
  },
  mutations: {
    cargar(state, payload){
      state.tareas= payload;
    },
    set(state, payload){
      state.tareas.push(payload);
      localStorage.setItem('tareas', JSON.stringify(state.tareas));
    },
    eliminar(state, payload){
      state.tareas= state.tareas.filter((tarea)=> {
        return tarea.id !== payload;
      })
      localStorage.setItem('tareas', JSON.stringify(state.tareas));
    },
    get(state, payload){
      if(!state.tareas.find((tarea)=> tarea.id === payload)){//Validacion por si el id no existe
        router.push('/');
        return
      }
      state.tarea= state.tareas.find((tarea)=> {
        return tarea.id === payload;
      });
    },
    update(state, payload){
      state.tareas= state.tareas.map((tarea)=> {
        return tarea.id == payload.id ? payload : tarea;
      });
      localStorage.setItem('tareas', JSON.stringify(state.tareas));
      router.push('/');
    }
  },
  actions: {
    cargarLocalStorage({commit}){
      if(localStorage.getItem('tareas')){
        const tareas= JSON.parse(localStorage.getItem('tareas'))
        commit('cargar', tareas)
        return
      }

      localStorage.setItem('tareas', JSON.stringify([]));
    },
    setTareas({commit}, tarea){
      commit('set', tarea)
    },
    deleteTarea({commit}, id){
      commit('eliminar', id)
    },
    setTarea({commit}, id){
      commit('get', id)
    },
    updateTarea({commit}, tarea){
      commit('update', tarea)
    }
  },
  modules: {
  }
})
