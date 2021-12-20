<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card>
      <v-card
        v-for="citation in citations"
        v-bind:key="citation.id">
        <v-card-title class="headline">
          #{{citation.id}}
        </v-card-title>
        <v-card-text>
          <p>{{citation.quote}}</p>
          <small>{{citation.date}}</small>
        </v-card-text>
      </v-card>
    </v-col>
    <v-fab-transition>
      <v-btn
        v-show="montrer_bouton"
        color="pink"
        dark
        absolute
        bottom
        right
        fab
        style="margin: 2em; margin-bottom: 3em;"
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
      montrer_bouton:true
    }
  },
  
  methods: {
    redirigerAjout(){
      this.$router.push('/inspire')
    }
  },
  
  computed: {
    citations(){
      return this.$store.state.citations.liste;
    }
  }
}
</script>
