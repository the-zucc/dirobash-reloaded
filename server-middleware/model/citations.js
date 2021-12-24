import vieillesCitations from '../../old-quotes.json';
import nouvellesCitations from '../../new-quotes.json';
const fs = require('fs');

class Citations {
  constructor() {
    this.vieillesCitations = vieillesCitations.map(cit => {
      cit.vieille=true;
      return cit;
    });
    this.nouvellesCitations = nouvellesCitations;
  }

  getNextId() {
    return Math.max(...this.getCitations().map(quoteObj => quoteObj.id))+1;
  }

  ajoutCitation(citation) {
    console.log("Ajout d'une nouvelle citation:",citation);
    this.nouvellesCitations.push({
      id: this.getNextId(),
      quote: citation,
      date: new Date().toISOString()
    });
    fs.writeFileSync(
      /**write to '../../new-quotes.json' */
      './new-quotes.json',
      JSON.stringify(this.nouvellesCitations)
    );
  }

  getCitations() {
    return this.vieillesCitations.concat(
      this.nouvellesCitations
    ).reverse();
  }
}

const citations = new Citations();

export default citations;

