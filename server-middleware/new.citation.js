import citations from './model/citations';

export default (request, res, next) => {
  
  let body = ''

  request.on('data', (data) => {
    body += data;
    if (body.length > 1e6)
      request.connection.destroy();
  });

  request.on('end', () => {
    res.setHeader('Content-Type', 'application/json');
    let validBody = body.match("^\{\"quote\":\".{1,10000}\"\}");
    if(validBody){
      citations.ajoutCitation(JSON.parse(body).quote);
      res.writeHead(200);
    }
    else{
      console.log("erreur de citation; body:", body)
      res.writeHead(400);
    }
    let data = JSON.stringify(citations.getCitations());
    res.end(data);
    next();
  });
}