<template>
  <v-row justify="center" align="center">
    <v-col v-if="loggedIn">
      <v-card
        v-for="quote in quotesOnHold"
        v-bind:key="quote.id">
        <v-card-text>
          <p style="white-space: pre-wrap;">{{quote.quote}}</p>
          <small>{{quote.date}}</small>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col v-else>
      <v-card>
        <v-card-title>Connexion</v-card-title>
        <v-card-text>
          <v-text-field
            :type="'password'"
            label="Mot de passe"
            v-model="password"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="orange" v-on:click="login();">Se connecter</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'AdminPage',

  css:['~/assets/main.css'],

  data() {
    return {
      loggedIn: false,
      quotesOnHold: [],
      password: ""
    }
  },
  
  methods: {
    async login(){
      let response = await this.$api.login(this.password);

      if (response.loginSuccessful) {
        this.loggedIn = true;
        this.quotesOnHold = response.quotes;
      }
    }
  }
}
</script>
  