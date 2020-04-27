const http = require('http');
const app = require('./app');

// change port number to 5000 (react default port is 3000)
const port = process.env.PORT || 5000;

//pass 'app' to create server
const server = http.createServer(app);

server.listen(port, () => console.log( `Server is running on http://localhost:${port }`));