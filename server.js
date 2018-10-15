//Install express server
const express = require('express');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
