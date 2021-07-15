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
    },
    eliminar(state, payload){
      state.tareas= state.tareas.filter((tarea)=> {
        return tarea.id !== payload;
      })
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
      router.push('/');
    }
  },
  actions: {
    cargarLocalStorage({commit}){
      
    },
    async setTareas({commit}, tarea){
      try {
        const res= await fetch(`https://vue-formulario-885d5-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tarea)
        })

        const dataDB= await res.json()
        console.log(dataDB);

      } catch (error) {
        console.log(error);
      }

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
