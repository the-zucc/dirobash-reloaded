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
        'Content-Type': 'application/json'
      }
    });
  }

  async queryPendingQuotes(password) {
    let response = await fetch('http://localhost:3000/api/citations/pending', {
      method: 'POST',
      body: JSON.stringify({
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  }

  async approveQuote(quoteDate, password) {
    let response = await fetch('http://localhost:3000/api/citations/manage', {
      method: 'POST',
      body: JSON.stringify({
        password: password,
        quoteDate: quoteDate,
        action: "approve"
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  }

  async rejectQuote(quoteDate, password) {
    let response = await fetch('http://localhost:3000/api/citations/manage', {
      method: 'POST',
      body: JSON.stringify({
        password: password,
        quoteDate: quoteDate,
        action: "reject"
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  }
}

const api = new Api();

export default (context, inject) => {
  // Make API instance available on the client
  inject('api', api);
  context.$api = api;
}