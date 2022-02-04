<template>
    <input 
        type="text"
        class="form-control my-2"
        placeholder="Ingrese nombre"
        v-model.trim="tarea.nombre"
    >
    <div class="form-check form-check-inline">
        <input 
        type="checkbox"
        id="check-1"
        class="form-check-input"
        v-model="tarea.categorias"
        value="javascript"
        >
        <label for="check-1" class="form-check-label">Javascript</label>
    </div>
    <div class="form-check form-check-inline">
        <input 
        type="checkbox"
        id="check-2"
        class="form-check-input"
        v-model="tarea.categorias"
        value="nodejs"
        >
        <label for="check-2" class="form-check-label">Node JS</label>
    </div>
    <div class="mt-2">
        <div class="form-check form-check-inline">
            <input 
                type="radio" 
                id="radio-1"
                class="form-check-input"
                value="urgente"
                v-model="tarea.estado"
            >
            <label for="radio-1" class="form-check-label">Urgente</label>
            </div>
            <div class="form-check form-check-inline">
            <input 
                type="radio" 
                id="radio-2"
                class="form-check-input"
                value="relax"
                v-model="tarea.estado"
            >
            <label for="radio-2" class="form-check-label">Relax</label>
        </div>
    </div>
    <div class="mt-2">
        <input 
        type="number" 
        v-model.number="tarea.numero"
        class="form-control"
        >
    </div>
    <button 
        class="btn btn-dark mt-2 btn-block" 
        type="submit"
        :disabled="setDisabled"
    >
        Procesar
    </button>

    <hr>
    <input class="form-control" type="file" id="file" accept=".csv">
    <button type="button" id="button-getData">Obtener Datos</button>
</template>

<script>
export default {
    name: "Input",
    props: {
        tarea: {
            type: Object
        }
    },
    mounted(){
        document.getElementById('file').addEventListener('change', (event)=> {
            const [file]= event.target.files;
            let fileReader= new FileReader();
            fileReader.readAsBinaryString(file);
            fileReader.onload= (e)=> {
                const headers = e.target.result.slice(0, e.target.result.indexOf("\n")).split(".");
                const rows = e.target.result.slice(e.target.result.indexOf("\n") + 1).split("\n");
                const data= rows.map((row)=> row.replace("\r", ""));
                console.log(headers);
                console.log(rows);
                console.log(data);
            }
        });
        document.getElementById('button-getData').addEventListener('click', ()=> {
            console.log("Gere");
        })
    },
    data(){
        return{
        }
    },
    computed: {
        setDisabled(){
        return this.tarea.nombre.trim() === "" ? true : false; 
        }
  }
}
</script>
