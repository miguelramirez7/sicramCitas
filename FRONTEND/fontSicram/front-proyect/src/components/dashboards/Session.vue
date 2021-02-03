<template>
  <div>
    <div id="subscribers" v-for="stream in streams" :key="stream.streamId">
      <subscriber
        @error="errorHandler"
        :stream="stream"
        :session="session"
      ></subscriber>
    </div>
    <div class="flex-container">
      <publisher :session="session" @error="errorHandler"></publisher>
    </div>
    <div
      class="flex-container-menu"
      :style="vista === 'paciente' ? 'display:none' : ''"
    >
      <v-menu content-class="elevation-0" transition="slide-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            elevation="10"
            color="white"
            dark
            height="67px"
            width="67px"
            v-bind="attrs"
            v-on="on"
            style="border-radius:50px;"
          >
            <v-icon color="teal" large>
              mdi-menu
            </v-icon>
          </v-btn>
        </template>
        <v-list class="ma-0" style="border-radius:30px;">
          <v-list-item
            class="pa-2"
            v-for="(element, index) in items"
            :key="index"
           @click="$emit('click',element.mod)"
          >
            <v-list-item-title>
              <v-menu openOnHover offset-x left content-class="elevation-0">
                <template v-slot:activator="{ on, attrs }" class="pa-0">
                  <v-btn
                    rounded
                    elevation="3"
                    v-bind="attrs"
                    v-on="on"
                    :color="element.color"
                    dark
                    height="55px"
                    width="55px"
                  >
                    <v-icon >
                      {{ element.mdi }}
                    </v-icon>
                  </v-btn>
                </template>
                <v-btn class="ma-0" rounded :color="element.color" dark @click="$emit('click',element.mod)">
                  <v-icon  class="mr-1">
                    {{ element.mdi }}
                  </v-icon>
                  {{ element.title }}
                </v-btn>
              </v-menu>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
import OT from "@opentok/client";
import Publisher from "@/components/dashboards/Publisher.vue";
import Subscriber from "@/components/dashboards/Subscriber.vue";
const errorHandler = (err) => {
  alert(err.message);
};
export default {
  name: "Session",
  props: {
    vista: {
      type: String,
    },
  },
  components: { Publisher, Subscriber },
  data() {
    return {
      collapseOnScroll: true,

      vista1: "PruebaVista", 
      vista2: "PruebaVista2",
      apiKey: "46815904",
      sessionID:
        "1_MX40NjgxNTkwNH5-MTYxMjMyNzI2MDY5M35sRyt1RjJzUTQyaWluVCtpL0hZMVhXR1d-fg",
      token:
      
        "T1==cGFydG5lcl9pZD00NjgxNTkwNCZzaWc9NmI5ZTdmZjYwMTFkMzFkZDFhZmRmZjVkZDI0NzQyNzgyYzZiODRiMjpzZXNzaW9uX2lkPTFfTVg0ME5qZ3hOVGt3Tkg1LU1UWXhNak15TnpJMk1EWTVNMzVzUnl0MVJqSnpVVFF5YVdsdVZDdHBMMGhaTVZoWFIxZC1mZyZjcmVhdGVfdGltZT0xNjEyMzI3MjczJm5vbmNlPTAuNjc1NzA4NDA4NTUzOTk1NyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjEyOTMyMDcxJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9",
      streams: [],
      session: null,
      stream: null,
      items: [
        {
          title: "Historial",
          mdi: "mdi-notebook  ",
          color: "teal",
          mod: "historial",
        },
        {
          title: "Informe",
          mdi: "mdi-clipboard-text",
          color: "blue",
          mod: "informe",
        },
        {
          title: "Síntomas",
          mdi: "mdi-clipboard-account-outline ",
          color: "orange darken-4",
          mod: "sintomas",
        },
        {
          title: "Receta",
          mdi: "mdi-note-plus",
          color: "green",
          mod: "receta",
        },
      ],
    };
  },
  created() {
    this.session = OT.initSession(this.apiKey, this.sessionID);

    this.session.connect(this.token, (err) => {
      if (err) {
        errorHandler(err);
      }
    });

    this.session.on("streamCreated", (event) => {
      this.streams.push(event.stream);
      this.stream = this.streams[0];
    });
    this.session.on("streamDestroyed", (event) => {
      const idx = this.streams.indexOf(event.stream);
      if (idx > -1) {
        this.streams.splice(idx, 1);
      }
    });
  },
  methods: {
    mover() {
      console.log("asdasdasd");
    },

    errorHandler,
  },
};
</script>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  position: relative;
  display: inline-block;
  position: absolute;
  top: 1em;
  left: 1em;
}
.flex-container > div {
  background-color: #202420;
  width: 30vh;
  height: 20vh;
  margin: 10px;
  text-align: center;
  line-height: 75px;
  font-size: 30px;
  border-radius: 5px;
  &:hover {
    background-color: #293029;
  }
}

.flex-container-menu {
  display: flex;
  flex-direction: column;
  display: inline-block;
  position: absolute;
  top: 1em;
  right: 1em;
}

.flex-container-menu > div {
  text-align: center;
  line-height: 75px;
  font-size: 30px;
  border-radius: 50px;
}

@media (max-width: 425px) {
  .pant {
    width: 420px;
  }
}
</style>
