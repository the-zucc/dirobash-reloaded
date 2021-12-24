import axios from "axios";

class Api {
  async listeCitations() {
    return await fetch('http://localhost:3000/api/citations/list');
  }
  async ajoutCitation(citation) {
    return await fetch('http://localhost:3000/api/citations/new', {
      method: 'POST',
      body: JSON.stringify({quote:citation}),
      headers: {
        'Content-Type':'application/json'
      }
    });
  }
}

const api = new Api();

export default (context, inject) => {
  // Make API instance available on the client
  inject('api', api);
  context.$api = api;
}