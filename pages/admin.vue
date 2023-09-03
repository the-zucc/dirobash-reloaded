<template>
  <v-row justify="center" align="center">
    <v-col v-if="loggedIn && quotesOnHold.length > 0">
      <v-card
        v-for="quote in quotesOnHold">
        <v-card-text>
          <p style="white-space: pre-wrap;">{{quote.quote}}</p>
          <small>{{quote.date}}</small>
        </v-card-text>
        <v-card-actions>
          <v-btn color="orange" v-on:click="approve(quote.date);">Approuver</v-btn>
          <v-btn color="orange" v-on:click="reject(quote.date);">Rejeter</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col v-else-if="loggedIn">
      <v-card>
        <v-card-title>Aucune citation en attente d'approbation.</v-card-title>
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
          <v-btn color="orange" v-on:click="loadPendingQuotes();">Se connecter</v-btn>
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
    async loadPendingQuotes(){
      let response = await this.$api.queryPendingQuotes(this.password);

      if (response.loginSuccessful) {
        this.loggedIn = true;
        this.quotesOnHold = response.quotes;
      }
    },

    async approve(quoteDate){
      let response = await this.$api.approveQuote(quoteDate, this.password);

      if (response.requestSuccessful) {
        this.loadPendingQuotes();
      } else {
        window.alert("L'approbation a échoué.");
      }
    },

    async reject(quoteDate){
      let response = await this.$api.rejectQuote(quoteDate, this.password);

      if (response.requestSuccessful) {
        this.loadPendingQuotes();
      } else {
        window.alert("Le rejet a échoué.");
      }
    }
  }
}
</script>
  