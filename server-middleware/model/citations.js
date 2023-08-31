import vieillesCitations from '../../old-quotes.json';
import nouvellesCitations from '../../new-quotes.json';
import pendingQuotes from '../../pending-quotes.json';
const fs = require('fs');

class Citations {
  constructor() {
    this.vieillesCitations = vieillesCitations.map(cit => {
      cit.vieille=true;
      return cit;
    });
    this.nouvellesCitations = nouvellesCitations;
    this.pendingQuotes = pendingQuotes;
  }

  getNextId() {
    return Math.max(...this.getCitations().map(quoteObj => quoteObj.id))+1;
  }

  addPendingQuote(citation) {
    console.log("Ajout d'une nouvelle citation:",citation);
    this.pendingQuotes.push({
      id: this.getNextId(),
      quote: citation,
      date: new Date().toISOString()
    });
    fs.writeFileSync(
      /**write to '../../pending-quotes.json' */
      './pending-quotes.json',
      JSON.stringify(this.pendingQuotes)
    );
  }

  getCitations() {
    return this.vieillesCitations.concat(
      this.nouvellesCitations
    ).reverse();
  }

  getPendingQuotes() {
    return this.pendingQuotes.reverse();
  }
}

const citations = new Citations();

export default citations;

