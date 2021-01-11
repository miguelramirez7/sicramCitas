<template>
  <div>
    <Loader :dialog="showLoader" />
    <input type="file" id="file" @change="readFile" />
    <button @click="buclDni">DNI EN BUCLE</button>
    <button @click="ponerCSV">ELCSV</button>
    
  </div>
</template>

<script>
import Loader from "@/modals/Loader.vue"; 
export default {
  name: "prueba",
  components: {
    Loader,
  },
  data() {
    return {
      showLoader : false,
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
      this.showLoader = true
      console.log(this.number + " : as " + this.archivo[0][this.number]);
      this.searchDni(this.archivo[0][this.number]).then((res) => {
        if (res == true) {
          if (this.number < this.archivo[0].length) {
            this.number = this.number + 1;
            this.buclDni();
          }
          if(this.number == this.archivo[0].length ) this.showLoader = false
        }
      });
      
    },

    ponerCSV() {
      this.ConvertJSONToCsv(JSON.stringify(this.datosAlumnos),"data")
    },

    ConvertJSONToCsv(JSONData, fileName, ShowLabel) {
      if (fileName == null || fileName == "") {
        fileName = "My export";
      }

      if (ShowLabel == null || ShowLabel == "") {
        ShowLabel = true;
      }

      var arrData =
        typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;
      var CSV = "";
      if (ShowLabel) {
        var row = "";
        for (var index in arrData[0]) {
          row += index + ",";
        }
        row = row.slice(0, -1);
        CSV += row + "\r\n";
      }
      for (var i = 0; i < arrData.length; i++) {
        var row = "";
        for (var index in arrData[i]) {
          //var arrValue = arrData[i][index] == null ? "" : '="' + arrData[i][index] + '"';
          var arrValue =
            arrData[i][index] == null ? "" : '"' + arrData[i][index] + '"';
          row += arrValue + ",";
        }
        row.slice(0, row.length - 1);
        CSV += row + "\r\n";
      }
      if (CSV == "") {
        growl.error("Invalid data");
        return;
      }

      // Edge or IE
      if (
        (navigator.appVersion.indexOf("Win") != -1 &&
          (navigator.userAgent.match(/msie/i) ||
            navigator.userAgent.match(/trident/i))) ||
        window.navigator.userAgent.indexOf("Edge") > -1
      ) {
        var blob = new Blob([CSV]);
        if (window.navigator.msSaveOrOpenBlob)
          window.navigator.msSaveBlob(blob, fileName + ".csv");
      } else {
        //Mozilla Firefox or Chrome
        var uri = "data:application/csv;charset=utf-8," + escape(CSV);
        var Link = document.createElement("a");
        Link.href = uri;
        Link.style = "visibility:hidden";
        Link.download = fileName + ".csv";
        document.body.appendChild(Link);
        Link.click();
        document.body.removeChild(Link);
      }
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
