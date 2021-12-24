import citations from './model/citations'

export default (request, response, next) => {
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(citations.getCitations()));
    next();
  }