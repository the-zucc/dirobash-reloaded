import citations from './model/citations'

export default (request, response, next) => {
    response.setHeader('Content-Type', 'application/json');
    response.writeHead(200);
    let data = JSON.stringify(citations.getCitations());
    response.end(data);
    next();
  }