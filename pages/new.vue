<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>Ajout d'une citation</v-card-title>
        <v-card-text>
          <v-textarea
            name="input-7-1"
            label="Citation"
            hint="Votre citation ici"
            v-model="citationUtilisateur"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="orange" v-on:click="ajouterCitation(citationUtilisateur)">Soumettre</v-btn>
        </v-card-actions>
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
