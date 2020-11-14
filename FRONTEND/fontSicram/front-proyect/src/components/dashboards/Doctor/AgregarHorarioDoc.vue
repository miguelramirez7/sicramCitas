<template>
    <div>
        <v-card>
            <v-card-title class="titulo"> Lista de horarios </v-card-title>
            <v-card-content>
                <v-container>
                    <v-row>
                        <v-col class="pl-4 pr-4" cols="12" md="4">
                            <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                                transition="scale-transition" offset-y min-width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="date" label="Fecha"
                                        prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" md="4" class="pl-4 pr-4">
                            <v-select :items="items" label="Horario"  ></v-select>
                        </v-col>
                        <v-col cols="12" md="4">
                            <div class="text-center">
                                <v-btn elevation="7"  color="teal">Agregar</v-btn>
                                
                            </div>
                            
                        </v-col>
                    </v-row>

                </v-container>
            </v-card-content>
        </v-card>
    </div>
</template>

<script>
    export default {
        data: () => ({
            date: new Date().toISOString().substr(0, 10),

            menu2: false,
            items: ['8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00'],
        }),
    }
</script>

<style scoped>
    .col-xl,
    .col-xl-auto,
    .col-xl-12,
    .col-xl-11,
    .col-xl-10,
    .col-xl-9,
    .col-xl-8,
    .col-xl-7,
    .col-xl-6,
    .col-xl-5,
    .col-xl-4,
    .col-xl-3,
    .col-xl-2,
    .col-xl-1,
    .col-lg,
    .col-lg-auto,
    .col-lg-12,
    .col-lg-11,
    .col-lg-10,
    .col-lg-9,
    .col-lg-8,
    .col-lg-7,
    .col-lg-6,
    .col-lg-5,
    .col-lg-4,
    .col-lg-3,
    .col-lg-2,
    .col-lg-1,
    .col-md,
    .col-md-auto,
    .col-md-12,
    .col-md-11,
    .col-md-10,
    .col-md-9,
    .col-md-8,
    .col-md-7,
    .col-md-6,
    .col-md-5,
    .col-md-4,
    .col-md-3,
    .col-md-2,
    .col-md-1,
    .col-sm,
    .col-sm-auto,
    .col-sm-12,
    .col-sm-11,
    .col-sm-10,
    .col-sm-9,
    .col-sm-8,
    .col-sm-7,
    .col-sm-6,
    .col-sm-5,
    .col-sm-4,
    .col-sm-3,
    .col-sm-2,
    .col-sm-1,
    .col,
    .col-auto,
    .col-12,
    .col-11,
    .col-10,
    .col-9,
    .col-8,
    .col-7,
    .col-6,
    .col-5,
    .col-4,
    .col-3,
    .col-2,
    .col-1 {

        padding: 0;
    }

    .subtitulo {
        font-size: 16px;

    }

    .titulo {
        font-size: 30px;
        display: flex;
        justify-content: center;
        margin-bottom: 40px;
        background: #f2f2f2;
        color: rgb(0, 92, 128);
    }
</style>