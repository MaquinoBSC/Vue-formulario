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
    async cargarLocalStorage({commit}){
      try {
        const res= await fetch(`https://vue-formulario-885d5-default-rtdb.firebaseio.com/tareas.json`)
        const dataDB= await res.json();
        const arrayTareas= [];
        
        for(let id in dataDB){
          arrayTareas.push(dataDB[id]);
        }
        
        commit('cargar', arrayTareas);
        
      } catch (error) {
        console.log(error);
      }
    },
    async setTareas({commit}, tarea){
      try {
        const res= await fetch(`https://vue-formulario-885d5-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
          method: 'PUT',
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
    async updateTarea({commit}, tarea){
      try {
        const res= await fetch(`https://vue-formulario-885d5-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
          method: 'PATCH',
          body: JSON.stringify(tarea)
        })

        const dataDB= await res.json();
        commit('update', dataDB);

      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {
  }
})
