<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card
        v-for="citation in citations"
        v-bind:key="citation.id">
        <v-card-title class="headline">
          #{{citation.id}}
        </v-card-title>
        <v-card-text>
          <p style="white-space: pre-wrap;">{{citation.quote}}</p>
          <small>{{citation.date + (citation.vieille ? ' - ' : '')}}<i v-if="citation.vieille">archive dirobash.tolarian.com, 2008-2020</i></small>
        </v-card-text>
      </v-card>
    </v-col>
    <v-fab-transition>
      <v-btn
        v-show="montrer_bouton"
        color="pink"
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

  transition(to, from) {
    if (!from) return "slide-left";
    if (to.query.page != 0)
      return to.query.page < from.query.page ? "slide-right" : "slide-left";
  },

  data() {
    return {
      montrer_bouton:true
    }
  },
  
  methods: {
    redirigerAjout(){
      this.$router.push('/new')
    }
  },
  
  computed: {
    citations(){
      /**copy array, reverse the result, concat, return result*/
      return this.$store.state.citations.vieillesCitations
        .slice()
        .concat(
          /**copy array, reverse the result*/
          this.$store.state.citations.nouvellesCitations
          .slice()
        ).reverse();
    }
  }
}
</script>
