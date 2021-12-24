import citations from './model/citations';

export default (request, response, next) => {

  response.setHeader('Content-Type', 'application/json');
  
  let body = ''

  request.on('data', (data) => {
    body += data;
    if (body.length > 1e6)
      request.connection.destroy();
  });

  request.on('end', () => {
    if (body.match("^\{\"quote\":\".+\"\}")){
      citations.ajoutCitation(JSON.parse(body).quote);
    }
    response.end()
    response.end(JSON.stringify(citations.getCitations()));
  });
  
  next();
}