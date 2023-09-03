<template>
  <v-row justify="center" align="center">
    <v-col>
      <v-card
        v-for="citation in listeCitations"
        v-bind:key="citation.id"
        class="mb-1">
        <v-card-title class="headline">
          #{{citation.id}}
        </v-card-title>
        <v-card-text>
          <p style="white-space: pre-wrap;">{{citation.quote}}</p>
          <small>{{citation.date + (citation.vieille ? ' - ' : '')}}<i v-if="citation.vieille">archive dirobash.tolarian.com, 2008&mdash;2020</i></small>
        </v-card-text>
      </v-card>
    </v-col>
    <v-fab-transition>
      <v-btn
        v-show="montrer_bouton"
        color="orange"
        dark
        fixed
        bottom
        right
        fab
        large
        style="margin: 2em;"
        v-on:click="montrer_bouton=!montrer_bouton; redirigerAjout();"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',

  css:['~/assets/main.css'],

  data() {
    return {
      montrer_bouton:true,
      listeCitations: []
    }
  },

  async fetch() {
    this.listeCitations = await (await this.$api.listeCitations()).json();
  },
  
  methods: {
    redirigerAjout(){
      this.$router.push('/new')
    }
  }
}
</script>
