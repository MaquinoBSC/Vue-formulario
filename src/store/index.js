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
    },
    user: null,
    error: { tipo: null, mensaje: null }
  },
  mutations: {
    setError(state, payload){
      if(payload === null){
        return state.error= { tipo: null, mensaje: null }
      }
      if(payload === "EMAIL_NOT_FOUND"){
        return state.error= { tipo: 'email', mensaje: 'Email no registrado' };
      }
      if(payload === "INVALID_PASSWORD"){
        return state.error= { tipo: 'password', mensaje: 'Contraseña invalida'}
      }
      if(payload === "EMAIL_EXISTS"){
        return state.error= { tipo: 'email', mensaje: 'El email ya existe'}
      }
      if(payload === "INVALID_EMAIL"){
        return state.error= { tipo: 'email', mensaje: "El email no es valido"}
      }
    },
    setUser(state, payload){
      state.user= payload;
    },
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
    cerrarSesion({commit}){
      commit('setUser', null);
      router.push('/ingreso');
      localStorage.removeItem('usuario');
    },
    async ingresoUser({commit}, user){
      try {
        const res= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCVIIKqdVWHrC-oMOvSG_W6VEW5jV7yRHY', {
          method: 'POST',
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            returnSecureToken: true
          })
        });

        const userDB= await res.json();

        if(userDB.error){
          console.log(userDB.error);
          return commit('setError', userDB.error.message);
        }

        commit('setUser', userDB);
        commit('setError', null);
        router.push('/');
        localStorage.setItem('usuario', JSON.stringify(userDB));

      } catch (error) {
        console.log(error);
      }
    },
    async registrarUser({commit}, user){
      try {
        const res= await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCVIIKqdVWHrC-oMOvSG_W6VEW5jV7yRHY`, {
          method: 'POST',
          body: JSON.stringify({
            email: user.email,
            password: user.password,
            returnSecureToken: true,
          })
        })
        const userDB= await res.json();

        if(userDB.error){
          console.log(userDB.error);
          return commit('setError', userDB.error.message);
        }

        commit('setUser', userDB);
        commit('setError', null);
        router.push('/');
        localStorage.setItem('usuario', JSON.stringify(userDB));
        
      } catch (error) {
        console.log(error);
      }
    },
    async cargarLocalStorage({commit, state}){
      if(localStorage.getItem('usuario')){
        commit('setUser', JSON.parse(localStorage.getItem('usuario')))
      }
      else{
        return commit('setUser', null)
      }


      try {
        const res= await fetch(`https://vue-formulario-885d5-default-rtdb.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`)
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
    async setTareas({commit, state}, tarea){
      try {
        const res= await fetch(`https://vue-formulario-885d5-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
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
    async deleteTarea({commit, state}, id){
      try {
        await fetch(`https://vue-formulario-885d5-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
          method: 'DELETE',
        })
        commit('eliminar', id)

      } catch (error) {
        console.log(error); 
      }
    },
    setTarea({commit}, id){
      commit('get', id)
    },
    async updateTarea({commit, state}, tarea){
      try {
        const res= await fetch(`https://vue-formulario-885d5-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
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
  getters: {
    usuarioAutenticado(state){
      return !!state.user  //si es null retorna false de lo contrario true
    }
  },
  modules: {
  }
})
