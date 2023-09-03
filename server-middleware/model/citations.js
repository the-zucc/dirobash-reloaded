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
    this.pendingQuotes.push({
      id: -1,
      quote: citation,
      date: new Date().toISOString()
    });
    this.writePendingQuotes();
  }

  approveQuote(quoteDate) {
    let quoteIdx = this.pendingQuotes
      .findIndex((quote) => quote.date == quoteDate);

    if (quoteIdx >= 0) {
      let quote = this.pendingQuotes[quoteIdx];
      quote.id = this.getNextId();

      // Add to new quotes
      this.nouvellesCitations.push(quote);
      this.writeNewQuotes();

      // Remove from pending quotes
      this.pendingQuotes.splice(quoteIdx, 1);
      this.writePendingQuotes();

      return true;
    }

    return false;
  }

  rejectQuote(quoteDate) {
    let quoteIdx = this.pendingQuotes
      .findIndex((quote) => quote.date == quoteDate);

    if (quoteIdx >= 0) {
      // Remove from pending quotes
      this.pendingQuotes.splice(quoteIdx, 1);
      this.writePendingQuotes();

      return true;
    }

    return false;
  }

  getCitations() {
    return this.vieillesCitations.concat(
      this.nouvellesCitations
    ).reverse();
  }

  getPendingQuotes() {
    return this.pendingQuotes.reverse();
  }

  ///
  /// Private methods
  ///

  writePendingQuotes(){
    fs.writeFileSync(
      './pending-quotes.json',
      JSON.stringify(this.pendingQuotes)
    );
  }

  writeNewQuotes(){
    fs.writeFileSync(
      './new-quotes.json',
      JSON.stringify(this.nouvellesCitations)
    );
  }
}

const citations = new Citations();

export default citations;

