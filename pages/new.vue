<template>
  <v-row>
    <v-col class="text-center">
      <v-card>
        <v-textarea
          name="input-7-1"
          label="Citation"
          hint="Votre citation ici"
          v-model="citationUtilisateur"
        ></v-textarea>
        <v-btn color="orange" v-on:click="ajouterCitation(citationUtilisateur)">Ajouter une citation</v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'newQuotePage',

  css:['~/assets/main.css'],

  data() {
    return {
      citationUtilisateur: ''
    }
  },
  
  methods: {
    ajouterCitation(citation){
      this.$api.ajoutCitation(citation);
    }
  }
}
</script>
