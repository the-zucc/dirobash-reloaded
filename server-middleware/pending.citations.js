import citations from './model/citations'
import auth from './model/auth'

export default (request, response, next) => {
  let body = ''

  request.on('data', (data) => {
    body += data;
    if (body.length > 100)
      request.connection.destroy();
  });

  request.on('end', () => {
    response.setHeader('Content-Type', 'application/json');
    response.writeHead(200);
    
    let data = "";
    let passwordObj = null;

    try {
      passwordObj = JSON.parse(body);
    } catch (e) {}

    if (passwordObj && auth.verifyPassword(passwordObj.password)) {
      data = JSON.stringify({
        loginSuccessful: true,
        quotes: citations.getPendingQuotes()
      });
    } else {
      data = JSON.stringify({
        loginSuccessful: false,
        quotes: []
      });
    }

    response.end(data);
    next();
  });
}