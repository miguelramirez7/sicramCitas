<template>
  <div>
    <v-card class="pa-2" tile>
      <v-row>
        <v-col sm="12" md="12" class="pb-0">
          <v-sheet height="64">
            <v-toolbar flat>
              <v-toolbar-title style="color:teal">
                Citas pendientes de : 
                <v-menu bottom right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      outlined
                      color="teal darken-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <span>{{ dependienteSeleccionado.name }} {{ dependienteSeleccionado.lastname }}</span>
                      <v-icon right>
                        mdi-menu-down
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      @click="seleccionar({ tipoPaciente: 'titular' , datos : getPacientePerfil})"
                    >
                      <v-list-item-title
                        >{{ listaDependientes.usuario.name }}
                        {{ listaDependientes.usuario.lastname }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      v-for="(element, index) in listaDependientes.dependientes"
                      :key="index"
                      @click="seleccionar({ tipoPaciente: 'dependiente' , datos : element})"
                    >
                      <v-list-item-title
                        >{{ element.name }}
                        {{ element.lastname }}</v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    color="teal darken-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right>
                      mdi-menu-down
                    </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="vistaCalendar">
                    <v-list-item-title>Calendario</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="vistaLista">
                    <v-list-item-title>Lista</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
        </v-col>
        <v-col sm="12" md="12" class="pt-0">
          <component :is="vista" v-bind="propiedades" ref="childComponent"></component>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CitasPendientesPacCalendar from "./CitasPendientesPacCalendar.vue";
import CitasPendientesPacLista from "./CitasPendientesPacLista.vue";
export default {
  name: "CitasPendientesPac",
  components: {
    CitasPendientesPacCalendar,
    CitasPendientesPacLista,
  },
  data() {
    return {
      type: "calendario",
      typeToLabel: {
        lista: "Lista",
        calendario: "Calendario",
      },
      vista: "CitasPendientesPacCalendar",
      listaDependientes: {
        usuario: {
          name: "",
          lastname: "",
        },
        dependientes: [],
      },
      dependienteSeleccionado : {},
      tipoPacienteSeleccionado: "titular"
    };
  },
  methods: {
    ...mapActions(["listarDependientes"]),
    vistaLista() {
      this.type = "lista";
      this.vista = "CitasPendientesPacLista";
    },

    vistaCalendar() {
      this.type = "calendario";
      this.vista = "CitasPendientesPacCalendar";
    },

    seleccionar(e) {     
      this.dependienteSeleccionado = e.datos
      this.tipoPacienteSeleccionado = e.tipoPaciente
      console.log("LA VARIABLE A PASAR",this.propiedades);
      this.$refs.childComponent.updateRange;
    },
  },
  computed: {
    ...mapGetters(["getUsuario", "getPacientePerfil", "getListaDependientes"]),
    propiedades() {
      console.log(this.tipoPacienteSeleccionado)
        return {
          paciente: {
            tipoPaciente: this.tipoPacienteSeleccionado,
            datos: this.dependienteSeleccionado,
          },
        };
      
    },
  },
  created() {
    this.dependienteSeleccionado = this.getPacientePerfil;
    this.listaDependientes.usuario = this.getPacientePerfil;
    this.listarDependientes(this.getUsuario).then((res) => {
    this.listaDependientes.dependientes = this.getListaDependientes;
    });
  },

  inject: {
    theme: {
      default: { isDark: false },
    },
  },
};
</script>

<style></style>
