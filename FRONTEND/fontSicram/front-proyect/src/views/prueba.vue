<template>
  <div>
    <input type="file" id="file" @change="readFile" />
    <button @click="buclDni">DNI EN BUCLE</button>
    <button @click="ponerCSV">ELCSV</button>
    <div v-if="!actualizar">
      <span v-for="(element, index) in materiales" :key="index"
        >{{ element.nombre }} {{ element.precio }}<br
      /></span>
      <br />
    </div>
    <div v-if="actualizar">
      <div v-for="(element, index) in materiales" :key="index">
        <input type="text" v-model="element.nombre" />
        <input type="text" v-model="element.precio" />
      </div>
    </div>
    <button @click="actualizar = false">guardar</button>
    <button @click="actualizar = true">actualizar</button>
  </div>
</template>

<script>
export default {
  name: "prueba",
  data() {
    return {
      actualizar: false,
      archivo: null,
      datosAlumnos: [],
      number: 0,
      materiales: [
        { nombre: "asd ", precio: 23 },
        { nombre: " fqw", precio: 10 },
        { nombre: "qwe", precio: 20 },
      ],
    };
  },
  methods: {
    parseCSV(text) {
      // Obtenemos las lineas del texto
      let lines = text.replace(/\r/g, "").split("\n");
      return lines.map((line) => {
        // Por cada linea obtenemos los valores
        let values = line.split(",");
        return values;
      });
    },

    reverseMatrix(matrix) {
      let output = [];
      // Por cada fila
      matrix.forEach((values, row) => {
        // Vemos los valores y su posicion
        values.forEach((value, col) => {
          // Si la posición aún no fue creada
          if (output[col] === undefined) output[col] = [];
          output[col][row] = value;
        });
      });
      return output;
    },

    readFile(evt) {
      let file = evt.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        // Cuando el archivo se terminó de cargar
        let lines = this.parseCSV(e.target.result);
        let output = this.reverseMatrix(lines);
        this.archivo = output;
        console.log(output);
      };
      // Leemos el contenido del archivo seleccionado
      reader.readAsBinaryString(file);
    },

    searchDni(dni) {
      return this.axios
        .get(
          "https://dniruc.apisperu.com/api/v1/dni/" +
            dni +
            "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imx1aXNtYWw1QGhvdG1haWwuY29tIn0.0bDxU-jhZh8K4rHnmliT9QQZJFuYjmVTZJFBlt0jfqc"
        )
        .then((res) => {
          console.log(res.data);
          this.datosAlumnos.push({
            dni: res.data.dni,
            nombres: res.data.nombres,
            apellidos:
              res.data.apellidoPaterno + " " + res.data.apellidoMaterno,
            codVerifica: res.data.codVerifica,
          });
          return Promise.resolve(true);
        })
        .catch((e) => {
          console.log(e);
          this.datosAlumnos.push({
            dni: dni,
            nombres: " ",
            apellidos: " ",
            codVerifica: " ",
          });
          return Promise.resolve(true);
        });
    },

    buclDni() {
      console.log(this.number + " : as " + this.archivo[0][this.number]);
      this.searchDni(this.archivo[0][this.number]).then((res) => {
        if (res == true) {
          if (this.number < 139) {
            this.number = this.number + 1;
            this.buclDni();
          }
        }
      });
    },

    ponerCSV() {
      console.log(JSON.stringify(this.datosAlumnos));
    },
  },
};
</script>

<style scope>
button {
  background: blue;
  color: red;
  height: 50px;
  width: 100px;
}
</style>
