import citations from './model/citations';
import auth from './model/auth';

export default (request, res, next) => {
  
  let body = ''

  request.on('data', (data) => {
    body += data;
    if (body.length > 100)
      request.connection.destroy();
  });

  request.on('end', () => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    
    let data = {
      requestSuccessful: false,
      pendingQuotes: []
    };
    let requestObj = null;

    try {
      requestObj = JSON.parse(body);
    } catch (e) {}

    if (requestObj && auth.verifyPassword(requestObj.password)) {
      if (requestObj.action == "approve" && citations.approveQuote(requestObj.quoteDate))
        data.requestSuccessful = true;
      else if (requestObj.action == "reject" && citations.rejectQuote(requestObj.quoteDate))
        data.requestSuccessful = true;
      
      data.pendingQuotes = citations.getPendingQuotes();
    }
    
    res.end(JSON.stringify(data));
    next();
  });
}