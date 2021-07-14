import { createStore } from 'vuex'

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
    set(state, payload){
      state.tareas.push(payload);
      console.log(state.tareas);
    },
    eliminar(state, payload){
      state.tareas= state.tareas.filter((tarea)=> {
        return tarea.id !== payload;
      })
    }
  },
  actions: {
    setTareas({commit}, tarea){
      commit('set', tarea)
    },
    deleteTarea({commit}, id){
      commit('eliminar', id)
    }
  },
  modules: {
  }
})
